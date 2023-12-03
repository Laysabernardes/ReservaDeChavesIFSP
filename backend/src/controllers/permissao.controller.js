const ChavesServices = require("../services/permissao.service.js");
const services = new ChavesServices();

class PermissaoController {
    createPedido = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_matricula_funcionario, cd_matricula_estudante, cd_chave } = req.body;

            if (!cd_matricula_funcionario || !cd_matricula_estudante || !cd_chave) {
                res.status(400).send({ message: "Preencha todos os espaços" });
            }

            //await é usado junto com async
            await services.create(cd_matricula_funcionario, cd_matricula_estudante, cd_chave);

            res.status(201).send({
                message: "Pedido enviado ao prof com sucesso!",
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

    findFuncionario = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_matricula_funcionario } = req.params;

            if (!cd_matricula_funcionario) {
                res.status(400).send({ message: "Adicione o código da chave!" });
            }

            //await é usado junto com async
            let pedidos = await services.findFuncionario(cd_matricula_funcionario);

            res.status(201).send({
                message: "Pedidos de permissão enviados:",
                pedidos: pedidos
            });
        } catch (err) {
            res.status(404).send({ message: "Nenhum pedido feito!" });
        }
    };

    findEstudante = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_matricula_estudante } = req.params;

            if (!cd_matricula_estudante) {
                res.status(400).send({ message: "Adicione o Código do Estudante" });
            }

            //await é usado junto com async
            let pedidos = await services.findEstudante(cd_matricula_estudante);

            res.status(201).send({
                message: "Seus Pedidos E/OU Permissões:",
                pedidos: pedidos
            });
        } catch (err) {
            res.status(404).send({ message: "Não há pedidos em andamentou E/OU permissões" });
        }
    };

    findPermissao = async (req, res) => {
        try {//constante que verifica todos os campos
            const { id_permissao } = req.params;

            if (!id_permissao) {
                res.status(400).send({ message: "Adicione o código da permissão!" });
            }

            //await é usado junto com async
            let permissao = await services.findPermissao(id_permissao);

            res.status(201).send({
                message: "Permissão:",
                pedidos: permissao
            });
        } catch (err) {
            res.status(404).send({ message: "Permissão não consta no banco" });
        }
    };
    
    findAll = async (req, res) => {
        try {
            const pedidos = await services.findAll();

            if (pedidos.length === 0) {
                return res.status(400).send({ message: "Não existe nenhum local registrado" });
            }
            res.send(pedidos);
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
                message: "Permissão Status Update:",
                status: ds_status
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };
};

module.exports = PermissaoController;