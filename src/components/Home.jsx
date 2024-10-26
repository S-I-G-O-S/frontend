import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/home.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'

import InfosUser from './Home/InfosUser'
import FuncsDisponiveis from './Home/FuncsDisponiveis'
import OrdensAbertas from './Home/OrdensAbertas'
import OrdensEmAtendimento from './Home/ordensEmAtendimento'


function Home() {
    const [showUsuario, setShowUsuario] = useState(null)
    const [showInfosUser, setShowInfosUser] = useState(true)
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario')
        return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
    })

    useEffect(() => {
        console.clear()
    }, [])
    return (
        <div id='pageHome'>
        <Header titulo={"Página inicial"}></Header>
        <Nav cargo={usuario?.cargo || 'tecnico'}></Nav>
        <main id="mainHome">
            {
            !usuario ? '' : (
                <>
                {/* informações do usuário */}
                {showInfosUser && (
                    <InfosUser></InfosUser>
                )}

                {/* funcionários disponíveis se o usuário for 'base' ou 'adm' */}
                {(usuario.cargo === 'base' || usuario.cargo === 'adm' || usuario.cargo == 'dev') && (
                    <FuncsDisponiveis></FuncsDisponiveis>
                )}

                {/* Ordens abertas e ordens em atendimento se o usuário for 'base' ou 'adm' */}
                {(usuario.cargo === 'base' || usuario.cargo === 'adm' || usuario.cargo == 'dev') && (
                    <section id='secOrdens'>
                        {/* Ordens Abertas */}
                        <OrdensAbertas></OrdensAbertas>

                        {/* Ordens em Atendimento */}
                        <OrdensEmAtendimento></OrdensEmAtendimento>
                    </section>
                )}
                </>
            )
            }

        </main>
        </div>
    )
}

export default Home