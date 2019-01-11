export default (state= [], action) => {
  switch(action.type){
    case "SET_CURRENT_SEARCH":
      return [...action.data];
    case "CLEAR_CURRENT_SEARCH":
      return [];
    default:
      return state;
  }
}