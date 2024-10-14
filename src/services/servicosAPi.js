import axios from 'axios'
import config from '../services/devConfig'

export const getServicos = async () => {
    try {
        const response = await axios.get(`/api/servicos`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}

export const deleteServicos = async (id) => {
    try {
        await axios.delete(`api/servicos/${id}`)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao deletar: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const postServicos = async (servico) => {
    try {
        const response = await axios.post(`/api/servicos`, {
            // TODO Adaptar para add novo servico
            nome: servico.nome,
            descricao: servico.descricao,
        })
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const putServicos = async (servico) => {
    try {
        const response = await axios.put(`/api/servicos/${servico.id}`, servico)
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
