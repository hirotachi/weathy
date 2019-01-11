import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: process.env.PORT ? "/graphql" : "http://localhost:3000/graphql"
});

export const searchText = (query) => {
  return (dispatch) => {
    if (!!query && query.length > 2) {
      client.query({
        query: gql`
            {
                cities(query: "${query}"){
                    name
                    id
                    country {
                        name
                        region
                        abbreviation
                    }
                }
            }
        `
      }).then(({data}) => {
        let cities = []; // delete duplicates in the json file and serve them to store
        data.cities.map(currentCity => {
          let duplicates = data.cities.find(city =>
            city.name.toLowerCase() === currentCity.name.toLowerCase() &&
            city.country.name.toLowerCase() === currentCity.country.name.toLowerCase()
          );
          const dupFound = cities.some(city => {
            return city.name === duplicates.name &&
              city.country.name === duplicates.country.name;
          });
          if(!dupFound){
            cities.push(duplicates);
          }
        });
        dispatch(setCurrentSearch(cities));
      })
      .catch(err => console.log(err))
    }
  }
};


const setCurrentSearch = (data) => {
  return {
    type: "SET_CURRENT_SEARCH",
    data
  }
};

export const clearCurrentSearch = () => {
  return {
    type: "CLEAR_CURRENT_SEARCH"
  }
};
