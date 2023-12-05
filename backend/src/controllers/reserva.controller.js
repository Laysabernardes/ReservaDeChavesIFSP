const ReservaServicesServices = require("../services/reserva.service.js");
const services = new ReservaServicesServices();
class ReservaController {
  create = async (req, res) => {
    try {//constante que verifica todos os campos
      const { cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status } = req.body;

      if (!cd_matricula_solicitante || !cd_cargo || !cd_chave || !dt_reserva || !dt_devolucao || !ds_status) {
        res.status(400).send({ message: "Preencha todos os espaços" });
      }

      //await é usado junto com async
      await services.create(cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status);

      // Verifique se a resposta já foi enviada
      if (!res.headersSent) {
        res.status(201).send({
          message: "Reserva criada com sucesso!",
          reserva: {
            cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status
          }
        });
      }
    } catch (err) {
      if (!res.headersSent) {
        res.status(500).send({ message: err.message });
      }
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
      const { id_reserva } = req.params;

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
  adicionarDetalhesReserva = async (req, res) => {
    try {
      const { id_reserva, horariosSelecionados } = req.body;

      if (!id_reserva || !horariosSelecionados) {
        res.status(400).send({ message: "Preencha todos os espaços" });
      }
      await services.adicionarDetalhesReserva(id_reserva, horariosSelecionados);

      res.status(200).json({ mensagem: 'Detalhes da reserva adicionados com sucesso.' });
      if (!res.headersSent) {
        res.status(201).send({
          message: "Detalhes da reserva adicionados com sucesso",
          reserva: {
            id_reserva, horariosSelecionados
          }
        });
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).send({ message: err.message });
      }

    }
  };

}

module.exports = ReservaController;