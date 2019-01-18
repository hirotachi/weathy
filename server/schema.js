const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        weather(lon: String!, lat: String!): String!
        search(query: String!): [Search!]!
        currentWeather(lon: String!, lat:String!): Weather!
        todayWeather(lon: String!, lat: String!): Weather!
        getBackground(weather: String!): Background!
        getCurrentLocation(lat: String!, lon: String!): Search!
        checkServer: Boolean!
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
        currentWeather: Weather!
        todayWeather: Weather!
    }
  type Geometry{
      lat: Float
      lon: Float
  }
  type Weather {
      temperature: Float
      humidity: Float
      windSpeed: Float
      summary: String
      rain: Float
      icon: String
      background: Background!
  }
  
  type Background{
  mobile: ID!
  desktop: ID!
  }
`;

module.exports = typeDefs;