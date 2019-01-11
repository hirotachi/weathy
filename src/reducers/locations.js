const locationsDefaultState = {
  locationsList: [],
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