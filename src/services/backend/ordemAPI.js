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
export const getPageOrdens = async (pagina, filtros) => {
    if (!filtros) {
        return
    }
    let filtragem=''  
    filtragem = `${!filtros.situacao.is ? '' : `&situacao=${filtros.situacao.value}`}${!filtros.funcionario.is ? '' : `&funcionario=${filtros.funcionario.value}`}${!filtros.servico.is ? '' : `&servico=${filtros.servico.value}`}
    `
    try {
        const response = await axios.get(`${config.url}/api/ordens?page=${pagina}&size=${filtros.qtd}${filtragem}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getOrdensPorSituacao = async (situacao) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?size=15&situacao=${situacao}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getOrdensForHome = async (situacao) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?size=5&situacao=${situacao}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getOrdensPorCliente = async (pagina, idCliente) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?page=${pagina}&cliente=${idCliente}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getAtendimentos = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens/${id}/atendimentos`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getOrdensPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error }
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
export const putCancelOrdem = async (ordem) => {
    console.log('debug cancelando ordem')
    console.warn(ordem)
    try {
        const response = await axios.put(`${config.url}/api/ordens`, {
            id: ordem.id,
            descricao: ordem.descricao,
            funcionario: ordem.funcionario,
            situacao: "CANCELADA",
            servico: ordem.servico  
        })
        return { success: true, response: response }
    } catch (err) {
        return { success: false,
            error: err }
    }
}
