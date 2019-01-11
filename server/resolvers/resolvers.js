const data = require("../countries.json");




const resolvers = {
  Query: {
    countries(parent, {query}){
      let countries = [];
      data.map((country) => {
        if(country.name.toLowerCase().includes(query.toLowerCase())){
          countries.push(country);
        }
      });
      return countries;
    },
    cities(parent, {query}){
      let citiesResult = [];
      data.map(({cities}) => { // iterate over countries
        cities.map(city => { // iterate over cities
          if(city.name.toLowerCase().includes(query.toLowerCase())){
            citiesResult.push(city);
          }
        });
      });
      return citiesResult;
    }
  },
  Country: {
    cities(parent, args) {
      return data.find(country => country.id === parent.id).cities;
    }
  },
  City: {
    country(parent){
      let selectedCountry = {};
      data.map(country => { // iterate over country
        country.cities.map(city => { // iterate over each city to find the desired id
          if(city.id === parent.id){
            selectedCountry = country;
          }
        });
      });
      return selectedCountry;
    }
  }
};

export default resolvers;