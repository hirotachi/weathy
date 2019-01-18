const axios = require("axios");
const data = require("../countries.json");
const geoLocator = require("../openCageApi");
const weatherApi = require("../weatherApi");
const backgrounds = require("../backgrounds/backgrounds");

const darkSkyKey = process.env.DARK_SKY_KEY || require("../apiKeys").darkSkyKey;


const resolvers = {
  Query: {
    search(parent, { query }) {
      return geoLocator(query);
    },
    currentWeather(parent, args) {
      return weatherApi("currently", args);
    },
    todayWeather(parent, args) {
      return weatherApi("daily", args);
    },
    weather(parent, { lat, lon }) {
      const request = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lon}?units=ca`;
      return axios.get(request)
        .then(({ data }) => {
          return JSON.stringify(data)
        })
        .catch(err => console.log(err));
    },
    getBackground(parent, { weather }) {
      const sectionMatch = backgrounds.find(bg => { // get the backgrounds weather section
        return weather.toLowerCase().includes(bg.weather.toLowerCase()) ||
          bg.weather.toLowerCase().includes(weather.toLowerCase());
      });
      if (!sectionMatch) { // default return if there is no such weather in backgrounds variable
        const randomMobileIndex = Math.floor(Math.random() * sectionMatch.mobileGifs.length);
        const randomDesktopIndex = Math.floor(Math.random() * sectionMatch.desktopGifs.length);
        return {
          desktop: backgrounds[0].desktopGifs[randomDesktopIndex],
          mobile: backgrounds[0].mobileGifs[randomMobileIndex]
        };
      }

      const randomMobileIndex = Math.floor(Math.random() * sectionMatch.mobileGifs.length);
      const randomDesktopIndex = Math.floor(Math.random() * sectionMatch.desktopGifs.length);
      return { // return random desktop and mobile layout bg
        desktop: sectionMatch.desktopGifs[randomDesktopIndex],
        mobile: sectionMatch.mobileGifs[randomMobileIndex]
      };
    },
    getCurrentLocation(parent, args){
      return geoLocator(args);
    },
    checkServer(parent, args){
      return true;
    }
  },
  Search: {
    currentWeather(parent, args) {
      return weatherApi("currently", parent.geometry)
    },
    todayWeather(parent, args) {
      return weatherApi("daily", parent.geometry);
    }
  },
  Weather: {
    background(parent, args) {
      const sectionMatch = backgrounds.find(bg => { // get the backgrounds weather section
        return parent.icon.toLowerCase().includes(bg.weather.toLowerCase());
      });
      if (!sectionMatch) { // default return if there is no such weather in backgrounds variable
        const randomMobileIndex = Math.floor(Math.random() * sectionMatch.mobileGifs.length);
        const randomDesktopIndex = Math.floor(Math.random() * sectionMatch.desktopGifs.length);
        return {
          desktop: backgrounds[0].desktopGifs[randomDesktopIndex],
          mobile: backgrounds[0].mobileGifs[randomMobileIndex]
        };
      }
      const randomMobileIndex = Math.floor(Math.random() * sectionMatch.mobileGifs.length);
      const randomDesktopIndex = Math.floor(Math.random() * sectionMatch.desktopGifs.length);
      return { // return random desktop and mobile layout bg
        desktop: sectionMatch.desktopGifs[randomDesktopIndex],
        mobile: sectionMatch.mobileGifs[randomMobileIndex]
      };
    }
  }
};

module.exports = resolvers;