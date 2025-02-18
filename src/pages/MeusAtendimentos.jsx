import { useEffect, useState } from "react";
import Nav from "../components/public/Nav";
import { getCookie } from '@services/cookies'
import { getOrdensAtivasPorTecnico } from "../services/backend/ordemAPI";

{/* Carregar atendimentos relacionados ao tecnico */}
export default function MeusAtendimentos() {
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const [ordensAtivas, setOrdensAtivas] = useState([])
    const fecthOrdensAtivas = async () => {
        const result = await getOrdensAtivasPorTecnico(usuario.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.warn(result.response)
        setOrdensAtivas(result.response.data.content)
    }
    useEffect(() => {
        fecthOrdensAtivas()
    }, [])

    return (
        <div id='pageMeusAtendimentos' className='paginas'>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainAtendimentos">
            {/* atendimentos abertos */}
            <section> 
            {

            }
            </section>
            {/* atendimentos finalizados ou cancelados */}
            <section>
            {
                
            }
            </section>
        </main>
        </div>
    )
}