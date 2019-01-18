const searchResultDefaultState = {
  result: [],
  networkError: false,
  noResult: false
};

export default (state= searchResultDefaultState, action) => {
  switch(action.type){
    case "SET_CURRENT_SEARCH":
      return {...state,noResult: false, result: [...action.data]};
    case "SET_NO_RESULT":
    return {...searchResultDefaultState, noResult: true};
    case "RESET_RESULT":
      return searchResultDefaultState;
    case "SET_NETWORK_ERROR":
      return {...state, networkError: true};
    case "REMOVE_NETWORK_ERROR":
      return {...state, networkError: false};
    default:
      return state;
  }
}