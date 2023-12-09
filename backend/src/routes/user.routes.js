const { Router } = require("express");
// Importa o módulo "Router" do Express, que permite definir rotas.
const UserController = require("../controllers/user.controller.js");
// Importa a classe UserController do arquivo de controlador "user.controller.js".

const controller = new UserController();
// cria uma instância da classe UserController.
const router = Router();
// Cria uma instância do Router para definir as rotas.

router.post("/", controller.login);
router.post("/criar", controller.create);
router.patch("/senha", controller.updateSenha);
// Rota para encontrar pedidos associados a um estudante (método HTTP GET)
router.get("/nome/:cd_matricula_usuario", controller.findNome);
router.get("/cargo/:cd_cargo", controller.findCargo);
router.get("/tbcargo/:cd_cargo", controller.findTabelaCargo);
router.get("/tbcargo", controller.findAllCargo);


// Define uma rota POST no endpoint raiz ("/") que será acessada quando uma solicitação POST for feita para o servidor.
// Quando essa rota é acessada, a função "login" do controlador será chamada para processar a solicitação.

module.exports = router;
// Exporta o router, que contém a rota definida, para que ele possa ser usado em outros lugares do aplicativo.