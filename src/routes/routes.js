const routes = require('express').Router();
let controller = require('../controllers/customers');
controller = new controller();

routes.get("/customer", async (req, res, next) => {
  try {
    await controller.getAll(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.post("/customer", async (req, res, next) => {
  try {
    await controller.insert(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.put("/customer/:cpf", async (req, res, next) => {
  try {
    await controller.change(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

routes.delete("/customer/:cpf", async (req, res, next) => {
  try {
    await controller.delete(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

routes.get("/customer/:cpf", async (req, res, next) => {
  try {
    await controller.getOne(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

routes.get("/", async (req, res, next) => {
  res.send('OK')
});

module.exports = routes;