const {Router} = require("express");
const SolicitacaoRouter = Router();

// Classe dos Reserva
const SolicitacaoController = require("../controllers/solicitacao.controller.js"); 
const controller = new SolicitacaoController();

// Funções de Reserva
SolicitacaoRouter.post("/", controller.create);
SolicitacaoRouter.get("/:id_permissao", controller.find);
SolicitacaoRouter.get("/", controller.findAll);
SolicitacaoRouter.patch("/", controller.update);
SolicitacaoRouter.delete("/:id_permissao", controller.delete);

module.exports = SolicitacaoRouter;