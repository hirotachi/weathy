const apiKeys = require("./apiKeys");
const axios = require("axios");
const uuidv4 = require("uuid/v4");

const openCageKey = process.env.OPEN_CAGE_KEY || apiKeys.openCageKey;

module.exports = async (query) => {
  const request = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${openCageKey}`;
  const result = [];
  await axios.get(request)
      .then(({data}) => {
        data.results.map(({components, geometry, formatted}) => {
          const {
            _type,
            city,
            country,
            country_code: countryCode,
            postcode,
            state,
            region,
            state_district: stateDistrict
          } = components;
          const {lat, lng: lon} = geometry;
          const type = _type.toLowerCase();
          if(type === "city" || type === "state_district"){
            result.push({
              id: uuidv4(),
              city,
              country,
              countryCode,
              postcode,
              state,
              region,
              stateDistrict,
              geometry: {lat, lon},
              formatted
            });
          }
        });
      })
      .catch(err => console.log(err));
  return result;
};