import { useState } from "react";
import Nav from "../components/public/Nav";
import { getCookie } from '@services/cookies'

{/* Carregar atendimentos relacionados ao tecnico */}
export default function MeusAtendimentos() {
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    return (
        <div id='pageMeusAtendimentos' className='paginas'>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainAtendimentos">
            {/* atendimentos abertos */}
            <section> 
                
            </section>
            {/* atendimentos finalizados ou cancelados */}
            <section>
                
            </section>
        </main>
        </div>
    )
}