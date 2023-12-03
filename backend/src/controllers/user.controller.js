const UserServices = require("../services/user.service.js");
const services = new UserServices();

class UserController{
    login = async (req, res) => {
        try {//constante que verifica todos os campos
            const {login, senha} = req.body;

            if (!login || !senha) {
                res.status(400).send({ message: "Preencha todos os espaços!" });
            }

            //await é usado junto com async
            let user = await services.login(login, senha);

            res.status(201).send({
                message: "Usuario:",
                user: user
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }

    findAll = async (req, res) => {
        try {
            const locais = await userServices.findAllUser();

            if (locais.length === 0) {
                return res.status(400).send({ message: "Não existe nenhum usuário registrado" });
            }
            res.send(locais);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    };

    updateSenha = async (req, res) => {
        try {
            const { cd_matricula_usuario, cd_senha_usuario } = req.body;
    
            if (!cd_matricula_usuario || !cd_senha_usuario) {
                return res.status(400).send({ message: "Campos inválidos ou ausentes", error: "Detalhes adicionais sobre o erro" });
            }
            
    
            //await é usado junto com async
            await services.updateSenha(cd_matricula_usuario, cd_senha_usuario);
    
            res.status(201).send({
                message: "Senha atualizada com sucesso:",
                senha: cd_senha_usuario
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };
}

module.exports = UserController;




