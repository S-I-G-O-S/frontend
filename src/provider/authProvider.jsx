import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken_] = useState(sessionStorage.getItem("token"))

	const setToken = (novoToken) => {
		setToken_(novoToken)
	}

	useEffect(() => {
		if (token) {
			// axios.defaults.headers.common["Authorization"] = "Bearer " + token;
			sessionStorage.setItem("token", token);
		} else {
			// delete axios.defaults.headers.common["Authorization"];
			sessionStorage.removeItem("token");
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
