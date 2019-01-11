const weatherDefaultState = {
  weatherDescription: "",
  temperature: "",
  humidity: "",
  windSpeed: "",
  rain: "",
  sunrise: "",
  sunset: "",
  code: ""
};

export default (state = weatherDefaultState, action) => {
  switch(action.type){
    case "SET_CURRENT_CITY_WEATHER":
      return action.weather;
    default:
      return state;
  }
};