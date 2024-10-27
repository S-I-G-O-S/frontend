import axios from 'axios'
import config from '../services/devConfig'

export const getFuncionarioPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}