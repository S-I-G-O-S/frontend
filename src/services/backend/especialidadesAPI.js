import axios from 'axios'
import config from '../config'

export const getEspecialidades = async () => {
    // DUVIDA está vindo todas as especialidades, até as inativas.
    try {
        const response = await axios.get(`${config.url}/api/especialidades`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteEspec = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/especialidades/${id}`)
        console.log(response)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const postEspecialidade = async (espec) => {
    try {
        const response = await axios.post(`${config.url}/api/especialidades`, {
            nome: espec.nome,
            descricao: espec.descricao,
            cor: espec.cor,
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
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
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
