const { Router } = require("express");
// Importa o módulo "Router" do Express, que permite definir rotas.
const { login, redirecionar} = require("../controllers/auth.controller.js");
// Importa a função "login" do arquivo de controlador "auth.controller.js".

const router = Router();
// Cria uma instância do Router para definir as rotas.

router.post("/", login);
// Define uma rota POST no endpoint raiz ("/") que será acessada quando uma solicitação POST for feita para o servidor.
// Quando essa rota é acessada, a função "login" do controlador será chamada para processar a solicitação.


router.get("/", redirecionar);

module.exports = router;
// Exporta o router, que contém a rota definida, para que ele possa ser usado em outros lugares do aplicativo.