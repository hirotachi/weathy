const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        weather(lon: String!, lat: String!): String!
        search(query: String!): [Search!]!
    }
    type Search {
        id: ID!
        city: String!
        countryCode: String!
        country: String!
        postcode: String
        region: String
        state: String
        formatted: String!
        stateDistrict: String
        geometry: Geometry!
    }
  type Geometry{
      lat: Float
      lon: Float
  }
`;

export default typeDefs;