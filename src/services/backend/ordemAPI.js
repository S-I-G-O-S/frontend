import axios from 'axios'
import config from '../config'

export const getOrdens = async () => {
    try {
        const response = await axios.get(`${config.url}/api/ordens`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
        /*
        {
            "id": 1,
            "cliente": "Empresa 3",
            "endereco": {
                "id": 33,
                "cep": "43033000",
                "logradouro": "Rua Ceará",
                "numero": "330",
                "bairro": "Centro",
                "cidade": "Londrina",
                "uf": "PR",
                "complemento": "Bloco A"
            },
            "descricao": "Teste de criar ordem",
            "funcionario": null,
            "situacao": "PENDENTE",
            "servico": "Instalação de Alarmes",
            "dtAbertura": "16-11-2024 06:02:17"
        }
        */
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getOrdensPorSituacao = async (situacao) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?situacao=${situacao}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const postNovaOrdem = async (ordem) => {
    try {
        const response = await axios.post(`${config.url}/api/ordens`, {
            cliente: ordem.clienteID,
            descricao: ordem.descricao,
            servico: ordem.servicoID
        })
        return { success: true, response: response }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}