import axios from 'axios'
import config from '../config'

export const putRegSenha = async (email, senha, novaSenha) => {
    try {
        const response = await axios.put(`${config.url}/login/`, {
            email,
            senha,
            novaSenha
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const editUsuario = async (usuario) => {
    try {
        const response = await axios.put(`${config.url}/login/`, {
            nome: usuario.nome,
            primeiro: usuario.primeiro,
            ultimo: usuario.ultimo,
            email: usuario.email,
            celular: usuario.celular,
            endereco: usuario.endereco
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}