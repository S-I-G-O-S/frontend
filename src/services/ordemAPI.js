import axios from 'axios'
import config from '../services/config'

export const getOrdens = async () => {
    try {
        const response = await axios.get(`${config.url}/api/ordens`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const postNovaOrdem = async (ordem) => {
    try {
        const response = await axios.post(`${config.url}/api/ordens`, {
            criadoPor: ordem.criadoPor,
            cliente: ordem.cliente,
            servico: ordem.servico,
            descricao: ordem.descricao,
        })
        return { success: true, response: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}