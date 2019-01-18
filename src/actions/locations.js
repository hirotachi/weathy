import { client, setNetworkError } from "./search";
import gql from "graphql-tag";
import { setCurrentCityWeather } from "./weather";
import { setCurrentBg } from "./backgrounds";

export const addLocation = (location) => {
  return {
    type: "ADD_LOCATION",
    location
  }
};

export const removeLocation = (id) => {
  return {
    type: "REMOVE_LOCATION",
    id
  }
};

export const updateLocation = (updates) => {
  return {
    type: "UPDATE_LOCATION",
    updates
  }
};

export const setSelectedLocation = (id) => {
  return {
    type: "SET_SELECTED_LOCATION",
    id
  }
};

export const getCurrentLocation = (lat, lon) => {
  return dispatch => {
    client.query({
      query: gql`
          {
              getCurrentLocation(lat: "${lat}", lon: "${lon}"){
                  id
                  city
                  country
                  formatted
                  state
                  geometry{
                      lat
                      lon
                  }
                  currentWeather {
                      temperature
                      rain
                      windSpeed
                      summary
                      humidity
                      icon
                      background{
                          mobile
                          desktop
                      }
                  }
              }
          }
      `
    }).then(({ data }) => {
      const { id, city, country, formatted, state, geometry, currentWeather } = data.getCurrentLocation;
      const { background } = currentWeather;
      dispatch(setCurrentBg(background));
      dispatch(addLocation({ id, city, country, formatted, state, geometry }));
      dispatch(setSelectedLocation(id));
      dispatch(setCurrentCityWeather(currentWeather));
    })
    .catch(err => setNetworkError());
  };
};