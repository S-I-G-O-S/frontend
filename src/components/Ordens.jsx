import config from '../services/devConfig.js'
// Dados simulados
import simuGetOrdens from '../dadosSimulados/ordens.js'
// Funções de requisições
import {getFuncionarios} from '../services/funcionariosAPI.js'

import Header from "./public/Header"
import Nav from "./public/Nav"
import '../styles/ordens.css'
import View from "../assets/view.png"
import Hide from "../assets/hide.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCookie } from '../services/cookies.js'

// TODO Paginação devido a alta qtd de ordens
// TODO Criação e Edição de Ordens por ordem de redirecionamento
function Ordens() {
    const [reqstOrdens, setReqstOrdens] = useState()
    const [ordens, setOrdens] = useState()
    const [ordemAberta, setOrdemAberta] = useState(null)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    function changeViewDetalhes(idOrdem) {
        const btt = document.getElementById('viewOrdem' + idOrdem)
        

        if (!ordemAberta) {
            btt.src = Hide
            btt.className = 'hide'
            if(config.simularDados) {
                setOrdemAberta(ordens.find(ordem => ordem.id === idOrdem))
            } else {
                // await getOrdemPorID(ordemAberta.id)
            }
        } else {
            btt.src = View
            btt.className = 'view'
            setOrdemAberta(null)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (config.simularDados) {
                setReqstOrdens(simuGetOrdens)

                setOrdens(simuGetOrdens?.content)
            } else {
                // try {
                //     const especialidadesData = await getEspecialidades()

                //     setReqstEspecialidades(especialidadesData)

                //     setEspecialidades(especialidadesData.content)
                // } catch (error) {
                //     setError(error.message)
                // }
            }
        }

        fetchData()
    }, [])

    return (
        <div id="pageOrdens" className='paginas'>
        <Header titulo={"Página inicial"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainOrdens">
            <section>
                <div>
                    <button>
                        Nova Ordem
                    </button>
                </div>
                <div id="containerListOrdens">
                    <div id="cabecalho">
                        <div>id</div>
                        <div>data abertura</div>
                        <div>cliente</div>
                        <div>situação</div>
                        <div>última atualização</div>
                        <div>detalhes</div>
                    </div>
                    <div id="listOrdens">
                    {
                        ordens?.map(ordem => (
                            <div
                                id={`ordem${ordem.id}`}
                                className="ordem"
                                key={ordem.id}>
                                <div className="ordemId">
                                    {ordem.id}
                                </div>
                                <div className="ordemDtAbertura">
                                    {ordem.dt_Abertura}
                                </div>
                                <div className="ordemCliente">
                                    {ordem.cliente.nome}
                                </div>
                                <div className="ordemSituacao">
                                    {ordem.situacao}
                                </div>
                                <div className="ordemUltAtt">
                                {
                                    ordem.dt_Atendimento ? ordem.dt_Atendimento : ordem.dt_Abertura
                                }
                                </div>
                                <div
                                    onClick={() => changeViewDetalhes(ordem.id)}
                                    className="ordemDetalhes barraTabela">
                                    <img
                                        id={`viewOrdem${ordem.id}`}
                                        className="view"
                                        src={View} alt="" />
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
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
                    <button onClick={() => changeViewDetalhes(ordemAberta.id)}>cancelar</button>
                </div>
            </section>
            </div>
        }
        </div>
    )
}

export default Ordens