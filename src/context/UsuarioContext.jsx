import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto
const PreferenciasContext = createContext();

// Provedor do contexto
export const PreferenciasProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario');
        return storedUsuario
            ? JSON.parse(storedUsuario)
            : {};
    });

    useEffect(() => {
        sessionStorage.setItem('usuario', JSON.stringify(sessPreferencias));
    }, [usuario]);

    return (
        <PreferenciasContext.Provider value={{ sessPreferencias, setSessPreferencias }}>
            {children}
        </PreferenciasContext.Provider>
    );
};

// Hook para usar o contexto
export const usePreferencias = () => {
    return useContext(PreferenciasContext);
};
