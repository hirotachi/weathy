import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


export const client = new ApolloClient({
  uri: process.env.PORT ? "/graphql" : "http://localhost:3000/graphql"
});

export const searchText = (query) => {
  return (dispatch) => {
    if (!!query && query.length > 2) {
      client.query({
        query: gql`
            {
                search(query: "${query}"){
                    id
                    city
                    country
                    formatted
                    geometry{
                        lat
                        lon
                    }
                }
            }
        `
      }).then(({data}) => {
        console.log(data)
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
