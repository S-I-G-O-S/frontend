import axios from 'axios'
import config from '../services/devConfig'

export const getEspecialidades = async () => {
    try {
        const response = await axios.get(`/api/especialidades`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}

export const deleteEspec = async (id) => {
    try {
        await axios.delete(`api/especialidade/${id}`)
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
        const response = await axios.post(`/api/especialidade`, {
            nome: espec.nome,
            descricao: espec.descricao,
            cor: espec.cor,
        })
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const putEspecialidade = async (espec) => {
    try {
        const response = await axios.put(`/api/especialidade/${espec.id}`, espec)
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
