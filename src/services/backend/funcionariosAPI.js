import axios from 'axios'
import config from '../config'

export const getFuncionarios = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getFuncionariosDisponiveis = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios?size=30&disponiveis=true&ativo=true`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
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
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getTecnicos = async () => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios?size=50&disponivel=true&cargo=TECNICO`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getTecnicosPorServico = async (servico) => {
    try {
        // TODO Tirei pois todos funcs estão indisponiveis &disponivel=true
        const response = await axios.get(`${config.url}/api/funcionarios?size=50&cargo=TECNICO&servico=${servico}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getFuncionarioPorID = async (id) => {
    try {
        const response = await axios.get(`${config.url}/api/funcionarios/${id}`, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error}
    }
}
export const deleteFuncionario = async (id) => {
    try {
        const response = await axios.delete(`${config.url}/api/funcionarios/${id}`)
        console.warn(response)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const postFuncionario = async (funcionario, especialidades) => {
    console.info('debug put funcionario')
    console.warn(funcionario)
    console.warn(especialidades)
    console.warn(funcionario.endereco)
    let formatedCEP = funcionario.endereco.cep.replace(/\D/g, '')
    try {
        const response = await axios.post(`${config.url}/api/funcionarios`, {
            nome: funcionario.nome,
            primeiro: funcionario.primeiro,
            ultimo: funcionario.ultimo,
            cpf: funcionario.cpf,
            email: funcionario.email,
            celular: funcionario.celular,
            cargo: funcionario.cargo,
            endereco: {
                cep: formatedCEP,
                logradouro: funcionario.endereco.logradouro,
                numero: funcionario.endereco.numero,
                bairro: funcionario.endereco.bairro,
                cidade: funcionario.endereco.cidade,
                uf: funcionario.endereco.uf,
                complemento: funcionario.endereco.complemento,
            },
            especialidades
        })
        
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const putFuncionario = async (funcionario, especialidades) => {
    try {
        const response = await axios.put(`${config.url}/api/funcionarios`, {
            id: funcionario.id,
            nome: funcionario.nome,
            primeiro: funcionario.primeiro,
            ultimo: funcionario.ultimo,
            cpf: funcionario.cpf,
            email: funcionario.email,
            celular: funcionario.celular,
            cargo: funcionario.cargo,
            endereco: {
                id: funcionario.endereco.id,
                cep: funcionario.endereco.cep,
                logradouro: funcionario.endereco.logradouro,
                numero: funcionario.endereco.numero,
                bairro: funcionario.endereco.bairro,
                cidade: funcionario.endereco.cidade,
                uf: funcionario.endereco.uf,
                complemento: funcionario.endereco.complemento
            },
            especialidades: especialidades
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}