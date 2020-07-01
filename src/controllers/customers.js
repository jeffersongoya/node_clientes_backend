const Customer = require('../models/customers');

class ControllerCustomer {
  getAll = async function (req, res) {
    const resp = await Customer.getAll();
    const result = resp;
    res.json(result);
  }

  getOne = async function (req, res) {
    const cpf = req.params.cpf;
    if (cpf === "") {
      throw Error("Cpf não foi preenchido")
    }

    const resp = await Customer.getOne(params);

    const result = resp;
    res.json(result);
  }

  insert = async function (req, res) {
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let email = req.body.email;
    let telefone = req.body.telefone;

    if (nome === "") {
      throw Error("Nome não foi preenchido")
    }

    if (cpf === "") {
      throw Error("Cpf não foi preenchido")
    }

    if ((email != "") && (email.indexOf("@") == -1)) {
      throw Error("Email inválido")
    }

    const exist = await Customer.getOne(cpf);
    if (exist.length > 0) {
      throw Error("CPF já existe")
    }

    let ins = await Customer.insert({
      nome: nome,
      cpf: cpf,
      email: email,
      telefone: telefone,
    });
    const result = ins;
    res.json(result);
  }

  change = async function (req, res) {
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let id = req.params.cpf;

    if (nome === "") {
      throw Error("Nome não foi preenchido")
    }

    if (id === "") {
      throw Error("Cpf não foi preenchido")
    }

    if ((email != "") && (email.indexOf("@") == -1)) {
      throw Error("Email inválido")
    }

    const resp = await Customer.getOne(id);
    if (!resp || !resp.length) {
      throw Error(`CPF do cliente "${id}" não encontrado.`);
    }
    let alt = await Customer.change({ cpf: id, nome: nome, email: email, telefone: telefone });
    const result = { alt };
    res.json(result);
  }

  delete = async function (req, res) {
    let cpf = req.params.cpf;
    if (cpf === "") {
      throw Error("Cpf não foi preenchido")
    }

    const resp = await Customer.getOne(cpf);
    if (!resp || !resp.length) {
      try {
        throw Error(`CPF do cliente "${cpf}" não encontrado.`);
      }
      catch (error) {
        res.status(500).json({ error: error });
      }
    }

    let del = await Customer.delete({ cpf: cpf });
    const result = {};
    res.json(result);
  }
}

module.exports = ControllerCustomer;
