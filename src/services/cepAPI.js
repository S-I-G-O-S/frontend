import axios from "axios"

export const cepAPI = async (cep) => {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}


