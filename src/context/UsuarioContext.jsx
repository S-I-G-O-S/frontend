import React, { createContext, useContext, useState, useEffect } from 'react';

// TODO Ainda não utilizado
// Cria o contexto
const UsuarioContext = createContext();
// Provedor do contexto
export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario');
        return storedUsuario
            ? JSON.parse(storedUsuario)
            : {};
    });

    useEffect(() => {
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    return (
        <PreferenciasContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </PreferenciasContext.Provider>
    );
};

// Hook para usar o contexto
export const usePreferencias = () => {
    return useContext(PreferenciasContext);
};
