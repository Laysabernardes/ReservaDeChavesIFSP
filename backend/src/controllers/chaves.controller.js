const ChavesServices = require("../services/chaves.service.js");
const CardsFunctions = require("./cards.local.controller.js");

const cardsFunc = new CardsFunctions();
const services = new ChavesServices();

// // //Capturando a seção de locais em que a categoria seja = a salas
// const locaisSalas = document.querySelector("data-salas");
// // //Capturando a seção de locais em que a categoria seja = a labs
// const locaisLabs = document.querySelector("[data-labs]");
// // //Capturando a seção de locais em que a categoria seja = a diversos
// const locaisDiversos = document.querySelector("[data-diversos]");

// // 
// locaisServices.findAllLocal().then(data => {
//     data.forEach(({ nm_chave, ds_chave, ds_status}) => {
//         //     //Imprimir os campos no index com a função MostraLocal 
//         if (categoria === "Sala") {
//             const localCard = cardsFunc.MostrarLocal(nm_chave, ds_chave, ds_status);
//             locaisSalas.appendChild(localCard);
//             // Adiciona o card criado na div das salas
//         } else if (categoria === "Laboratório") {
//             const localCard = cardsFunc.MostrarLocal(nm_chave, ds_chave, ds_status);
//             locaisLabs.appendChild(localCard);
//             // Adiciona o card criado na div dos laboratórios
//         } else if (categoria === "Diverso") {
//             const localCard = cardsFunc.MostrarLocal(nm_chave, ds_chave, ds_status);
//             locaisDiversos.appendChild(localCard);
//             // Adiciona o card criado na div dos diversos
//         }
//     });
// })

class ChavesController {
    create = async (req, res) => {
        try {//constante que verifica todos os campos
            const { nm_chave, ds_chave, ds_status, ds_obs_chave } = req.body;

            if (!nm_chave || !ds_chave || !ds_status || !ds_obs_chave) {
                res.status(400).send({ message: "Preencha todos os espaços" });
            }

            //await é usado junto com async
            await services.create(nm_chave, ds_chave, ds_status, ds_obs_chave);

            res.status(201).send({
                message: "Chave criada com sucesso!",
                chave: {
                    nm_chave,
                    ds_chave,
                    ds_status,
                    ds_obs_chave
                }
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

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
    };


    //Esta com erro
    findByCategoria = async (req, res) => {
        try {
            const { ds_chave } = req.query;
            console.log('Parâmetros recebidos:', { ds_chave });
    
            if (!ds_chave) {
                res.status(400).send({ message: "Adicione uma chave válida!" });
                return;
            }
    
            console.log('Parâmetros recebidos:', { ds_chave });
            let chave = await services.findByCategoria(ds_chave);
    
            console.log('Chave encontrada:', chave);
            
            if (chave.error) {
                res.status(404).send({ message: 'Chave não encontradaaa.' });
            } else {
                res.status(200).send({
                    message: "Chave:",
                    chave: chave
                });
            }
        } catch (err) {
            console.error('Erro na função findByCategoria:', err);
            res.status(500).send({ message: err.message });
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
    };

    delete = async (req, res) => {
        try {
            const { cd_chave } = req.params;

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
};

module.exports = ChavesController;