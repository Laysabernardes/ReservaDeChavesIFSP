const {Router} = require("express");
const localRouter = Router();

// Classe dos locais
const LocaisController = require("../controllers/locais.controller.js"); 
const controller = new LocaisController();

// Funções de Usuário
localRouter.post("/", controller.create);
localRouter.get("/", controller.findAll);

module.exports = localRouter;