import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto
const PreferenciasContext = createContext();

// Provedor do contexto
export const PreferenciasProvider = ({ children }) => {
    const [sessPreferencias, setSessPreferencias] = useState(() => {
        const storedPreferencias = sessionStorage.getItem('preferencias');
        return storedPreferencias
            ? JSON.parse(storedPreferencias)
            : {
                tema: 'salmaoLight',
                abertoNav: true,
            };
    });

    useEffect(() => {
        sessionStorage.setItem('preferencias', JSON.stringify(sessPreferencias));
    }, [sessPreferencias]);

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
