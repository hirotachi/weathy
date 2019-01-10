const {gql} = require('apollo-server-express');

const typeDefs = gql`  
  type Query{
      countries(query: String): [Country]!
      cities(query: String): [City]!
      test : String!
  }
  type Country {
      id: ID!
      name: String!
      cities: [City]!
      abbreviation: String
      region: String
  }
  type City {
      id: ID!
      name: String!
      country: Country!
  }
`;

export default typeDefs;