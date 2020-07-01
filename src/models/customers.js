const neo4j = require('../neo4j/index');

class Customer {
  nome = "";
  cpf = "";
  email = "";
  telefone = "";

  static insert = async obj => {
    let response = await neo4j.execute(`CREATE (c: Customer {
        nome: "${obj.nome}", 
        cpf: "${obj.cpf}",
        telefone: "${obj.telefone}", 
        email: "${obj.email}"
       })`);

    return response;
  };

  static change = async obj => {
    let response = await neo4j.execute(`MATCH (c: Customer)
    WHERE c.cpf = "${obj.cpf}"
    SET c = {nome: "${obj.nome}", 
             telefone: "${obj.telefone}", 
             email: "${obj.email}",
             cpf: "${obj.cpf}"
            }`);

    return response;
  };

  static delete = async obj => {
    let response = await neo4j.execute(`MATCH (c: Customer) WHERE c.cpf = "${obj.cpf}" DELETE c`);

    return response;
  };

  static getAll = async () => {
    let response = await neo4j.execute(`MATCH (c: Customer) RETURN c`);

    return response;
  };

  static getOne = async cpf => {
    let response = await neo4j.execute(`MATCH (c:Customer) WHERE c.cpf = "${cpf}" RETURN c`);
    //let response = await neo4j.execute(`MATCH (c:Customer) WHERE c.cpf = '${cpf}' RETURN c`);

    return response;
  };
};

module.exports = Customer;