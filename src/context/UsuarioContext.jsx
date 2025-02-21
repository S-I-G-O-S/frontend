import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from "@services/cookies";
import { getUsuario } from '../services/backend/usuarioAPI';

// TODO Ainda não utilizado
const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const attUsuario =  async () => {
        const result = await getUsuario()
        if (!result.success) {
            console.error("erro ao atualizar contexto usuario!")
            console.error(result.error)
            return
        }
        setUsuario(result.response.data)
    }
    useEffect(() => {
        console.info('contexto usuario atualizado')
        setCookie('usuario', usuario, 12)
    }, [usuario]);

    return (
        <UsuarioContext.Provider value={{ usuario, attUsuario, setUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const getUsuarioContext = () => {
    return useContext(UsuarioContext);
};
