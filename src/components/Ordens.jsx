import Header from "./public/Header"
import Nav from "./public/Nav"
import '../styles/ordens.css'
import View from "../assets/view.png"
import Hide from "../assets/hide.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCookie } from '../services/cookies.js'

// TODO Criação e Edição de Ordens por ordem de redirecionamento
function Ordens() {
    const navigate = useNavigate()
    const [reqstOrdens, setReqstOrdens] = useState()
    const [ordens, setOrdens] = useState()
    const [ordemAberta, setOrdemAberta] = useState(null)
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const handleNovaOrdem = () => {
        navigate('/nova-ordem')
    }
    useEffect(() => {
        const fetchData = async () => {
        }
        fetchData()
    }, [])
    return (
        <div id="pageOrdens" className='paginas'>
        <Header titulo={"Ordens"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainOrdens">
            <section>
                <div>
                    <button onClick={handleNovaOrdem}>
                        Nova Ordem
                    </button>
                </div>
                <div></div>
            </section>
        </main>
        {
            ordemAberta &&
            <div className='shadowBG'>
            <section>
                <h2>Ordem Nº{ordemAberta.id}</h2>
                <p>{ordemAberta.cliente.nome}</p>
                <p>{ordemAberta.cliente.endereco}</p>
                <p>{ordemAberta.funcionario.nome}</p>
                <p></p>
                <div id='acoesOrdemAberta'>
                    <button>cancelar</button>
                </div>
            </section>
            </div>
        }
        </div>
    )
}

export default Ordens