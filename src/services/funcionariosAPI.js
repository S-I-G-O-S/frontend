import config from '../services/devConfig'

export const getFuncionarios = async () => {
    try {
        const response = await fetch(`${config.url}/api/funcionarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            return await response.json()
        } else {
            const errorData = await response.json()
            throw new Error(`Erro: ${errorData.message}`)
        }
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.message}`)
    }
}
export const getFuncionariosPorID = async (id) => {
    try {
        const response = await fetch(`/api/funcionarios${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            return await response.json()
        } else {
            const errorData = await response.json()
            throw new Error(`Erro: ${errorData.message}`)
        }
    } catch (error) {
        throw new Error(`Erro de conexão: ${error.message}`)
    }
}