import axios from 'axios'
import config from '../config'

export const getEspecialidades = async () => {
    try {
        const response = await axios.get(`${config.url}/api/especialidades`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const deleteEspec = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/especialidades/${id}`)
        console.log(response)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao deletar: ${error.response?.data?.message || error.message}`,
        }
    }
}
export const postEspecialidade = async (espec) => {
    try {
        const response = await axios.post(`${config.url}/api/especialidades`, {
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
export const putEspecialidade = async (espec) => {
    try {
        const response = await axios.put(`${config.url}/api/especialidades`, {
            id: espec.id,
            nome: espec.nome,
            descricao: espec.descricao,
            cor: espec.cor
        })
        return { success: true, response: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
