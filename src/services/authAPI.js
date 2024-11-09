import axios from 'axios'
import config from '../services/devConfig'

export const loginFunc = async (usuario) => {
    try {
        const response = await axios.post(`${config.url}/login`, {
            email: usuario.email,
            senha: usuario.senha
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const logoutFunc = async () => {
    try {
        const response = await axios.delete(`${config.url}/login`)
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}