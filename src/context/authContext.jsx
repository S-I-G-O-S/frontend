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
		const interceptor = axios.interceptors.response.use(
			(config) => {
                const jwtToken = getCookie("token")
                if (jwtToken) {
                    config.headers["Authorization"] = `Bearer ${jwtToken}`
                }
                return config
            },
			// (response) => response,
			(error) => {
				/*
				if (
					error.message === "Network Error" ||
					error.code === "ERR_NETWORK" ||
					(error.response && error.response.status === 0)
				) {
					console.warn("Erro de rede detectado, tratando como token inválido. Efetuando logout...")
					logout()
					// location.reload()
				}
				*/
				return Promise.reject(error)
			}
		)
		return () => axios.interceptors.response.eject(interceptor)
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
