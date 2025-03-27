import Nav from '@components/public/Nav.jsx'
import OrdensPendentes from '@components/Home/OrdensPendentes.jsx'
import OrdensEmAtendimento from '@components/Home/OrdensEmAtendimento.jsx'
import OrdensTecnico from '../components/Home/OrdensTecnico'
import Atalhos from '@components/Home/Atalhos.jsx'

import '@styles/home.css'
import { useEffect, useState } from 'react'
import { getUsuarioContext } from '../context/UsuarioContext'

function Home() {
    const {usuario} = getUsuarioContext()
    // const [usuario, setUsuario] = useState(() => {
    //     const cookieUsuario = getCookie('usuario')
    //     return cookieUsuario ? cookieUsuario : ''
    // })
    useEffect(() => {
        console.clear()
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
                <section id='secOrdens'>
                    {(usuario.cargo==='BASE' || usuario.cargo==='ADM' || usuario.cargo==='DEV') && (
                        // <FuncsDisponiveis></FuncsDisponiveis>
                        <>
                        <OrdensPendentes/>
                        <OrdensEmAtendimento/>
                        </>
                    )}
                    {(usuario.cargo=="TECNICO") && (
                        <OrdensTecnico idTecnico={usuario.id}/>
                    )}
                </section>
                </>
            )
        }
        </main>
        </div>
        </>
    )
}

export default Home