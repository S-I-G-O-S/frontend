import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "../services/cookies"; // Importa as funções de cookies

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken_] = useState(getCookie("token"))
	const setToken = (novoToken) => {
		setToken_(novoToken)
		if (novoToken) {
			setCookie("token", novoToken, 1)	// TODO ver o tempo token
		} else {
			deleteCookie("token")
		}
	};
	useEffect(() => {
        const requestInterceptor = axios.interceptors.request.
		use(
            (config) => {
                const jwtToken = getCookie("token")
                if (jwtToken) {
                    config.headers["Authorization"] = `Bearer ${jwtToken}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // Limpa o interceptor ao desmontar
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
