import axios from 'axios'
import config from '../config'

export const getServicos = async () => {
    try {
        const response = await axios.get(`${config.url}/api/servicos?size=30`)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getServicoPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/servicos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteServico = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/servicos/${id}`)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const postServico = async (servico, especs) => {
    try {
        const response = await axios.post(`${config.url}/api/servicos`, {
            nome: servico.nome,
            descricao: servico.descricao,
            especialidades: especs
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
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
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
