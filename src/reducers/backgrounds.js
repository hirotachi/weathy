const backgroundsDefaultState = {
  mobile: "",
  desktop: ""
};

export default (state = [], action) => {
  switch(action.type){
    case "SET_CURRENT_BG":
      return action.bg;
    default :
      return state;
  }
};