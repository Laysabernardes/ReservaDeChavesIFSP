const {Router} = require("express");
const localRouter = Router();

// Classe dos locais
const ChavesController = require("../controllers/chaves.controller.js"); 
const controller = new ChavesController();

// Funções de Usuário
localRouter.post("/", controller.create);
localRouter.get("/", controller.findAll);

module.exports = localRouter;