const googleMapsToken = import.meta.env.VITE_GOOGLE_MAPS_TOKEN
export const getGoogleMapsToken = () => {
    console.log('token google maps: '+ googleMapsToken)
    return googleMapsToken
}