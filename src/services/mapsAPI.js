import axios from 'axios'

const googleMapsToken = import.meta.env.VITE_GOOGLE_MAPS_TOKEN

export const getGoogleMapsToken = () => {
    // console.log('token google maps: '+ googleMapsToken)
    return googleMapsToken
}
/*export const getCoordenadas = async (endereco) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${geocodeToken}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}*/