import axios from "axios";
const data = require("../countries.json");
import apiKeys from "../apiKeys";
import geoLocator from "../openCageApi";
import weatherApi from "../weatherApi";

const {darkSkyKey} = apiKeys;



const resolvers = {
  Query: {
    search(parent, {query}){
       return geoLocator(query);
    },
    currentWeather(parent, args){
      return weatherApi("currently", args);
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
    }
  }
};

export default resolvers;