import { useEffect, useState } from "react";
import Nav from "../components/public/Nav.jsx";
import Loading from '@components/public/Loading.jsx'
import { getCookie } from '@services/cookies.js'
import { getOrdensAtivasPorTecnico } from "../services/backend/ordemAPI.js";

{/* Carregar atendimentos relacionados ao tecnico */}

/*
    TODO Ajustar endpoint ordem/atendimentos:
        Atualmente ele insere a dtAtendimento apartir do POST
        Seria bom atualizar assim que dsAtendimento for fornecido
        Por enquanto utilizar este endpoint, pois o tecnico não tem permissão de alterar a ordem
        
*/
export default function MeusAtendimentos() {
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const [loading, setLoading] = useState({
        ordensAbertas: false,
        ordensFechadas: false
    })
    const [ordensAbertas, setOrdensAbertas] = useState([])
    const [ordensFechadas, setOrdensFechadas] = useState([])    
    
    const changeLoadings = (field, value) => {
        setLoading(prevState => ({
            ...prevState,
            [field]: value 
        }))
    }
    const fecthOrdensFechadas = async () => {

    }
    const fecthOrdensAbertas = async () => {
        changeLoadings('ordensAbertas', true)
        const result = await getOrdensAtivasPorTecnico(usuario.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.warn(result.response)
        changeLoadings('ordensAbertas', false)
        setOrdensAbertas(result.response.data.content)
    }
    useEffect(() => {
        fecthOrdensAbertas()
    }, [])

    return (
        <div id='pageMeusAtendimentos' className='paginas'>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainAtendimentos">
            {/* atendimentos abertos */}
            <section id="secOrdensAbertas"> 
            {
                loading.ordensAbertas  ? 
                    <Loading></Loading> : 
                    (!ordensAbertas || ordensAbertas.length==0) ?
                        <div>sem ordens ativas</div> : 
                        // Listagem das ordens
                        <div>
                            listagem das ordens
                        </div>
            }
            </section >
            {/* atendimentos finalizados ou cancelados */}
            <section id="secOrdensFechadas">
            {
                
            }
            </section>
        </main>
        </div>
    )
}