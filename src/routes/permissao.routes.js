// Importa o módulo Router do Express, que permite criar rotas
const { Router } = require("express");

// Cria uma instância de Router para definir as rotas relacionadas aos locais
const localRouter = Router();

// Importa a classe PermissaoController que contém lógica para manipular permissões
const PermissaoController = require("../controllers/permissao.controller.js"); 

// Cria uma instância do PermissaoController
const controller = new PermissaoController();

// Define as rotas para diferentes operações relacionadas a permissões usando métodos do PermissaoController

// Rota para criar um novo pedido de permissão (método HTTP POST)
localRouter.post("/", controller.createPedido);

// Rota para encontrar pedidos associados a um funcionário (método HTTP GET)
localRouter.get("/funcionario/:cd_matricula_funcionario", controller.findFuncionario);

// Rota para encontrar pedidos associados a um estudante (método HTTP GET)
localRouter.get("/estudante/:cd_matricula_estudante", controller.findEstudante);

// Rota para encontrar uma permissão específica pelo seu ID (método HTTP GET)
localRouter.get("/id/:id_permissao", controller.findPermissao);

// Rota para encontrar todos os pedidos de permissão (método HTTP GET)
localRouter.get("/", controller.findAll);

// Rota para atualizar o status de uma permissão (método HTTP PATCH)
localRouter.patch("/", controller.update);

// Pode-se adicionar mais rotas, como uma rota para deletar, se necessário
// localRouter.delete("/:cd_chave", controller.delete);

// Exporta o localRouter para ser utilizado em outros módulos
module.exports = localRouter;
