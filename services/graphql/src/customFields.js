const { GraphQLString, GraphQLInt } = require('graphql');
const { connectionFromPromisedArray } = require('graphql-relay');
const _ = require('./graph');
const { query } = require('./db');

_['http://www.w3.org/2000/01/rdf-schema#label'].isGraphqlList = false;

// Add a debug "IRI" field because those Relay ids are not helping
_.addFieldOnObjectType('http://foo.com#Thing', 'iri', {
  type: GraphQLString,
  resolve: source => source.id,
});

// Add user's stories count
_.addFieldOnObjectType('http://foo.com#User', 'storyCount', {
  type: GraphQLInt,
  resolve: (source, args, { viewer }) => query(db => db
    .collection('Story')
    .count({ sourceUser: viewer.id })
  ),
});

// Manage connections
_['http://foo.com#vocationInstances'].isRelayConnection = true;

_['http://foo.com#stories'].isRelayConnection = true;
_['http://foo.com#stories'].graphqlFieldConfigExtension = {
  resolve: (source, args, { viewer }) => connectionFromPromisedArray(
    query(db => db
      .collection('Story')
      .find({ sourceUser: viewer.id })
      .sort({ createdAt: -1 })
      .toArray()
    ),
    args
  ),
};
