import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-reserva-ifsp.onrender.com/', 
    // ou http://localhost:3001/ 
  });

export default instance;