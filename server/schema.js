const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        weather(lon: String!, lat: String!): String!
        search(query: String!): [Search!]!
        currentWeather(lon: String!, lat:String!): Weather!
    }
    type Search {
        id: ID!
        city: String
        countryCode: String
        country: String
        postcode: String
        region: String
        state: String
        formatted: String
        stateDistrict: String
        geometry: Geometry
    }
  type Geometry{
      lat: Float
      lon: Float
  }
  type Weather {
      temperature: Float!
      humidity: Float!
      windSpeed: Float!
      summary: String!
      rain: Float!
      icon: String!
  }
`;

export default typeDefs;