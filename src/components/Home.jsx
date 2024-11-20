import Nav from './public/Nav'
import Header from './public/Header'
import IsOnline from './public/IsOnline'

import '../styles/home.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'

import {notification, Alert} from 'antd';  

import InfosUser from './Home/InfosUser'
import FuncsDisponiveis from './Home/FuncsDisponiveis'
import OrdensPendentes from './Home/OrdensPendentes'
import OrdensEmAtendimento from './Home/OrdensEmAtendimento'
import { getCookie } from '../services/cookies'

function Home() {
    const showNotification = (placement) => {
        notification.info({
        message: `Sem internet`,
        description: 'Reconecte-se a internet',
        placement,
        });
    };
    // showNotification('bottomLeft')
    const [isLoading, setIsLoading] = useState({
        ordensEmAtendimento: true
    })
    const [showUsuario, setShowUsuario] = useState(null)
    const [showInfosUser, setShowInfosUser] = useState(true)
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })

    useEffect(() => {
        console.clear()
    }, [])
    return (
        <>
        {/* TODO Adicionar este componente em todas as paginas */}
        <IsOnline></IsOnline>
        <div id='pageHome' className='paginas'>
        <Header titulo={"Página inicial"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainHome">
            {
                !usuario ? '' : (
                <>
                
                {/* informações do usuário */}
                {showInfosUser && usuario.cargo == 'DEV' ? 
                    <InfosUser></InfosUser> : ''
                }
                {(usuario.cargo === 'tecnico') && (
                    <section id='secTecnico'>
                    </section>
                )}
                {/* funcionários disponíveis se o usuário for 'base' ou 'adm' */}
                {(usuario.cargo === 'base' || usuario.cargo === 'ADM' || usuario.cargo == 'DEV') && (
                    // <FuncsDisponiveis></FuncsDisponiveis>
                    ''
                )}

                {/* Ordens abertas e ordens em atendimento se o usuário for 'base' ou 'adm' */}
                {(usuario.cargo === 'base' || usuario.cargo === 'ADM' || usuario.cargo == 'DEV') && (

                    <section id='secOrdens'>
                        {/* Ordens Abertas */}
                        <OrdensPendentes></OrdensPendentes>

                        {/* Ordens em Atendimento */}
                        <OrdensEmAtendimento></OrdensEmAtendimento>
                    </section>
                )}
                </>
            )
        }

        </main>
        </div>
        </>
    )
}

export default Home