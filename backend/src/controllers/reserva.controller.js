const ReservaServicesServices = require("../services/reserva.service.js");
const services = new ReservaServicesServices();
class ReservaController {
  create = async (req, res) => {
    try {//constante que verifica todos os campos
      const { cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, hr_reserva } = req.body;

      if (!cd_matricula_solicitante || !cd_cargo || !cd_chave || !dt_reserva || !dt_devolucao || !ds_status || !hr_reserva) {
        res.status(400).send({ message: "Preencha todos os espaços" });
      }

      //await é usado junto com async
      const result = await services.create(cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, hr_reserva);

      const id_reserva = result.insertId; // Obtenha o ID da reserva

      // Verifique se a resposta já foi enviada
      if (!res.headersSent) {
        res.status(201).send({
          message: "Reserva criada com sucesso!",
          reserva: {
            cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status,id_reserva,
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

  // adicionarDetalhesReserva = async (req, res) => {
  //   try {
  //     const { id_reserva, horario_reservado, dt_reserva } = req.body;

  //     if (!id_reserva || !horario_reservado || !dt_reserva) {
  //       res.status(400).send({ message: "Preencha todos os espaços" });
  //     }
  //     await services.adicionarDetalhesReserva(id_reserva, horario_reservado, dt_reserva);

  //     res.status(200).json({ mensagem: 'Detalhes da reserva adicionados com sucesso.' });
  //     if (!res.headersSent) {
  //       res.status(201).send({
  //         message: "Detalhes da reserva adicionados com sucesso",
  //         reserva: {
  //           id_reserva, horario_reservado, dt_reserva
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     if (!res.headersSent) {
  //       res.status(500).send({ message: error.message });
  //     }

  //   }
  // };

  findByDataReserva = async (req, res) => {
    try {
      const { dt_reserva } = req.body;

      if (typeof dt_reserva === 'undefined' || dt_reserva.length === 0) {
        return res.status(400).json({ message: "Adicione uma data de reserva válida!" });
      }

      const result = await services.findByDataReserva(dt_reserva);

      if (result.length > 0) {
        console.log('Detalhes da reserva encontrados com sucesso:', result);
        return res.status(200).json({ message: 'Data encontrada com sucesso.', data: { dt_reserva, detalhes: result } });
      } else {
        return res.status(404).json({ message: 'Data não encontrada.' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

}

module.exports = ReservaController;