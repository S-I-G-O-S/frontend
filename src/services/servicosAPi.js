import axios from 'axios'
import config from '../services/config'

export const getServicos = async () => {
    try {
        const response = await axios.get(`${config.url}/api/servicos`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getServicoPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/servicos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}

export const deleteServico = async (id) => {
    try {
        await axios.delete(`${config.url}/api/servicos/${id}`)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao deletar: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const postServico = async (servico, especs) => {
    try {
        const response = await axios.post(`${config.url}/api/servicos`, {
            nome: servico.nome,
            descricao: servico.descricao,
            especialidades: especs
        })
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}
export const putServico = async (servico, especs) => {
    try {
        // console.warn("Enviadando " + 
        //     servico.id + " " +
        //     servico.nome + " " +
        //     servico.descricao + " " +
        //     especs)
        const response = await axios.put(`${config.url}/api/servicos`, {
            id: servico.id,
            nome: servico.nome,
            descricao: servico.descricao,
            especialidades: especs
        })
        return { success: true, data: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
