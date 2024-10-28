import axios from 'axios'
import config from '../services/devConfig'

export const autenticarFunc = async (email, senha) => {
    try {
        const response = await axios.get(`${config.url}/login/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}