const { Router } = require("express");

const { login} = require("../controllers/auth.controller.js");

const router = Router();

router.post("/auth", login);

module.exports = router;
