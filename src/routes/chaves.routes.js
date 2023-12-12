const {Router} = require("express");
const localRouter = Router();

// Classe dos locais
const ChavesController = require("../controllers/chaves.controller.js"); 
const controller = new ChavesController();

// Funções de Usuário
localRouter.post("/", controller.create);
localRouter.get("/:cd_chave", controller.find);
localRouter.get("/", controller.findAll);
localRouter.get("/categoria/:ds_chave", controller.findByCategoria);
localRouter.get("/status/:ds_status", controller.findByStatus);
localRouter.get("/nome/:nm_chave", controller.findByNome);
localRouter.patch("/", controller.update);
localRouter.delete("/:cd_chave", controller.delete);

module.exports = localRouter;