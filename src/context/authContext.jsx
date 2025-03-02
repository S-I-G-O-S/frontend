import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "@services/cookies";
import { logoutFunc } from "../services/backend/authAPI";
import { useNavigate } from "react-router-dom";

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
	const logout = async () => {
		const result = await logoutFunc()
		if (!result.success) {
			console.log(result.error)
			return
		}
		sessionStorage.clear()
		localStorage.setItem("logout", Date.now());
		setToken(null)
		deleteCookie('usuario')
		// navigate("/", { replace: true })
	}
	useEffect(() => {
		/*
		const requestInterceptor = axios.interceptors.request.
			use(
				(config) => {
					const jwtToken = getCookie("token")
					if (jwtToken) {
						config.headers["Authorization"] = `Bearer ${jwtToken}`
					}
					return config
				},
				(response) => response,
				(error) => {
					if (error.response && error.response.status === 403) {
						console.warn('apagando token');
						logout()
						location.reload();
					}
					return Promise.reject(error)
				}
			)

		return () => axios.interceptors.request.eject(requestInterceptor);*/
		const requestInterceptor = axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				//	TODO atualmente ele esta deslogando para o erro 403 do tipo "Network Error", o certo (eu acho) seria ajustar o backend para informar que o token tá invalido. 
				if (error.message === "Network Error") {
					console.warn("Erro 403 detectado via interceptor. Efetuando logout...");
					logout();  // Chama seu método assíncrono de logout
					location.reload();
				}
				console.error("Erro na resposta", error);
				return Promise.reject(error);
			}
		)
		return () => axios.interceptors.request.eject(requestInterceptor);
	}, []);
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
