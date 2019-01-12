import uuidv4 from "uuid/v4";

const locationsDefaultState = {
  locationsList: [
    {
      id: uuidv4(),
      city: "New York",
      country: "USA",
      state: "New York",
      geometry: {
        lat: 40.7308619,
        lon: -73.9871558,
      }
    },
    {
      id: uuidv4(),
      city: "London",
      country: "United kingdom",
      state: "England",
      geometry: {
        lat: 51.5073219,
        lon: -0.1276474
      }
    },
    {
      id: uuidv4(),
      city: "Tokyo",
      country: "Japan",
      state: "Tokyo",
      geometry: {
        lat: 35.6828387,
        lon: 139.7594549
      }
    }
  ],
  selectedLocation: {
    id: ""
  }
};

export default (state = locationsDefaultState, action) => {
  switch(action.type) {
    case "ADD_LOCATION":
      return {...state, locationsList: [...state.locationsList, action.location]};
    case "REMOVE_LOCATION":
      return {...state, locationsList: state.locationsList.filter(location => location.id !== action.id)};
    case "UPDATE_LOCATION":
      return {...state, locationsList: state.locationsList.map(location => {
        if(location.id === action.id){
          return {...location, ...action.updates};
        }else {
          return location;
        }
        })};
    case "SET_SELECTED_LOCATION":
      return {...state, selectedLocation: {id: action.id}};
    default:
      return state;
  }
}