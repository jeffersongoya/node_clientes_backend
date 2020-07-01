const routes = require('express').Router();
let controller = require('../controllers/customers');
controller = new controller();

routes.get("/", async (req, res, next) => {
  try {
    await controller.getAll(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.post("/", async (req, res, next) => {
  try {
    await controller.insert(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.put("/:cpf", async (req, res, next) => {
  try {
    await controller.change(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

routes.delete("/:cpf", async (req, res, next) => {
  try {
    await controller.delete(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

routes.get("/:cpf", async (req, res, next) => {
  try {
    await controller.getOne(req, res);
  }
  catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

module.exports = routes;