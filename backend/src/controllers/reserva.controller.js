const ReservaServicesServices = require("../services/reserva.service.js");
const services = new ReservaServicesServices();
class ReservaController {
  create = async (req, res) => {
    try {//constante que verifica todos os campos
      const { cd_solicitante, cd_cargo, cd_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, ds_tempo_entrega } = req.body;

      if (!cd_solicitante || !cd_cargo || !cd_permissao_estudante || !cd_chave || !dt_reserva || !dt_devolucao || !ds_status || !ds_tempo_entrega) {
        res.status(400).send({ message: "Preencha todos os espaços" });
      }

      //await é usado junto com async
      await services.create(cd_solicitante, cd_cargo, cd_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, ds_tempo_entrega);

      res.status(201).send({
        message: "Reserva criada com sucesso!",
        reserva: {
          cd_solicitante, cd_cargo, cd_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, ds_tempo_entrega
        }
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  find = async (req, res) => {
    try {//constante que verifica todos os campos
      const { id_reserva } = req.params;

      if (!id_reserva) {
        res.status(400).send({ message: "Adicione o código da Reserva!" });
      }

      //await é usado junto com async
      let reserva = await services.find(id_reserva);

      res.status(201).send({
        message: "Reserva:",
        reserva: reserva
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  findAll = async (req, res) => {
    try {
      const reserva = await services.findAll();

      if (reserva.length === 0) {
        return res.status(400).send({ message: "Não existe nenhuma reserva registrada" });
      }
      res.send(reserva);
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  };

  update = async (req, res) => {
    try {//constante que verifica todos os campos
      const { id_reserva, ds_status } = req.body;

      if (!id_reserva || !ds_status) {
        res.status(400).send({ message: "Preencha os campos!" });
      }

      //await é usado junto com async
      await services.update(id_reserva, ds_status);


      res.status(201).send({
        message: "Reserva Status Update:",
        status: ds_status
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  delete = async (req, res) => {
    try {
      const { id_reserva} = req.params;

      if (!id_reserva) {
        res.status(400).send({ message: "Adicione o código da Reserva!" });
      }

      //await é usado junto com async
      let reserva = await services.delete(id_reserva);

      res.status(201).send({
        message: "Reserva:",
        reserva: reserva
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
}

module.exports = ReservaController;