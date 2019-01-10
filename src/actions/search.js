import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

export const searchText = (query) => {
  client.query({
    query: gql`
        {
            cities(query: "${query}"){
                name
                country {
                    name
                }
            }
        }
    `
  }).then(res => console.log(res))
};
