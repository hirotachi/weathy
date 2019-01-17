export default (state = [], action) => {
  switch(action.type){
    case "ADD_BACKGROUND":
      return [...state, action.bg];
    default :
      return state;
  }
};