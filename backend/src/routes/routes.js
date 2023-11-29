const {Router} = require("express");

// Importando rotas
const localRouter = require("./chaves.routes");
const userRouter = require("./user.routes");
const reservaRouter = require("./reserva.routes");
const permissaoRouter = require("./permissao.routes");
const SolicitacaoRouter = require("./solicitacao.route")


const router = Router();
router.use("/chaves", localRouter);
router.use("/user", userRouter);
router.use("/reserva", reservaRouter);
router.use("/permissao", permissaoRouter);
router.use("/solicitacao", SolicitacaoRouter);

module.exports = router;
