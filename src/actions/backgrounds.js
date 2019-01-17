import { client, setNetworkError } from "./search";
import gql from "graphql-tag";


export const getCurrentBg = (weather) => {
  return dispatch => {
    client.query({
      query: gql`
      {
        getBackground(weather: "${weather}"){
          mobile
          desktop
        }
      }
      `
    }).then(({data}) => {
      dispatch(setCurrentBg(data.getBackground));
    })
      .catch(err => setNetworkError())
  }
};

const setCurrentBg = (bg) => {
  return {
    type: "SET_CURRENT_BG",
    bg
  }
};