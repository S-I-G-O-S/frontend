import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "@services/cookies";
import { logoutFunc } from "../services/backend/authAPI";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken_] = useState(getCookie("token"))
	const setToken = (novoToken) => {
		setToken_(novoToken)
		if (novoToken) {
			setCookie("token", novoToken, 12)
		} else {
			deleteCookie("token")
		}
	}
	const logout = () => {
		sessionStorage.clear()
		// localStorage.setItem("logout", Date.now());
		setToken(null)
		deleteCookie('usuario')
	}
	// Request interceptor para adicionar o token ao header
	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			(config) => {
				const jwtToken = getCookie("token")
				if (jwtToken) {
					config.headers["Authorization"] = `Bearer ${jwtToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)
		return () => axios.interceptors.request.eject(requestInterceptor)
	}, [])
	// Response interceptor para tratar erros (ex.: CORS -> Network Error)
	useEffect(() => {
		const responseInterceptor = axios.interceptors.response.use(
			(response) => response,
			(error) => {
				// console.warn("DEBUG AUTH ERROR:", error)
				// Se o erro for de rede (incluindo CORS sem cabeçalhos) ou o código for "ERR_NETWORK"
				if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
					console.warn(
						"Erro de rede detectado, tratando como token inválido. Efetuando logout..."
					)
					logout()
					// Força a atualização para redirecionar o usuário (caso sua lógica de rota o faça)
					location.reload()
				}
				return Promise.reject(error)
			}
		)
		return () => axios.interceptors.response.eject(responseInterceptor)
	}, [])
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		} else {
			delete axios.defaults.headers.common["Authorization"];
		}
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			setToken,
		}),
		[token]
	);
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
