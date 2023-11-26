const ChavesServices = require("../services/chaves.service.js");
const CardsFunctions = require("./cards.local.controller.js");

const cardsFunc = new CardsFunctions();
const services = new ChavesServices();

// //Capturando a seção de locais em que a categoria seja = a salas
// const locaisSalas = document.querySelector("data-salas");
// //Capturando a seção de locais em que a categoria seja = a labs
// const locaisLabs = document.querySelector("[data-labs]");
// //Capturando a seção de locais em que a categoria seja = a diversos
// const locaisDiversos = document.querySelector("[data-diversos]");

// //Recorrer los datos traidos del JSON
// locaisServices.findAllLocal().then(data => {
//   data.forEach(({nome, categoria, status}) => {
//     //Imprimir os campos no index com a função MostraLocal 
//     if(categoria === "Sala"){
//       const localCard = cardsFunc.MostrarLocal(nome, categoria, status);
//       locaisSalas.appendChild(localCard); // Adiciona o card criado na div das salas
//     }else if(categoria === "Laboratório"){
//       const localCard = cardsFunc.MostrarLocal(nome, categoria, status);
//       locaisLabs.appendChild(localCard); // Adiciona o card criado na div dos laboratórios
//     }else if(categoria === "Diverso"){
//       const localCard = cardsFunc.MostrarLocal(nome, categoria, status);
//       locaisDiversos.appendChild(localCard); // Adiciona o card criado na div dos diversos
//     }
//   });
// })

class ChavesController{
    create = async (req, res) => {
        try {//constante que verifica todos os campos
            const { nm_sala, ds_sala, ds_status } = req.body;

            if (!nm_sala || !ds_sala || !ds_status) {
                res.status(400).send({ message: "Preencha todos os espaços" });
            }

            //await é usado junto com async
            await services.create(nm_sala, ds_sala, ds_status);

            res.status(201).send({
                message: "Chave criada com sucesso!",
                chave: {
                    nm_sala, 
                    ds_sala, 
                    ds_status
                }
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }

    find = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_chave } = req.params;

            if (!cd_chave) {
                res.status(400).send({ message: "Adicione o código da chave!" });
            }

            //await é usado junto com async
            let chave = await services.find(cd_chave);

            res.status(201).send({
                message: "Chave:",
                chave: chave
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }

    findAll = async (req, res) => {
        try {
            const chaves = await services.findAll();

            if (chaves.length === 0) {
                return res.status(400).send({ message: "Não existe nenhum local registrado" });
            }
            res.send(chaves);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    };

    update = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_chave, ds_status } = req.body;

            if (!cd_chave || !ds_status) {
                res.status(400).send({ message: "Preencha os campos!" });
            }

            //await é usado junto com async
            await services.update(cd_chave, ds_status);

            
            res.status(201).send({
                message: "Chave Status Update:",
                status: ds_status
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }

    delete = async (req, res) => {
        try{
            const {cd_chave} = req.params;

            if (!cd_chave) {
                res.status(400).send({ message: "Adicione o código da chave!" });
            }

            //await é usado junto com async
            let chave = await services.delete(cd_chave);

            res.status(201).send({
                message: "Chave:",
                chave: chave
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }
}

module.exports = ChavesController;





