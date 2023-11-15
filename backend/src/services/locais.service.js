//Conexão
const listaLocais = () => fetch('BANCO').then(response => response.json());

//Todos os locais cadastrados no banco
const findAllLocais = async (id) => {
  return fetch(`BANCO/locais/${id}`).then( response => response.json());
};

//Detalhes do local achado por ID
const findLocalByID = async () => {
  return fetch(`BANCO/locais/`).then( response => response.json());
};

export const locaisServices = {
  listaLocais,
  findAllLocais,
  findLocalByID,
}