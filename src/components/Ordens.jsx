import Header from "./public/Header"
import Nav from "./public/Nav"
import '../styles/ordens.css'
import View from "../assets/view.png"
import Hide from "../assets/hide.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCookie } from '../services/cookies.js'
import { getOrdens, getOrdensPorSituacao } from "../services/backend/ordemAPI.js"

import { DownOutlined, UpOutlined } from '@ant-design/icons'

// TODO Criação e Edição de Ordens por ordem de redirecionamento
function Ordens() {
    const navigate = useNavigate()
    const [ordens, setOrdens] = useState()
    const [ordemAberta, setOrdemAberta] = useState(null)

    const [pendente, setPendente] = useState(null)
    const [emExecucao, setEmExecucao] = useState(null)
    const [retorno, setRetorno] = useState(null)
    const [finalizada, setFinalizada] = useState(null)
    const [cancelada, setCancelada] = useState(null)
    const [expandLists, setExpandLists] = useState({
        pendente: false,
        emExecucao: false,
        retorno: false,
        finalizada: false,
        cancelada: false
    })

    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const handleNovaOrdem = () => {
        navigate('/nova-ordem')
    }
    const handleAbrirOrdem = (idOrdem, tipo) => {
        console.log('DEBBUG ABRIR ORDEM')
        console.warn([tipo])
        const ordemToAbrir = [tipo].find(ordem => ordem.id == idOrdem)
        if (!ordemToAbrir) {
            console.error('Erro ao abrir ordem!')
            return
        }
        setOrdemAberta(ordemToAbrir)
    }
    const handleFecharOrdem = () => {
        setOrdemAberta(null)
    }
    const handleChangeExpandLists = (field, value) => {
        setExpandLists(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    const fetchOrdens = async (situacao) => {
        try {
            const response = await getOrdensPorSituacao(situacao)
            const array = response.data.content
            if (array?.length == 0) {
                return
            }
            switch (situacao) {
                case 'PENDENTE':
                    setPendente(array)
                    break;
                case 'EM_EXECUCAO':
                    setEmExecucao(array)
                    break;
                case 'RETORNO':
                    setRetorno(array)
                    break;
                case 'FINALIZADA':
                    setFinalizada(array)
                    break;
                case 'CANCELADA':
                    setCancelada(array)
                    break;
                default: console.warn('Erro de tipagem das ordens!')
                    break;
            }
            console.log('LISTANDO ORDENS ' + situacao + ':')
            console.warn(array)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        console.clear()
        const fetchData = async () => {
            fetchOrdens('PENDENTE')
            fetchOrdens('EM_EXECUCAO')
            fetchOrdens('RETORNO')
            fetchOrdens('FINALIZADA')
            fetchOrdens('CANCELADA')
        }
        setTimeout(() => {
            fetchData()
        }, 200)
    }, [])
    return (
        <div id="pageOrdens" className='paginas'>
            <Header titulo={"Ordens"} usuario={usuario}></Header>
            <Nav cargo={usuario?.cargo || ''}></Nav>
            <main id="mainOrdens">
                <section id="sec1">
                    <div id="ContNovo">
                        <button id="bttNovaOrdem" onClick={handleNovaOrdem}>
                            Nova Ordem
                        </button>
                    </div>
                    <div></div>
                </section>
                {
                    (pendente || emExecucao || retorno) &&
                    <section id="sec2">
                        <div id="contOrdensPendentes" className="listOrdens">
                            <button className="headList"
                                onClick={() => handleChangeExpandLists('pendente', !expandLists.pendente)}
                                disabled={!pendente}
                            >
                                <p>Pendente</p>
                                {
                                    expandLists.pendente ?
                                        <UpOutlined className="iconExpandir" /> :
                                        <DownOutlined className="iconExpandir" />
                                }
                            </button>
                            {
                                pendente &&
                                expandLists.pendente &&
                                (<div className="bodyList">
                                    {pendente.map(ordem =>
                                        <div key={ordem.id}         
                                            className="itemListOrdens"
                                            onClick={() => handleAbrirOrdem(ordem.id, 'pendente')}>
                                            <div>Cliente: {ordem.cliente}</div>
                                            <div>Serviço: {ordem.servico}</div>
                                            <div>Data abertura: {ordem.dtAbertura}</div>
                                        </div>
                                    )}
                                </div>)
                            }
                        </div>
                        <div id="contOrdensEmExecucao" className="listOrdens">
                            <button className="headList"
                                onClick={() => handleChangeExpandLists('pendente', !expandLists.emExecucao)}
                                disabled={!emExecucao}
                                >
                                <p>
                                    Em execução
                                </p>
                                {
                                    expandLists.emExecucao ?
                                    <UpOutlined className="iconExpandir" /> :
                                    <DownOutlined className="iconExpandir" />
                                }
                            </button>
                            {
                                emExecucao &&
                                expandLists.emExecucao &&
                                (<div className="bodyList">
                                    {emExecucao.map(ordem =>
                                        <div key={ordem.id} 
                                            className="itemListOrdens"
                                            onClick={() => handleAbrirOrdem(ordem.id, 'emExecucao')}>
                                            <div>Cliente: {ordem.cliente}</div>
                                            <div>Serviço: {ordem.servico}</div>
                                            <div>Data abertura: {ordem.dtAbertura}</div>
                                        </div>
                                    )}
                                </div>)
                            }
                        </div>
                        <div id="contOrdensRetorno" className="listOrdens">
                            <button className="headList"
                                onClick={() => handleChangeExpandLists('retorno', !expandLists.retorno)}
                                disabled={!retorno}
                                >
                                <p>
                                    Retorno
                                </p>
                                {
                                    expandLists.retorno ?
                                    <UpOutlined className="iconExpandir" /> :
                                    <DownOutlined className="iconExpandir" />
                                }
                            </button>
                            {
                                retorno &&
                                expandLists.retorno &&
                                (<div className="bodyList">
                                    {retorno.map(ordem =>
                                        <div key={ordem.id} 
                                            className="itemListOrdens"
                                            onClick={() => handleAbrirOrdem(ordem.id, 'retorno')}>
                                            <div>Cliente: {ordem.cliente}</div>
                                            <div>Serviço: {ordem.servico}</div>
                                            <div>Data abertura: {ordem.dtAbertura}</div>
                                        </div>
                                    )}
                                </div>)
                            }
                        </div>
                    </section>
                }
            </main>
            {
                ordemAberta &&
                <div className='shadowBG'>
                    <section>
                        <h2>Ordem Nº{ordemAberta.id}</h2>
                        <div>Cliente: {ordemAberta.cliente}</div>
                        <div>Endereço: {ordemAberta.endereco.logradouro}, {ordemAberta.endereco.numero} - {ordemAberta.endereco.complemento} - {ordemAberta.endereco.bairro}, {ordemAberta.endereco.cidade}-{ordemAberta.endereco.uf}</div>
                        <div>Data de abertura: {ordemAberta.dtAbertura}</div>
                        <div>Funcionário: {ordemAberta.funcionario || 'vazio'}</div>
                        <div>Descrição: {ordemAberta.descricao || 'sem descrição'}</div>
                        <div>Situação: {ordemAberta.situacao}</div>
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