/******CONFIGURAÇÕES DE DESENVOLVIMENTO********/
//  URL BACKEND
const configURL = true
//  true: usando o Koeyb como backend
//  false: usando localhost como backend

const config = {
    url: configURL ? "https://total-wilmette-sigos-6a0bb541.koyeb.app" : "http://localhost:8080"
}

export default config