const axios = require("axios");
const data = require("../countries.json");
const geoLocator = require("../openCageApi");
const weatherApi = require("../weatherApi");
const backgrounds = require("../backgrounds/backgrounds");

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
    },
    getBackground(parent, {weather, layout}){
      const sectionMatch = backgrounds.find(bg => { // get the backgrounds weather section
        return bg.weather.toLowerCase().includes(weather.toLowerCase());
      });
      if(!sectionMatch){ // default return if there is no such weather in backgrounds variable
        if(layout === "mobile"){
          return {id: backgrounds[0].mobileGifs[0]};
        }else if (layout === "desktop") {
          return {id: backgrounds[0].desktopGifs[0]};
        }
      }

      if(layout === "mobile"){ // get a random background dependent on layout
        const randomIndex = Math.floor(Math.random() * sectionMatch.mobileGifs.length);
        return {id: sectionMatch.mobileGifs[randomIndex]};
      }else if (layout === "desktop"){
        const randomIndex = Math.floor(Math.random() * sectionMatch.desktopGifs.length);
        return {id: sectionMatch.desktopGifs[randomIndex]};
      }

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