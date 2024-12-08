/**********************************************/
/******CONFIGURAÇÕES DE DESENVOLVIMENTO********/
//  URL BACKEND
const configURL = true
//  true: usando o Koeyb como backend
//  false: usando localhost como backend
/**********************************************/
//  TELA DE NOVO USUARIO
const configNovoUsuario = false
//  true: o novo usuario será enviado para tela de definir senha ao fazer login
//  false: o novo usuario será enviado direto para tela inicial ao fazer login

const config = {
    renderKey: "rnd_wHLZTrORPOl58hLnZ2QOEXo4opcC",
    url: configURL ? "https://total-wilmette-sigos-6a0bb541.koyeb.app" : "http://localhost:8080",
    configNovoUsuario
}

export default config