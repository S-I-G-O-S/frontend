import axios from 'axios'
import config from '../config'

export const loginFunc = async (usuario) => {
    try {
        const response = await axios.post(`${config.url}/login`, {
            email: usuario.email,
            senha: usuario.senha
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const logoutFunc = async () => {
    try {
        const response = await axios.delete(`${config.url}/login`)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}