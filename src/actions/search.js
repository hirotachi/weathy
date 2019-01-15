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
                    state
                    geometry{
                        lat
                        lon
                    }
                }
            }
        `
      }).then((res) => {
        const {search} = res.data;
        if(!res.loading && search.length === 0){
          dispatch(setNoResult());
        }else {
          dispatch(setCurrentSearch(search));
        }
      })
        .catch((err) => dispatch(setNetworkError()))
    }
  }
};


const setCurrentSearch = (data) => {
  return {
    type: "SET_CURRENT_SEARCH",
    data
  }
};

export const setNetworkError = () => ({type: "SET_NETWORK_ERROR"});
const setNoResult = () => ({type: "SET_NO_RESULT"});
export const clearResult = () => ({type: "RESET_RESULT"});
