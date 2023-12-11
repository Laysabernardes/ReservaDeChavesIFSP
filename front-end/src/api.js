import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.111.50.229/ReservaDeChavesIFSP/backend', // Substitua pela URL do seu backend
  });

export default instance;

// class Api {

//   // Configuração padrão do Axios http://localhost:3001 
//   api = axios.create({
//     baseURL: 'http://localhost:3001',
//   });
  
//   // Exemplo de função para fazer uma solicitação de registro de usuário
//   registerUser = (userData) => {
//     return this.api.post('/users/', userData);
//   };
  
//   // Exemplo de função para fazer uma solicitação de login de usuário
//   loginUser = (userData) => {
//     return this.api.post('/auth/', userData);
//   };
// }
