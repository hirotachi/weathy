const {gql} = require('apollo-server-express');

const typeDefs = gql`  
  type Query{
      countries(query: String): [Country]!
      cities(query: String): [City]!
      test : String!
  }
  type Country {
      name: String!
      cities: [City]!
  }
  type City {
      name: String!
      country: Country!
  }
`;

export default typeDefs;