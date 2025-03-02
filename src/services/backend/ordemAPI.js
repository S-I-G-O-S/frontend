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
        const response = await axios.get(`${config.url}/api/ordens?page=${pagina}&size=${filtros.qtd}${filtragem}`, {
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
        const response = await axios.get(`${config.url}/api/ordens?size=5&funcionario=${idTecnico}&situacao=EM_EXECUCAO`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getOrdensAtivasPorTecnico = async (idTecnico) => {
    try {
        const response = await axios.get(`${config.url}/api/ordens?funcionario=${idTecnico}&situacao=EM_EXECUCAO`, {
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
        const response = await axios.get(`${config.url}/api/ordens/${id}/atendimentos`, {
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
        const response = await axios.post(`${config.url}/api/ordens`, {
            cliente: ordem.clienteID,
            descricao: ordem.descricao,
            servico: ordem.servicoID
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
//  PUT

export const putDesignarTecnico = async (ordem, idTecnico) => {
    console.log('debug put designar tecnico')
    console.log('ordem id: ', ordem.id)
    console.warn('serviço id: ', ordem.servico.id)
    console.warn('tecnico id: ', idTecnico)
    console.warn('descricao: ', ordem.descricao)
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
    console.log('debug cancelando ordem')
    console.warn("id: " + ordem.id)
    console.warn("descricao: " + ordem.descricao)
    console.warn("servico: " + ordem.servico.id)
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