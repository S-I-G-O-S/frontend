import axios from 'axios'
import config from '../config'

export const getClientes = async () => {
    try {
        const response = await axios.get(`${config.url}/api/clientes?ativo=true`, {
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
export const getPageClientes = async (pagina, filtros) => {
    try {
        const response = await axios.get(`${config.url}/api/clientes?page=${pagina}&size=15`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getClientePorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/clientes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteCliente = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/clientes/${id}`)
        console.log(response)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const postCliente = async (cliente) => {
    try {
        const response = await axios.post(`${config.url}/api/clientes`, cliente)
        
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const putCliente = async (cliente) => {
    try {
        const response = await axios.put(`${config.url}/api/clientes`, {
            id: cliente.id,
            nome: cliente.nome,
            cnpj: cliente.cnpj,
            endereco: {
                cep: cliente.endereco.cep,
                logradouro: cliente.endereco.logradouro,
                numero: cliente.endereco.numero,
                bairro: cliente.endereco.bairro,
                cidade: cliente.endereco.cidade,
                uf: cliente.endereco.uf,
                complemento: cliente.endereco.complemento
            }
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const getContatosPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/clientes/${id}/contatos`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const postContato = async (contato) => {
    try {
        const response = await axios.post(`${config.url}/api/clientes/contatos`, contato)
        
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const putContato = async (contato) => {
    try {
        const response = await axios.put(`${config.url}/api/clientes/contatos`, contato)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteContato = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/clientes/contatos/${id}`)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
