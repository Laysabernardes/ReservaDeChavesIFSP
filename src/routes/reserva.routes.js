const {Router} = require("express");
const reservaRouter = Router();

// Classe dos Reserva
const ReservaController = require("../controllers/reserva.controller.js"); 
const controller = new ReservaController();

// Funções de Reserva
reservaRouter.post("/", controller.create);
reservaRouter.get("/:id_reserva", controller.find);
reservaRouter.get("/solicitante/:cd_matricula_solicitante", controller.findBySolicitante);
reservaRouter.get("/", controller.findAll);
reservaRouter.patch("/", controller.update);
reservaRouter.delete("/:id_reserva", controller.delete);
// reservaRouter.post("/detalhes", controller.adicionarDetalhesReserva);
reservaRouter.get("/detalhes/:dt_reserva", controller.findByDataReserva);

module.exports = reservaRouter;