import axios from 'axios'
import config from '../config'

//  GET
export const getOrdens = async () => {
    try {
        const response = await axios.get(`${config.url}/api/ordens`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response: response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getPageOrdens = async (pagina, filtros) => {
    if (!filtros) {
        return
    }
    let filtragem = ''
    filtragem = `${!filtros.situacao.is ? '' : `&situacao=${filtros.situacao.value}`}${!filtros.funcionario.is ? '' : `&funcionario=${filtros.funcionario.value}`}${!filtros.servico.is ? '' : `&servico=${filtros.servico.value}`}
    `
    try {
        const response = await axios.get(`${config.url}/api/ordens?page=${pagina}&sort=dtAbertura,desc&size=${filtros.qtd}${filtragem}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensPorSituacao = async (situacao) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?size=15&situacao=${situacao}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensForHome = async (situacao) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?size=5&situacao=${situacao}`, {
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensPorCliente = async (pagina, idCliente) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?page=${pagina}&cliente=${idCliente}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensPorTecnicoForHome = async (idTecnico) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?size=99&funcionario=${idTecnico}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensTecnico = async (idTecnico) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?funcionario=${idTecnico}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getAtendimentos = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens/${id}/atendimentos?sort=desc`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false,  error }
    }
}

//  POST
export const postAtendimento = async (idOrdem) => {
    console.log(idOrdem)
    try {
        const response = await axios.post(`${config.url}/api/ordens/atendimentos`, {
            ordem: idOrdem
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const postNovaOrdem = async (ordem) => {
    try {
        const payload = {
            cliente: ordem.clienteID,
            descricao: ordem.descricao,
            servico: ordem.servicoID,
            // ...(ordem.tecnicoID !== null && { funcionario: ordem.tecnicoID })
        }

        const response = await axios.post(`${config.url}/api/ordens`, payload)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
//  PUT
export const putDesignarTecnico = async (ordem, idTecnico) => {
    try {
        const response = await axios.put(`${config.url}/api/ordens`, {
            id: ordem.id,
            descricao: ordem.descricao || " ",
            funcionario: idTecnico,
            servico: ordem.servico.id || 0
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const putCancelOrdem = async (ordem) => {
    // TODO Retornando erro 400: "The given id must not be null"
    try {
        const response = await axios.put(`${config.url}/api/ordens`, {
            id: ordem.id,
            descricao: ordem.descricao || "",
            situacao: "CANCELADA",
            servico: ordem.servico.id
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const putConcluirAtendimento = async (atendimento, situacao) => {
    console.log('debug concluindo atendimento')
    console.log(atendimento)
    console.log(situacao)
    try {
        const response = await axios.put(`${config.url}/api/ordens/atendimentos`, {
            atendimento: atendimento.idAtendimento.id,
            dsAtendimento: atendimento.descricao || "",
            situacao: situacao,
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}