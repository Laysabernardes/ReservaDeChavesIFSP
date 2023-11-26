const {Router} = require("express");

// Importando rotas
<<<<<<< HEAD
//const localRouter = require("./local.routes");
const authRouter = require("./auth.routes");

const router = Router();
//router.use("/local", localRouter);
router.use("/auth", authRouter);
=======
const localRouter = require("./chaves.routes");
const userRouter = require("./user.routes")

const router = Router();
router.use("/local", localRouter);
router.use("/user", userRouter);
>>>>>>> 4f306e23e687bb451717658c96f2d2d6432dd3cb

module.exports = router;