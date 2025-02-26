import Nav from '@components/public/Nav.jsx'
import Header from '@components/public/Header.jsx'
import IsOnline from '@components/public/IsOnline.jsx'
import Loading from '@components/public/Loading.jsx'
import InfosUser from '@components/Home/InfosUser.jsx'
import FuncsDisponiveis from '@components/Home/FuncsDisponiveis.jsx'
import OrdensPendentes from '@components/Home/OrdensPendentes.jsx'
import OrdensEmAtendimento from '@components/Home/OrdensEmAtendimento.jsx'
import OrdensEmAtendimentoTecnico from '@components/Home/OrdensEmAtendimentoTecnico.jsx'
import { getCookie } from '@services/cookies.js'
import Atalhos from '@components/Home/Atalhos.jsx'

import '@styles/home.css'
import { useEffect, useState } from 'react'

import {notification, Alert, FloatButton} from 'antd';  
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { getUsuarioContext } from '../context/UsuarioContext'


function Home() {
    const [showUsuario, setShowUsuario] = useState(null)
    const [showInfosUser, setShowInfosUser] = useState(true)
    const {usuario} = getUsuarioContext()
    // const [usuario, setUsuario] = useState(() => {
    //     const cookieUsuario = getCookie('usuario')
    //     return cookieUsuario ? cookieUsuario : ''
    // })
    useEffect(() => {
        // console.clear()
    }, [])
    return (
        <>
        <div id='pageHome' className='paginas'>
        {/* <Header titulo={"Página inicial"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainHome">
        {
            !usuario ? '' : (
            <>
            <Atalhos cargo={usuario?.cargo}></Atalhos>
            {/* informações do usuário */}
            {/*
            showInfosUser && usuario.cargo == 'DEV' ? 
                <InfosUser></InfosUser> : ''
            */}
            {/* TODO Não mostrar ordens relacionada a outros tecnicos */}
            {/* TODO mostrar ordem que pedem serviços que o tecnico possa executar pela sua especialidade */}
            {/* TODO mostrar ordens do tecnico relacionadas ao mesmo */}
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
            <section id='secOrdens'>
                {/* Ordens Abertas */}
                <OrdensPendentes ></OrdensPendentes>
                {/* Ordens em Atendimento */}
                {(usuario.cargo==='BASE' || usuario.cargo==='ADM' || usuario.cargo==='DEV') && 
                    <OrdensEmAtendimento></OrdensEmAtendimento>
                }
                {
                    (usuario.cargo=="TECNICO") && 
                    <OrdensEmAtendimentoTecnico></OrdensEmAtendimentoTecnico>
                }
            </section>
            </>)
        }
        </main>
        </div>
        </>
    )
}

export default Home