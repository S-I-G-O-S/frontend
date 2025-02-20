import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from "@services/cookies";

// TODO Ainda não utilizado
const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const attUsuario = (novoUsuario) => {
        if (usuario!=novoUsuario) {
            console.info("nova versão do usuario recebida.")
        }
        setUsuario(novoUsuario)
        setCookie('usuario', novoUsuario, 12)
    }
    useEffect(() => {
        console.info('contexto usuario atualizado')
    }, [usuario]);

    return (
        <UsuarioContext.Provider value={{ usuario, attUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const getUsuarioContext = () => {
    return useContext(UsuarioContext);
};
