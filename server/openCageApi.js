const axios = require("axios");
const uuidv4 = require("uuid/v4");

const openCageKey = process.env.OPEN_CAGE_KEY || require("./apiKeys").openCageKey;

module.exports = async (query = "", command = "search") => {
  const requestParams = typeof query === "string" ? query : `${query.lat},${query.lon}`;
  const request = `https://api.opencagedata.com/geocode/v1/json?q=${requestParams}&key=${openCageKey}`;
  let finalResult = [];
  await axios.get(request)
      .then(({data}) => {
        if(typeof query === "string"){ // handle result according to command
          let currentResult = [];
          data.results.map((result) => {
            currentResult.push(resultExtractor(result, "search"));
          });
          currentResult = currentResult.filter(result => !!result); // remove any empty array item
          finalResult = duplicateChecker(currentResult); // check for duplicates in the current result
        }else {
          // noinspection JSValidateTypes
          finalResult = resultExtractor(data.results[0], "location");
        }
      })
      .catch(err => console.log(err));
  return finalResult;
};

const duplicateChecker = (mainArray) => { // check is there is duplicate value
  let filterd = mainArray.filter(item => { // remove location if it doesn't have state and city filled
    return !(!item.city && !item.state)
  });
  let newFilter = [];
    filterd.map((currentItem) => {
        let num = filterd.filter(item => { // filter duplicates
            let cityMatch = true;
              if(!!currentItem.city && !!item.city){
                cityMatch = currentItem.city.toLowerCase() === item.city.toLowerCase() ||
                currentItem.city.toLowerCase().includes(item.city.toLowerCase());
              }
            const countryMatch = currentItem.country.toLowerCase() === item.country.toLowerCase();
            return cityMatch && countryMatch ;
        });
      //  check if the current filter duplicates first element is in the newFilter already
      const existsInArray = newFilter.some(location => location.id === num[0].id);
      if(!existsInArray && num.length >= 1){
        newFilter.push(num[0])
      }
  });
    return newFilter;
};

const resultExtractor = (result, command) => {
    const {components, geometry, formatted} = result;
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
  const {lat, lng:lon} = geometry;
  if(command === "search"){ // return just cities and states if it's a search
    const type = _type.toLowerCase();
    if(type === "city" || type === "state_district"){
      return {
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
      };
    }
  }else if (command === "location"){ // return any type according to geolocation
    return {
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
    };
  }
};