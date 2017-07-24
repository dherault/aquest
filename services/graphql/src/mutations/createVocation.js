const { GraphQLNonNull, GraphQLString } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const IndividualsType = require('../customTypes/IndividualsType');
const createResourceObject = require('../utils/createResourceObject');
const ensureAuth = require('../utils/ensureAuth');
const { query, createResource } = require('../db');
const _ = require('../graph');

module.exports = mutationWithClientMutationId({
  name: 'CreateVocation',
  inputFields: {
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    vocationEdge: {
      type: _.getEdgeType('http://foo.com#Vocation'),
      resolve: ({ vocation: { id } }) => query(db => db.collection('Vocation').find().toArray()).then(vocations => {
        const vocation = vocations.find(s => s.id === id);

        return {
          cursor: cursorForObjectInConnection(vocations, vocation),
          node: vocation,
        };
      }),
    },
    individuals: IndividualsType.field,
  },
  mutateAndGetPayload: ensureAuth(({ label }, context) => {
    const vocation = createResourceObject('Vocation', context, { label });

    return createResource(vocation).then(() => ({ vocation }));
  }),
});
