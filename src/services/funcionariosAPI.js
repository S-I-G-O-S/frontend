import axios from 'axios'
import config from '../services/devConfig'

export const getFuncionarios = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getFuncionarioPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const deleteFuncionario = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/funcionarios/${id}`)
        console.log(response)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao deletar: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const postFuncionario = async (funcionario) => {
    /*
    {
        "nome": "string",
        "primeiro": "string",
        "ultimo": "string",
        "cpf": "string",
        "email": "string",
        "celular": "string",
        "senha": "string",
        "cargo": "string",
        "endereco": {
            "cep": "string",
            "logradouro": "string",
            "numero": "string",
            "bairro": "string",
            "cidade": "string",
            "uf": "string",
            "complemento": "string"
        },
        "especialidades": [
            0
        ]
    }
    */
    try {
        const response = await axios.post(`${config.url}/api/funcionarios`, {
            nome: funcionario.nome,
            descricao: funcionario.descricao,
            cor: funcionario.cor,
        })
        
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const putFuncionario = async (espec) => {
    try {
        const response = await axios.put(`${config.url}/api/funcionarios/${espec.id}`, espec)
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro ao salvar: ${error.response?.data?.message || error.message}`,
        }
    }
}
