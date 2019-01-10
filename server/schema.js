const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
      user: User!
  }
  
  type User {
      id: ID!
      name: String!
      age: Int
  }
`;

export default typeDefs;