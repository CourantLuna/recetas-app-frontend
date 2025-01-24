import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data; // Devuelve el token
    } catch (error) {
        throw error.response ? error.response.data : 'Error al conectar con el servidor';
    }
};
