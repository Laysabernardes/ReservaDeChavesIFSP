import { locaisServices } from "../services/Locais.service.js";
import { CardsFunctions } from "./cards.local.controller.js";
const cardsFunc = new CardsFunctions();

//Capturando a seção de locais em que a categoria seja = a salas
const locaisSalas = document.querySelector("[data-salas]");
//Capturando a seção de locais em que a categoria seja = a labs
const locaisLabs = document.querySelector("[data-labs]");
//Capturando a seção de locais em que a categoria seja = a diversos
const locaisDiversos = document.querySelector("[data-diversos]");

//Recorrer los datos traidos del JSON
locaisServices.listaLocais().then(data => {
  data.forEach(({nome, categoria, situacao}) => {
    //Imprimir os campos no index com a função MostraLocal 
    if(categoria === "Sala"){
      const localCard = cardsFunc.MostrarLocal(nome, categoria, situacao);
      locaisSalas.appendChild(localCard); // Adiciona o card criado na div das salas
    }else if(categoria === "Laboratório"){
      const localCard = cardsFunc.MostrarLocal(nome, categoria, situacao);
      locaisLabs.appendChild(localCard); // Adiciona o card criado na div dos laboratórios
    }else if(categoria === "Diverso"){
      const localCard = cardsFunc.MostrarLocal(nome, categoria, situacao);
      locaisDiversos.appendChild(localCard); // Adiciona o card criado na div dos diversos
    }
  });
})


