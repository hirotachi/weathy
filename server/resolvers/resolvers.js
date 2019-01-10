const data = require("../countries.min");



const resolvers = {
  Query: {
    countries(parent, {query}){
      const countries = [];
      Object.entries(data).forEach(([key, value]) => {
        if(key.toLowerCase().includes(query.toLowerCase())){
          countries.push({name: key, cities: [
            value.map(city => ({name: city, country: key}))
            ]});
        }
      });
      return countries;
    },
    test(parent, args){
      return "test working";
    },
    cities(parent, args, ctx, info){
      const cities = [];
      Object.entries(data).forEach(([key, value]) => {
        value.map(city => {
          if(city.toLowerCase().includes(args.query.toLowerCase())){
            cities.push({name: city, country: key})
          }
        })
      });
      return cities;
    }
  },
   Country : {
    cities(parent, args, ctx, info) {
      let cities = [];
      Object.entries(data).forEach(([key, value]) => {
        if(parent.name === key ){
          value.map(city => {
            cities.push({name: city, country: parent.name})
          })
        }
      });
      return cities;
    }
   },
  City: {
    country(parent, args, ctx, info) {
      let country = {};
      Object.entries(data).forEach(([key, value]) => {
        value.map(city => {
          if(city === parent.name){
            country = {name: key, cities: value}
          }
        })
      });
      return country;
    }
  }
};

export default resolvers;