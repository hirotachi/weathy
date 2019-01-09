import shortid from "shortid";

const locationDefaultState = [
  {id:shortid() ,city: "New York", country: "US"},
  {id:shortid() ,city: "London", country: "UK"}
];

export default (state = locationDefaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}