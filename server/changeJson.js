const fs = require("fs");
const abr = require("./abr");
const uuidv4 = require("uuid/v4");
const currentData = require("./countries.min");


const regions = require("country-json/src/country-by-region-in-world");

let newData = [];
Object.entries(currentData).forEach(([key, value]) => {
  let newCountry = {id: uuidv4(), name: key};
  Object.entries(abr).forEach(([abrea, value]) => {
    if(value.toLowerCase() === key.toLowerCase()){
      newCountry= {...newCountry, abbreviation: abrea};
    }
  });
  regions.map(region => {
    if(region.country.toLowerCase() === key.toLowerCase()){
      newCountry = {...newCountry, region: region.location}
    }
  });
  let cities = [];
  value.map(city => {
    cities.push({id: uuidv4(), name: city})
  });
  newCountry = {...newCountry, cities: cities};
  newData.push(newCountry);
});


const json = JSON.stringify(newData);

fs.writeFile("countries.json", json, "utf8", (err) => {
  console.log(err)
});