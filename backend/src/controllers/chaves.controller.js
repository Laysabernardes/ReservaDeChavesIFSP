<<<<<<< HEAD:backend/src/controllers/locais.controller.js
// const locaisServices = require("../services/locais.service.js");
// const CardsFunctions = require("./cards.local.controller.js");
// const cardsFunc = new CardsFunctions();
=======
const locaisServices = require("../services/chaves.service.js");
const CardsFunctions = require("./cards.local.controller.js");
const cardsFunc = new CardsFunctions();
>>>>>>> 4f306e23e687bb451717658c96f2d2d6432dd3cb:backend/src/controllers/chaves.controller.js

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

<<<<<<< HEAD:backend/src/controllers/locais.controller.js
// class LocaisController{
//     create = async (req, res) => {
//         try {//constante que verifica todos os campos
//             const { nome, categoria, status} = req.body;
=======
class ChavesController{
    create = async (req, res) => {
        try {//constante que verifica todos os campos
            const { nome, categoria, status} = req.body;
>>>>>>> 4f306e23e687bb451717658c96f2d2d6432dd3cb:backend/src/controllers/chaves.controller.js

//             if (!nome || !categoria || !status) {
//                 res.status(400).send({ message: "Preencha todos os espaços" });
//             }

//             //await é usado junto com async
//             const local = await locaisServices.createLocal(req.body);

//             if (!local) {
//                 return res.status(400).send({ message: "Erro ao criar Local" });
//             }

//             res.status(201).send({
//                 message: "Local criado com sucesso!",
//                 local: {
//                     id: local._id,
//                     nome,
//                     categoria,
//                     status,
//                 }
//             });
//         } catch (err) {
//             res.status(500).send({ message: err });
//         }
//     }

//     findAll = async (req, res) => {
//         try {
//             const locais = await locaisServices.findAllLocal();

//             if (locais.length === 0) {
//                 return res.status(400).send({ message: "Não existe nenhum local registrado" });
//             }
//             res.send(locais);
//         } catch (err) {
//             res.status(500).send({ message: err.message })
//         }
//     };
// }

<<<<<<< HEAD:backend/src/controllers/locais.controller.js
// module.exports = LocaisController;
=======
module.exports = ChavesController;
>>>>>>> 4f306e23e687bb451717658c96f2d2d6432dd3cb:backend/src/controllers/chaves.controller.js





