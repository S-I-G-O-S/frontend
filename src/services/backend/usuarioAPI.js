import axios from 'axios'
import config from '../config'

export const getUsuario = async () => {
    try {
        const response = await axios.get(`${config.url}/api/usuarios`)
        console.warn(response)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const putRegSenha = async (login, senha, novaSenha) => {
    try {
        const response = await axios.put(`${config.url}/api/usuarios/login`, {
            login,
            senha,
            novaSenha
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const putEditUsuario = async (usuario) => {
    try {
        const response = await axios.put(`${config.url}/api/usuarios`, {
            nome: usuario.nome,
            primeiro: usuario.primeiro,
            ultimo: usuario.ultimo,
            email: usuario.email,
            celular: usuario.celular,
            endereco: usuario.endereco
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error}
    }
}