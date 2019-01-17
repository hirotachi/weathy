const axios = require("axios");
const data = require("../countries.json");
const geoLocator = require("../openCageApi");
const weatherApi = require("../weatherApi");

const darkSkyKey = process.env.DARK_SKY_KEY || require("../apiKeys").darkSkyKey;



const resolvers = {
  Query: {
    search(parent, {query}){
       return geoLocator(query);
    },
    currentWeather(parent, args){
      return weatherApi("currently", args);
    },
    todayWeather(parent, args){
      console.log(weatherApi("daily", args))
    },
    weather(parent, {lat, lon}){
      const request = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lon}?units=ca`;
       return axios.get(request)
        .then(({data}) => {
          return JSON.stringify(data)
        })
        .catch(err => console.log(err));
    }
  },
  Search: {
    currentWeather(parent, args){
      return weatherApi("currently", parent.geometry)
    },
    todayWeather(parent, args) {
      return weatherApi("daily", parent.geometry);
    }
  }
};

module.exports= resolvers;