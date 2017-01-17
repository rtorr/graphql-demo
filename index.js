const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const data = {
  'id': '123kdod',
  'first_name': 'Richard',
  'last_name': 'Torruellas',
  'favorite_games': [ { 'name': 'Overwatch', 'rating': 1 } ]
};

const GameType = new GraphQLObjectType({
  name: 'Game',
  description: 'A game',
  fields: () =>
    ({ name: { type: GraphQLString }, rating: { type: GraphQLInt } })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () =>
    ({
      id: { type: GraphQLID },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      favorite_games: { type: new GraphQLList(GameType) }
    })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root api',
  fields: () => ({ user: { type: UserType, resolve: () => data } })
});

const schema = new GraphQLSchema({ query: QueryType });

const app = express();
app.use('/graphql', cors(), graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
