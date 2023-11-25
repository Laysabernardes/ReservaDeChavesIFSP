const find = require("../services/user.service.js");

class UserController{
    find = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd, cd_matricula, nome, cargo} = req.body;

            if (!cd || !cd_matricula || !nome || !cargo) {
                res.status(400).send({ message: "Preencha todos os espaços!" });
            }

            //await é usado junto com async
            await find(cd, cd_matricula, nome, cargo);

            res.status(201).send({
                message: "Usuario:",
                user: {
                    cd,
                    cd_matricula,
                    nome,
                    cargo
                }
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





