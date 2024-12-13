import Nav from '@components/public/Nav'
import Header from '@components/public/Header'
import IsOnline from '@components/public/IsOnline'
import Loading from '@components/public/Loading'
import InfosUser from '@components/Home/InfosUser'
import FuncsDisponiveis from '@components/Home/FuncsDisponiveis'
import OrdensPendentes from '@components/Home/OrdensPendentes'
import OrdensEmAtendimento from '@components/Home/OrdensEmAtendimento'
import { getCookie } from '@services/cookies'
import Atalhos from '@components/Home/Atalhos'

import '@styles/home.css'
import { useEffect, useState } from 'react'

import {notification, Alert, FloatButton} from 'antd';  
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons'


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
        // console.clear()
    }, [])
    return (
        <>
        {/* TODO Adicionar este componente em todas as paginas */}
        {/* <IsOnline></IsOnline> */}
        <div id='pageHome' className='paginas'>
        <Header titulo={"Página inicial"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainHome">
            {
                !usuario ? '' : (
                <>
                <Atalhos></Atalhos>
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
                        <OrdensPendentes ></OrdensPendentes>

                        {/* Ordens em Atendimento */}
                        <OrdensEmAtendimento></OrdensEmAtendimento>
                    </section>
                )}
                </>
            )
        }
        {/* <FloatButton.Group
            trigger="click"
            type="primary"
            style={{
                insetInlineEnd: 24,
            }}
            icon={<CustomerServiceOutlined />}
            >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
        <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{
                insetInlineEnd: 94,
            }}
            icon={<CustomerServiceOutlined />}
            >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group> */}
        </main>
        </div>
        </>
    )
}

export default Home