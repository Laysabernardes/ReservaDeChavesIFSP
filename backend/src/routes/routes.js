const {Router} = require("express");

// Importando rotas
//const localRouter = require("./local.routes");
const authRouter = require("./auth.routes");

const router = Router();
//router.use("/local", localRouter);
router.use("/auth", authRouter);

module.exports = router;