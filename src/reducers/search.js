export default (state= [], action) => {
  switch(action.type){
    case "SET_SEARCH_LIST":
      return [...state, ...action.searchList];
    case "CLEAR_SEARCH_LIST":
      return [];
    default:
      return state;
  }
}