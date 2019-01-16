const backgroundDefaultState = [
  {
    weather: "rain",
    mobileGifs: [
      "https://media.giphy.com/media/GuEyvLPXMLhT2/giphy.gif",
      "https://media.giphy.com/media/tzGPolEe4LViU/giphy.gif"
    ],
    desktopGifs: [
      "https://media.giphy.com/media/Zf7oI1g1pzEqY/giphy.gif",
      "https://media.giphy.com/media/2xdzNrPE50WLC/giphy.gif",
      ""
    ]
  },
  {
    weather: "wind",
    mobileGifs: ["https://media.giphy.com/media/3o7aCRZYNerX4ovPwI/giphy.gif"],
    desktopGifs: []
  },
  {
    weather: "cloud",
    mobileGifs: ["https://media.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif"],
    desktopGifs: []
  }
];

export default (state = backgroundDefaultState, action) => {
  switch(action.type){
    default :
      return state;
  }
};