import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/home.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'


function Home() {
    // TODO Colocar mais conteudo como atalhos
    const [showUsuario, setShowUsuario] = useState(null)
    const [funcDisponiveis, setFuncDisponiveis] = useState(null)
    const [ordensAbertas, SetOrdensAbertas] = useState(null)
    const [ordensEmAtendimento, setOrdensEmAtendimento] = useState(null)

    const fetchFuncs = async () => {
        setFuncDisponiveis('vazio')
    }
    const fetchOrdens = async () => {
        setOrdensEmAtendimento('vazio')
        SetOrdensAbertas('vazio')
    }
    useEffect(() => {
        fetchOrdens()
        fetchFuncs()
    }, [])
    return (
        <div id='pageHome'>
        <Header titulo={"Página inicial"}></Header>
        <Nav></Nav>
        <main id="mainHome">
            {/* SEÇÃO DE ORDENS DE SERVIÇOS ABERTOS */}
            
            {/* SEÇÃO DE ORDENS DE SERVIÇOS SENDO ATENDIDAS */}
            
            {
                !funcDisponiveis ? 
                <Loading></Loading> :
                (
                    <section id='secTecnicosDisponiveis'>
                        <h2>Tecnicos disponiveis</h2>
                        <div id='listTecsDisp'>
                        {
                            funcDisponiveis == 'vazio' ? 'Nenhum técnico disponível' :
                            funcDisponiveis.map(func => 
                                <div id={`funcDisp${func.id}`} className="funcsDisp" key={func.id}>
                                    <div className="nomeFunc">{func.nome}</div>
                                </div>
                            )
                        }
                        </div>
                    </section>
                )
            }
            {
            ordensAbertas || ordensEmAtendimento ? 
            // Teste
            <section id='secOrdens'> 
                <div id='contOrdensAbertas'>
                    <h2>Ordens Abertas</h2>
                    <div className="ordensAbertas ordens">
                        <div className="nomeCliente">Nome do cliente</div>
                        <div className="dataHora">data e hora</div>
                        <div className="local">endereço do cliente</div>
                    </div>
                </div>
                <div id="contOrdensSendoAtendidas">
                    <h2>Ordens em atendimento</h2>
                    <div className="ordensSendoAtendidas ordens">
                        <div className="nomeCliente">Nome do cliente</div>
                        <div className="dataHora">data e hora</div>
                        <div className="local">endereço do cliente</div>
                        <div className="tecnico">tecnico responsável    </div>
                    </div>
                    <div className="ordensSendoAtendidas ordens">
                        <div className="nomeCliente">Nome do cliente</div>
                        <div className="dataHora">data e hora</div>
                        <div className="local">endereço com nome grande do cliente</div>
                        <div className="tecnico">tecnico responsável    </div>
                    </div>
                </div>
            </section> :
            <section id='secOrdens'>
            {
                !ordensAbertas ? 
                <Loading></Loading> :
                (
                    ordensAbertas == 'vazio' ? 
                    <div id="contOrdensAbertas">
                    
                    </div> :
                    <div id="contOrdensAbertas">
                        <h2>Ordens Abertas</h2>
                        {
                            ordensAbertas.map(ordem => 
                                <div id={`ordemAberta${ordem.id}`} className="ordensAbertas ordens" key={ordem.id}>
                                    <div className="nomeCliente">{ordem.cliente.nome}</div>
                                    <div className="dataHora">{ordem.abertura}</div>
                                    <div className="local">{ordem.cliente.endereco}</div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                !ordensAbertas ? 
                <Loading></Loading> :
                (
                    ordensEmAtendimento == 'vazio' ? 
                    <div id="contOrdensSendoAtendidas">
                    </div> :
                    <div id="secOrdensSendoAtendidas">
                        <h2>Ordens em atendimento</h2>
                        {
                            
                            ordensEmAtendimento.map(ordem => 
                                <div id={`ordenSendoAtendida1${ordem.id}`} className="ordensSendoAtendidas ordens" key={ordem.id}>
                                    <div className="nomeCliente">{ordem.nome}</div>
                                    <div className="dataHora">{ordem.data}</div>
                                    <div className="local">{ordem.endereco}</div>
                                    <div className="tecnico">{ordem.tecnico}</div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            </section>
            }
        </main>
        </div>
    )
}

export default Home