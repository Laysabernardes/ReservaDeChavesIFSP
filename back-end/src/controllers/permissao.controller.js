// Importa o serviço responsável pela lógica de permissões
const ChavesServices = require("../services/permissao.service.js");
const services = new ChavesServices();

// Define a classe PermissaoController que contém métodos para lidar com solicitações relacionadas a permissõe
class PermissaoController {
    // Método para criar um novo pedido de permissão
    createPedido = async (req, res) => {
        try {
            // Extrai dados do corpo da requisição
            const { cd_matricula_funcionario, cd_matricula_estudante, cd_chave } = req.body;

            // Verifica se todos os campos necessários foram fornecidos
            if (!cd_matricula_funcionario || !cd_matricula_estudante || !cd_chave) {
                res.status(400).send({ message: "Preencha todos os espaços" });
            }

            // Chama o serviço para criar o pedido de permissão
            await services.create(cd_matricula_funcionario, cd_matricula_estudante, cd_chave);

            // Retorna uma resposta de sucesso
            res.status(201).send({
                message: "Pedido enviado ao prof com sucesso!",
            });
        } catch (err) {
            // Retorna uma resposta de erro em caso de falha
            res.status(500).send({ message: err });
        }
    };

    // Método para encontrar pedidos associados a um funcionário
    findFuncionario = async (req, res) => {
        try {
            // Obtém o código de matrícula do funcionário a partir dos parâmetros da requisição
            const { cd_matricula_funcionario } = req.params;

            // Verifica se o código de matrícula foi fornecido
            if (!cd_matricula_funcionario) {
                res.status(400).send({ message: "Adicione o código da chave!" });
            }

            // Chama o serviço para encontrar pedidos associados ao funcionário
            let pedidos = await services.findFuncionario(cd_matricula_funcionario);

            // Retorna os pedidos encontrados
            res.status(201).send({
                message: "Pedidos de permissão enviados:",
                pedidos: pedidos
            });
        } catch (err) {
            // Retorna uma resposta de erro se não houver pedidos ou ocorrer um erro
            res.status(404).send({ message: "Nenhum pedido feito!" });
        }
    };

    // Métodos semelhantes para encontrar pedidos associados a um estudante, uma permissão específica e todos os pedidos

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
    
    //MUDEI O UPDATE POR CAUSA DO FRONT SE VOCE MEXER EU TE MATO LUCAS 
    // Método para atualizar o status de uma permissão
    update = async (req, res) => {
        try {
            // Extrai dados do corpo da requisição
            const { id_permissao, ds_status } = req.body;
    
            // Verifica se todos os campos necessários foram fornecidos
            if (!id_permissao || !ds_status) {
                return res.status(400).send({ message: "Preencha os campos!" });
            }
    
            // Chama o serviço para atualizar o status da permissão
            await services.update(id_permissao, ds_status);
    
            // Retorna uma resposta de sucesso
            return res.status(201).send({
                message: "Permissão Status Update:",
                status: ds_status
            });
        } catch (err) {
            // Retorna uma resposta de erro em caso de falha
            return res.status(500).send({ message: err });
        }
    };
    
};

// Exporta a classe PermissaoController para ser utilizada em outros módulos
module.exports = PermissaoController;