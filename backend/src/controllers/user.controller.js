// Importa a classe UserServices que contém métodos relacionados a serviços de usuário
const UserServices = require("../services/user.service.js");

// Cria uma instância da classe UserServices para poder utilizar seus métodos
const services = new UserServices();

// Classe responsável por lidar com as requisições relacionadas a usuários
class UserController {

    // Método para lidar com a requisição de login de um usuário
    login = async (req, res) => {
        try {
            // Extrai os campos de login e senha do corpo da requisição
            const { login, senha } = req.body;

            // Verifica se os campos estão preenchidos, caso contrário, retorna um erro 400
            if (!login || !senha) {
                res.status(400).send({ message: "Preencha todos os espaços!" });
            }

            // Chama o método de login da instância de UserServices e aguarda a resposta
            let user = await services.login(login, senha);

            // Retorna uma resposta de sucesso junto com as informações do usuário
            res.status(201).send({
                message: "Usuario:",
                user: user
            });
        } catch (err) {
            // Retorna um erro 500 caso ocorra algum problema durante o processo
            res.status(500).send({ message: err });
        }
    }

    // Método para lidar com a requisição de listar todos os usuários
    findAll = async (req, res) => {
        try {
            // Chama o método para encontrar todos os usuários da instância de UserServices e aguarda a resposta
            const users = await services.findAllUser();

            // Verifica se há usuários, caso contrário, retorna um erro 400
            if (users.length === 0) {
                return res.status(400).send({ message: "Não existe nenhum usuário registrado" });
            }

            // Retorna a lista de usuários em caso de sucesso
            res.send(users);
        } catch (err) {
            // Retorna um erro 500 caso ocorra algum problema durante o processo
            res.status(500).send({ message: err.message })
        }
    };

    // Método para lidar com a requisição de atualização de senha de um usuário
    updateSenha = async (req, res) => {
        try {
            // Extrai os campos de matrícula e nova senha do corpo da requisição
            const { cd_matricula_usuario, cd_senha_usuario } = req.body;

            // Verifica se os campos estão preenchidos, caso contrário, retorna um erro 400
            if (!cd_matricula_usuario || !cd_senha_usuario) {
                return res.status(400).send({ message: "Campos inválidos ou ausentes", error: "Detalhes adicionais sobre o erro" });
            }

            // Chama o método de atualização de senha da instância de UserServices e aguarda a resposta
            await services.updateSenha(cd_matricula_usuario, cd_senha_usuario);

            // Retorna uma resposta de sucesso junto com a mensagem e a nova senha
            res.status(201).send({
                message: "Senha atualizada com sucesso:",
                senha: cd_senha_usuario
            });
        } catch (err) {
            // Retorna um erro 500 caso ocorra algum problema durante o processo
            res.status(500).send({ message: err });
        }
    };
}

// Exporta a classe UserController para ser utilizada em outros módulos
module.exports = UserController;
