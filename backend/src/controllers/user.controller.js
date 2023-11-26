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
                return res.status(400).send({ message: "Não existe nenhum local registrado" });
            }
            res.send(locais);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    };
}

module.exports = UserController;




