import axios from 'axios';

// Configuración básica de Axios
const api = axios.create({
  baseURL: '/api', 
});

export default api;
