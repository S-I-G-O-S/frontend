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
        // console.log('Mudando tema para: '+ sessPreferencias.tema)
        sessionStorage.setItem('preferencias', JSON.stringify(sessPreferencias));
    }, [sessPreferencias]);
    useEffect(() => {
        let linkElement = document.getElementById('themeCSS')

        if (!linkElement) {
            linkElement = document.createElement('link')
            linkElement.rel = 'stylesheet'
            linkElement.id = 'themeCSS'
            document.head.appendChild(linkElement)
        }

        linkElement.href = `./src/themes/${sessPreferencias.tema}.css`
    }, [sessPreferencias.tema])
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
