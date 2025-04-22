import { useEffect, useState } from "react";
import Nav from "../components/public/Nav.jsx";
import Loading from '@components/public/Loading.jsx'
import { getOrdensTecnico } from "../services/backend/ordemAPI.js";
import { getUsuarioContext } from "../context/UsuarioContext.jsx";
import { WarningFilled } from '@ant-design/icons'
import OrdensFechadas from "@components/MeusAtendimentos/OrdensFechadas.jsx";
import OrdensAbertas from "../components/MeusAtendimentos/OrdensAbertas.jsx";
import "@styles/meusAtendimentos.css"

export default function MeusAtendimentos() {
    const { usuario } = getUsuarioContext()
    const [loading, setLoading] = useState({
        ordensAbertas: false,
        ordensFechadas: false
    })
    const [ordens, setOrdens] = useState([])
    const [ordensAbertas, setOrdensAbertas] = useState([])
    const [ordensFechadas, setOrdensFechadas] = useState([])
    const [files, setFiles] = useState([])
    const changeLoadings = (field, value) => {
        setLoading(prevState => ({
            ...prevState,
            [field]: value 
        }))
    }
    const addToOrdensFechadas = (ordem) => {
        console.log(`Add ordem ${ordem.id} para Fechadas`)
        setOrdensFechadas(prevState => ([
            ...prevState, ordem
        ]))
    }
    const addToOrdensAbertas = (ordem) => {
        console.log(`Add ordem ${ordem.id} para Abertas`)
        setOrdensAbertas(prevState => ([
            ...prevState, ordem 
        ]))
    }
    const fecthOrdens = async () => {
        changeLoadings('ordensAbertas', true)
        changeLoadings('ordensFechadas', true)
        const result = await getOrdensTecnico(usuario.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setOrdensAbertas([])
        setOrdensFechadas([])
        result.response.data.content.forEach((ordem) => {
            if (ordem.situacao==="FINALIZADA" ||  ordem.situacao==="CANCELADA") {
                addToOrdensFechadas(ordem)
            } else {
                addToOrdensAbertas(ordem)
            }
        })
        console.warn(result.response)
        console.log("ordems abertas:")
        console.warn(ordensAbertas)
        console.log("ordems fechadas:")
        console.warn(ordensFechadas)
        
        // setOrdens(result.response.data.content)
        changeLoadings('ordensFechadas', false)
        changeLoadings('ordensAbertas', false)
    }
    useEffect(() => {
        fecthOrdens()
    }, [])

    return (
        <div id='pageMeusAtendimentos' className='paginas'>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainAtendimentos">
            {/* atendimentos abertos */}
            <section id="secOrdensAbertas">
                <h2>Ordens abertas</h2>
                {loading.ordensAbertas  ? 
                    <Loading></Loading> : 
                    <OrdensAbertas ordens={ordensAbertas}/>
                }
            </section >
            {/* atendimentos finalizados ou cancelados */}
            <section id="secOrdensFechadas">
                <h2>Ordens arquivadas</h2>
                {loading.ordensFechadas ?
                    <Loading/> :
                    <OrdensFechadas ordens={ordensFechadas}/>
                }
            </section>
        </main>
        </div>
    )
}