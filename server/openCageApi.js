const axios = require("axios");
const uuidv4 = require("uuid/v4");

const openCageKey = process.env.OPEN_CAGE_KEY || require("./apiKeys").openCageKey;

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
  return duplicateChecker(result);
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