import { useEffect, useState } from "react";
import {notification, Alert} from 'antd';

const IsOnline = () => {
    const [isOnline, setIsOnline] = useState(true)
    function verificarConexaoInternet() {
        const verif = navigator.onLine 
        console.warn(verif)
        // if (verif) {
        //     showNotification('bottomLeft')
        // }
        setIsOnline(verif)
    }
    window.addEventListener("offline", () => {
        setIsOnline(false)
    })
    window.addEventListener("online", () => {
        setIsOnline(true)
    });
    useEffect(() => {
        console.clear()
        verificarConexaoInternet()
        
    }, [])
    return (
        <>
        {
            !isOnline && (
            <Alert
                message="Desconectado da internet"
                banner
                closable
                showIcon
                type='error'
                />
            ) 
        }
        </>
    )
};

export default IsOnline;