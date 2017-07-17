const uuid = require('uuid').v4;

function createResource(type, context, data) {
  if (!(typeof type === 'string' || type.length)) throw new Error(`Invalid type: "${type}"`);

  const id = `http://foo.com/individuals#${type}_${uuid()}`;
  const nowIso = new Date().toISOString();

  return Object.assign({
    id,
    type: `http://foo.com#${type}`,
    createdAt: nowIso,
    updatedAt: nowIso,
    sourcePerson: context.user ? context.user.id : id,
    sourceIp: '0.0.0.0',
  }, data);
}

module.exports = createResource;
