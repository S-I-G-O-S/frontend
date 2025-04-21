import config from "@services/config"


export const getArquivos = async (idAtendimento) => {
    try {
        const response = await axios.get(`${config.url}/api/fotos/atendimento/${idAtendimento}`)
        
        return { success: true, response: response }
    } catch (error) {
        return { success: false, error }
    }
}
export const getArquivoUnico = async (idArquivo) => {
    try {
        const response = await axios.get(`${config.url}/api/fotos/${idArquivo}`)

        return { success: true, response: response }
    } catch (error) {
        return { success: false, error }
    }
}
export const postArquivo = async (arquivo, atendimento) => {
    try {
        const response = await axios.post(`${config.url}/api/fotos`, {
            file: arquivo,
            atendimentoId: atendimento
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
