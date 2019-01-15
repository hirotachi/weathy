const axios = require("axios");


const darkSkyKey = process.env.DARK_SKY_KEY || require("./apiKeys").darkSkyKey;

module.exports = async (command, {lat, lon}) => {
  let weather = {};
  const apiRequest = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lon}?units=ca`;
  await axios.get(apiRequest)
    .then(({data}) =>  { // get the weather data depending on the requested command (currently ...)
      Object.entries(data).forEach(([key, value]) => {
        if(key.toLowerCase() === command){
          const {
            temperature,
            humidity,
            windSpeed,
            summary,
            precipIntensity: rain,
            icon
          } = value;
          weather = {
            temperature,
            humidity,
            windSpeed,
            summary,
            rain,
            icon
          };
        }
      });
  })
    .catch(err => console.log(err));
  return weather;
};