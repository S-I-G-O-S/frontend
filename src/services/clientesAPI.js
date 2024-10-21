import axios from 'axios'
import config from './devConfig'

export const getClientes = async () => {
    try {
        const response = await axios.get(`${config.url}/api/clientes`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
        /*{
            "id": 0,
            "nome": "string",
            "cnpj": "string",
            "ativo": true
        }*/
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getClientePorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/clientes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const deleteCliente = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/clientes/${id}`)
        console.log(response)
        return { success: true, response: response}
    } catch (error) {
        return {
            success: false,
            error: `Erro ao deletar: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const postCliente = async (contato) => {
    try {
        const response = await axios.post(`${config.url}/api/clientes`, contato)
        
        return { success: true, data: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const putCliente = async (cliente) => {
    try {
        const response = await axios.put(`${config.url}/api/clientes`, cliente)
        return { success: true, response: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
