import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/home.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'
import { getFuncionariosDisponiveis } from '../services/funcionariosAPI'


function Home() {
    const [showUsuario, setShowUsuario] = useState(null)
    const [funcDisponiveis, setFuncDisponiveis] = useState(null)
    const [ordensAbertas, SetOrdensAbertas] = useState(null)
    const [ordensEmAtendimento, setOrdensEmAtendimento] = useState(null)
    const [showInfosUser, setShowInfosUser] = useState(true)
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario')
        return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
    })

    const fetchFuncs = async () => {
        try {
            const result = await getFuncionariosDisponiveis()
            setFuncDisponiveis(result.data.content)
            console.warn(result)
        } catch (err) {
            console.error(err)
        }
    }
    const fetchOrdens = async () => {
        //  TODO Adicionar quando /api/ordens estiver pronta
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
        <Nav cargo={usuario?.cargo || 'tecnico'}></Nav>
        <main id="mainHome">
            {
                !usuario ? '' : (
                    <>
                        {/* informações do usuário */}
                        {showInfosUser && (
                            <section id='secInfosUser'>
                                <h2>Usuario de teste</h2>
                                <p>Você está logado como usuário de desenvolvimento.</p>
                            </section>
                        )}

                        {/* funcionários disponíveis se o usuário for 'base' ou 'adm' */}
                        {(usuario.cargo === 'base' || usuario.cargo === 'adm' || usuario.cargo == 'dev') && (
                            !funcDisponiveis ? 
                            <Loading /> : (
                                <section id='secTecnicosDisponiveis'>
                                    <h2>Tecnicos disponiveis</h2>
                                    <div id='listTecsDisp'>
                                        {funcDisponiveis === 'vazio' ? 'Nenhum técnico disponível' : (
                                            funcDisponiveis.map(func => (
                                                <div id={`funcDisp${func.id}`} className="funcsDisp" key={func.id}>
                                                    <div className="nomeFunc">{func.nome}</div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </section>
                            )
                        )}

                        {/* Ordens abertas e ordens em atendimento se o usuário for 'base' ou 'adm' */}
                        {(usuario.cargo === 'base' || usuario.cargo === 'adm' || usuario.cargo == 'dev') && (
                            <section id='secOrdens'>
                                {/* Ordens Abertas */}
                                {!ordensAbertas ? 
                                <Loading /> : (
                                    ordensAbertas === 'vazio' ? '' : (
                                        <div id="contOrdensAbertas">
                                            <h2>Ordens Abertas</h2>
                                            {ordensAbertas.map(ordem => (
                                                <div id={`ordemAberta${ordem.id}`} className="ordensAbertas ordens" key={ordem.id}>
                                                    <div className="nomeCliente">{ordem.cliente.nome}</div>
                                                    <div className="dataHora">{ordem.abertura}</div>
                                                    <div className="local">{ordem.cliente.endereco}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}

                                {/* Ordens em Atendimento */}
                                {!ordensAbertas ? 
                                <Loading /> : (
                                    ordensEmAtendimento === 'vazio' ? '' : (
                                        <div id="secOrdensSendoAtendidas">
                                            <h2>Ordens em atendimento</h2>
                                            {ordensEmAtendimento.map(ordem => (
                                                <div id={`ordenSendoAtendida1${ordem.id}`} className="ordensSendoAtendidas ordens" key={ordem.id}>
                                                    <div className="nomeCliente">{ordem.nome}</div>
                                                    <div className="dataHora">{ordem.data}</div>
                                                    <div className="local">{ordem.endereco}</div>
                                                    <div className="tecnico">{ordem.tecnico}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
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