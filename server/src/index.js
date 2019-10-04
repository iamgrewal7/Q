const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolver');


const server = new ApolloServer({cors: true,  typeDefs, resolvers});

server.listen().then(() => {
    console.log('Server ready');
})