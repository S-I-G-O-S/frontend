import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferenciasContext = createContext();

export const PreferenciasProvider = ({ children }) => {
    const [preferencias, setPreferencias] = useState(() => {
        const storedPreferencias = sessionStorage.getItem('preferencias')
        return storedPreferencias
            ? JSON.parse(storedPreferencias)
            : {
                tema: 'salmaoLight',
                viewNav: true,
            }
    })
    const changeNav = () => {
        setPreferencias(prevState => ({
            ...prevState,
            viewNav: !preferencias.viewNav
        }))
    }
    const changeTema = (tema) => {
        setPreferencias(prevState => ({
            ...prevState,
            tema: tema
        }))
    }
    useEffect(() => {
        // console.log('Mudando tema para: '+ sessPreferencias.tema)
        sessionStorage.setItem('preferencias', JSON.stringify(preferencias))
    }, [preferencias])
    /*
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
    */
    return (
        <PreferenciasContext.Provider value={{ preferencias, changeNav, changeTema, tema: preferencias.tema, viewNav: preferencias.viewNav }}>
            {children}
        </PreferenciasContext.Provider>
    )
}

export const usePreferencias = () => {
    return useContext(PreferenciasContext);
};
