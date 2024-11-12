export function setCookie(nome, obj, hours) {
    const jsonString = JSON.stringify(obj);
    const expires = hours ? 
        `; expires=${new Date(Date.now() + hours * 3600e3).toUTCString()}` : '';
    document.cookie = `${nome}=${encodeURIComponent(jsonString)}${expires}; path=/`;
}

export function getCookie(nome) {
    const cookieArr = document.cookie.split('; ')
    const cookie = cookieArr.find(row => row.startsWith(`${nome}=`))
    if (!cookie) return null

    const jsonString = decodeURIComponent(cookie.split('=')[1])
    return JSON.parse(jsonString)
}
export function deleteCookie(nome) {
  document.cookie = `${nome}=; expires=${new Date(0).toUTCString()}; path=/`
}