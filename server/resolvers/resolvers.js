const resolvers = {
  Query: {
    user(parent, args, ctx , info){
      return {id: "46784", name: "damn", age: 24};
    }
  }
};

export default resolvers;