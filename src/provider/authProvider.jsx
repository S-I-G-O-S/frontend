import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "../services/cookies"; // Importa as funções de cookies

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	// Inicializa o estado do token com o valor do cookie, em vez do sessionStorage
	const [token, setToken_] = useState(getCookie("token"));

	const setToken = (novoToken) => {
		setToken_(novoToken);

		// Atualiza o cookie com o novo token ou deleta se for null
		if (novoToken) {
			setCookie("token", novoToken, 1); // Define o cookie para expirar em 1 dia, por exemplo
		} else {
			deleteCookie("token");
		}
	};

	useEffect(() => {
		if (token) {
			// Define o header Authorization no axios com o token JWT
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		} else {
			// Remove o header Authorization caso o token seja removido
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
