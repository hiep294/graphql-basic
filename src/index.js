const { GraphQLServer, PubSub } = require('graphql-yoga')
const db = require('./db')

// resolvers => as controller
const resolvers = require('./resolvers')
const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: require('./resolvers'),
  context: {
    db,
    pubsub
  }
})

server.start(() => {
  console.log(`the server is up`)
})