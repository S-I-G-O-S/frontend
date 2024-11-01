import axios from 'axios'
import config from '../services/devConfig'

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
            nome: espec.nome,
            descricao: espec.descricao,
            cor: espec.cor,
        })
        return { success: true, response: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}