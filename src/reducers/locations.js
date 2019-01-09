const locationDefaultState = [
  {city: "New York", country: "US"}
];

export default (state = locationDefaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}