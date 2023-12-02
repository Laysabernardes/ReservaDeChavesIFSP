const {Router} = require("express");
const localRouter = Router();

// Classe dos locais
const PermissaoController = require("../controllers/permissao.controller.js"); 
const controller = new PermissaoController();

// Funções de Usuário
localRouter.post("/", controller.createPedido);
localRouter.get("/funcionario/:cd_funcionario", controller.findFuncionario);
localRouter.get("/estudante/:cd_estudante", controller.findEstudante);
localRouter.get("/id/:id_permissao", controller.findPermissao);
localRouter.get("/", controller.findAll);
localRouter.patch("/", controller.update);
// localRouter.delete("/:cd_chave", controller.delete);

module.exports = localRouter;