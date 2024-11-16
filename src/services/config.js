/**********************************************/
/******CONFIGURAÇÕES DE DESENVOLVIMENTO********/
//  URL BACKEND
const configURL = true
//  true: usando o Koeyb como backend
//  false: usando localhost como backend
/**********************************************/


const config = {
    renderKey: "rnd_wHLZTrORPOl58hLnZ2QOEXo4opcC",
    url: configURL ? "https://total-wilmette-sigos-6a0bb541.koyeb.app" : "http://localhost:8080"
}

export default config