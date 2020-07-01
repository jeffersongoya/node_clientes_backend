const neo4j = require('neo4j-driver');

const Bolt_URL = 'bolt://107.22.143.68:33569';
const Username = 'neo4j';
const Password = 'retailers-relationships-educator';

const driver = neo4j.driver(Bolt_URL, neo4j.auth.basic(Username, Password));

execute = async function (query) {
  const session = driver.session();
  let response = await session.run(query, {});
  response = response.records.map(item => item._fields)
  if (response.length > 0)
    response = response.map(item => item[0].properties);

  return response;
};

module.exports = { execute };


