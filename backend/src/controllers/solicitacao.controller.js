const SolicitacaoServices = require("../services/solicitacao.service.js");
const services = new SolicitacaoServices();
class SolicitacaoController {
  create = async (req, res) => {
    try {//constante que verifica todos os campos
      const { cd_funcionario, cd_estudante, cd_chave, ds_status } = req.body;

      if (!cd_funcionario || !cd_estudante || !cd_chave || !ds_status) {
        res.status(400).send({ message: "Preencha todos os espaços" });
      }

      //await é usado junto com async
      await services.create(cd_funcionario, cd_estudante, cd_chave, ds_status);

      res.status(201).send({
        message: "Solicitação criada com sucesso!",
        reserva: {
            cd_funcionario, cd_estudante, cd_chave, ds_status
        }
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  find = async (req, res) => {
    try {//constante que verifica todos os campos
      const { id_permissao } = req.params;

      if (!id_permissao) {
        res.status(400).send({ message: "Adicione o código da Permissão do Aluno!" });
      }

      //await é usado junto com async
      let permissao = await services.find(id_permissao);

      res.status(201).send({
        message: "Solicitação de permissão Aluno:",
        permissao: permissao
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  findAll = async (req, res) => {
    try {
      const permissao = await services.findAll();

      if (permissao.length === 0) {
        return res.status(400).send({ message: "Não existe nenhuma permissao registrada" });
      }
      res.send(permissao);
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  };

  update = async (req, res) => {
    try {//constante que verifica todos os campos
      const { id_permissao, ds_status } = req.body;

      if (!id_permissao || !ds_status) {
        res.status(400).send({ message: "Preencha os campos!" });
      }

      //await é usado junto com async
      await services.update(id_permissao, ds_status);


      res.status(201).send({
        message: "Solicitação Status Update:",
        status: ds_status
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  delete = async (req, res) => {
    try {
      const { id_permissao} = req.params;

      if (!id_permissao) {
        res.status(400).send({ message: "Adicione o código da permissão!" });
      }

      //await é usado junto com async
      let permissao = await services.delete(id_permissao);

      res.status(201).send({
        message: "permissão aluno:",
        permissa: permissao
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
}

module.exports = SolicitacaoController;