import axios from 'axios'
import config from './devConfig'

export const getClientes = async () => {
    try {
        const response = await axios.get(`${config.url}/api/clientes`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
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
        return response.data
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const deleteCliente = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/clientes/${id}`)
        console.log(response)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao deletar: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const postCliente = async (f, especialidades) => {
    try {
        const response = await axios.post(`${config.url}/api/clientes`, {
            nome: f.nome,
            primeiro: f.primeiro,
            ultimo: f.ultimo,
            cpf: f.cpf,
            email: f.email,
            celular: f.celular,
            cargo: f.cargo,
            endereco: {
                cep: f.endereco.cep,
                logradouro: f.endereco.logradouro,
                numero: f.endereco.numero,
                bairro: f.endereco.bairro,
                cidade: f.endereco.cidade,
                uf: f.endereco.uf,
                complemento: f.endereco.complemento
            },
            especialidades: especialidades
        })
        
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const putCliente = async (f, especialidades) => {
    try {
        const response = await axios.put(`${config.url}/api/clientes`, {
            id: f.id,
            nome: f.nome,
            primeiro: f.primeiro,
            ultimo: f.ultimo,
            cpf: f.cpf,
            email: f.email,
            celular: f.celular,
            cargo: f.cargo,
            endereco: {
                id: f.endereco.id,
                cep: f.endereco.cep,
                logradouro: f.endereco.logradouro,
                numero: f.endereco.numero,
                bairro: f.endereco.bairro,
                cidade: f.endereco.cidade,
                uf: f.endereco.uf,
                complemento: f.endereco.complemento
            },
            especialidades: especialidades
        })
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
