import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/', 
    // ou http://localhost:3001/ OU https://backend-reserva-ifsp.onrender.com/
  });

export default instance;