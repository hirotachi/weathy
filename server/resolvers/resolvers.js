import axios from "axios";
const data = require("../countries.json");
import apiKeys from "../apiKeys";
import geoLocator from "../openCageApi";

const {darkSkyKey} = apiKeys;


const resolvers = {
  Query: {
    search(parent, {query}){
       return geoLocator(query);
    },
    weather(parent, {lat, lon}){
      const request = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lon}`;
       return axios.get(request)
        .then(({data}) => {
          return JSON.stringify(data)
        })
        .catch(err => console.log(err));
    }
  }
};

export default resolvers;