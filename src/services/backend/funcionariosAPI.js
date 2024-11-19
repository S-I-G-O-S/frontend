import axios from 'axios'
import config from '../config'

export const getFuncionarios = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getFuncionariosDisponiveis = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios?size=30&disponiveis=true&ativo=true`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getPageFuncionarios = async (pagina, filtros) => {
    let filtragem=''  
    filtragem = `${!filtros.nome.is ? '' : `&nome=${filtros.nome.value}`}${!filtros.cargo.is ? '' : `&cargo=${filtros.cargo.value}`}${!filtros.especialidade.is ? '' : `&especialidade=${filtros.especialidade.value}`}${!filtros.disponivel.is ? '' : `&disponivel=${filtros.disponivel.value}`}${!filtros.ativo.is ? '' : `&ativo=${filtros.ativo.value}`}
    `
    try {
        const response = await axios.get(`${config.url}/api/funcionarios?page=${pagina}&size=${filtros.qtd}${filtragem}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.response?.data?.message || error.message}`)
    }
}
export const getTecnicos = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios?size=50&disponivel=true&cargo=TECNICO`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
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
        return response
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

export const postFuncionario = async (f, especialidades) => {
    try {
        const response = await axios.post(`${config.url}/api/funcionarios`, {
            nome: f.nome,
            primeiro: f.primeiro,
            ultimo: f.ultimo,
            cpf: f.cpf,
            email: f.email,
            celular: f.celular,
            cargo: f.cargo,
            endereco: f.endereco,
            // {
            //     cep: f.endereco.cep,
            //     logradouro: f.endereco.logradouro,
            //     numero: f.endereco.numero,
            //     bairro: f.endereco.bairro,
            //     cidade: f.endereco.cidade,
            //     uf: f.endereco.uf,
            //     complemento: f.endereco.complemento
            // },
            especialidades
        })
        
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: `Erro: ${error.response?.data?.message || error.message}`,
        }
    }
}

export const putFuncionario = async (f, especialidades) => {
    try {
        const response = await axios.put(`${config.url}/api/funcionarios`, {
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
