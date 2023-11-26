const {Router} = require("express");

// Importando rotas
const localRouter = require("./chaves.routes");
const userRouter = require("./user.routes")

const router = Router();
router.use("/chaves", localRouter);
router.use("/user", userRouter);

module.exports = router;