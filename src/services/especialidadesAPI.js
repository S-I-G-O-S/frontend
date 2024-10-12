import config from '../services/devConfig'

export const getEspecialidades = async () => {
    try {
        const response = await fetch(`${config.url}/api/especialidades`, {
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
export const deleteEspec = async (id) => {
    try {
        const response = await fetch(`${config.url}/api/especialidade/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: `Erro ao deletar: ${errorData.message}` };
        }
    } catch (error) {
        return { success: false, error: `Erro de conexão: ${error.message}` };
    }
};
export const postEspecialidade = async (espec) => {
    try {
        const response = await fetch(`${config.url}/api/especialidade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: espec.nome,
                descricao: espec.descricao,
                cor: espec.cor,
            }),
        });

        if (response.ok) {
            const newEspec = await response.json();
            return { success: true, data: newEspec };
        } else {
            const errorData = await response.json();
            return { success: false, error: `Erro: ${errorData.message}` };
        }
    } catch (error) {
        return { success: false, error: `Erro de conexão: ${error.message}` };
    }
};
export const putEspecialidade = async (espec) => {
    try {
        const response = await fetch(`${config.url}/api/especialidade/${espec.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(espec),
        });

        if (response.ok) {
            const updatedEspec = await response.json();
            return { success: true, data: updatedEspec };
        } else {
            const errorData = await response.json();
            return { success: false, error: `Erro ao salvar: ${errorData.message}` };
        }
    } catch (error) {
        return { success: false, error: `Erro de conexão: ${error.message}` };
    }
};