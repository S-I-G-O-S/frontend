import Header from "./public/Header"
import Nav from "./public/Nav"
import '../styles/ordens.css'
import View from "../assets/view.png"
import Hide from "../assets/hide.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCookie } from '../services/cookies.js'
import { getOrdens, getOrdensPorSituacao } from "../services/backend/ordemAPI.js"

import { CloseOutlined, DownOutlined, FieldTimeOutlined, LoadingOutlined, RollbackOutlined, UpOutlined } from '@ant-design/icons'

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
    const [varRenders, setVarRenders] = useState({
        editarOrdem: false,
    })
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const handleEditClick = (idOrdem) => {
        navigate(`/ordem?id=${idOrdem}`)
    }
    const converterDtHr = (dataHora) => {
        const [dia, mes, anoHora] = dataHora.split('-')
        const [ano, hora] = anoHora.split(' ')
        const dataISO = `${ano}-${mes}-${dia}T${hora}`

        const data = new Date(dataISO);
        if (isNaN(data.getTime())) return "Data Inválida"
            return data.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }
    const handleNovaOrdem = () => {
        navigate('/nova-ordem')
    }
    const handleAbrirOrdem = (idOrdem, tipo) => {
        console.log('DEBBUG ABRIR ORDEM')
        console.warn([tipo])
        let ordemToAbrir
        
        switch (tipo) {
            case 'PENDENTE':
                ordemToAbrir = pendente.find(ordem => ordem.id == idOrdem)
                break;
            case 'EM_EXECUCAO':
                ordemToAbrir = emExecucao.find(ordem => ordem.id == idOrdem)
                break;
            case 'RETORNO':
                ordemToAbrir = retorno.find(ordem => ordem.id == idOrdem)
                break;
            case 'FINALIZADA':
                ordemToAbrir = finalizada.find(ordem => ordem.id == idOrdem)
                break;
            case 'CANCELADA':
                ordemToAbrir = cancelada.find(ordem => ordem.id == idOrdem)
                break;
            default: console.warn('Erro de tipagem das ordens!')
                break;
        }
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
                    {
                        <div id="contOrdens">
                            <div id="contOrdensPendentes" 
                                className={expandLists.pendente ? 'listOrdensAberto listOrdens' : 'listOrdensFechado listOrdens'}
                                >
                                <button className="headList"
                                    onClick={() => handleChangeExpandLists('pendente', !expandLists.pendente)}
                                    disabled={!pendente}
                                    >
                                    <div className="leftCont">
                                        <LoadingOutlined />
                                        <p>Pendente</p>
                                    </div>
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
                                                onClick={() => handleAbrirOrdem(ordem.id, 'PENDENTE')}>
                                                <div>Cliente: {ordem.cliente}</div>
                                                <div>Serviço: {ordem.servico}</div>
                                                <div>Data abertura: {converterDtHr(ordem.dtAbertura)}</div>
                                            </div>
                                        )}
                                    </div>)
                                }
                            </div>
                            <div id="contOrdensEmExecucao"
                                className={expandLists.emExecucao ? 'listOrdensAberto listOrdens' : 'listOrdensFechado listOrdens'}
                                >
                                <button className="headList"
                                    onClick={() => handleChangeExpandLists('emExecucao', !expandLists.emExecucao)}
                                    disabled={!emExecucao}
                                    >
                                    <div className="leftCont">
                                        <FieldTimeOutlined />
                                        <p>Em execução</p>
                                    </div>
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
                                                onClick={() => handleAbrirOrdem(ordem.id, 'EM_EXECUCAO')}>
                                                <div>Cliente: {ordem.cliente}</div>
                                                <div>Serviço: {ordem.servico}</div>
                                                <div>Data abertura: {converterDtHr(ordem.dtAbertura)}</div>
                                            </div>
                                        )}
                                    </div>)
                                }
                            </div>
                            <div id="contOrdensRetorno" 
                                className={expandLists.retorno ? 'listOrdensAberto listOrdens' : 'listOrdensFechado listOrdens'}
                                
                                >
                                <button className="headList"
                                    onClick={() => handleChangeExpandLists('retorno', !expandLists.retorno)}
                                    disabled={!retorno}
                                    >
                                    <div className="leftCont">
                                        <RollbackOutlined/>
                                        <p>Retorno</p>
                                    </div>
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
                                                onClick={() => handleAbrirOrdem(ordem.id, 'RETORNO')}>
                                                <div>Cliente: {ordem.cliente}</div>
                                                <div>Serviço: {ordem.servico}</div>
                                                <div>Data abertura: {converterDtHr(ordem.dtAbertura)}</div>
                                            </div>
                                        )}
                                    </div>)
                                }
                            </div>
                        </div>
                    }
                </section>
                
            </main>
            {
                ordemAberta &&
                <div className='shadowBG'>
                    <section>
                        <div id="headOrdemAberta">
                            <h2>Ordem códº{ordemAberta.id}</h2>
                            <CloseOutlined id="fecharOrdemAberta" onClick={handleFecharOrdem}/>
                        </div>
                        <div id="infosOrdemAberta">
                            <div><span>Cliente: </span>{ordemAberta.cliente}</div>
                            <div><span>Endereço: </span>{ordemAberta.endereco.logradouro}, {ordemAberta.endereco.numero} - {ordemAberta.endereco.complemento} - {ordemAberta.endereco.bairro}, {ordemAberta.endereco.cidade}-{ordemAberta.endereco.uf}</div>
                            <div><span>Data de abertura: </span>{converterDtHr(ordemAberta.dtAbertura)}</div>
                            <div><span>Funcionário: </span>{ordemAberta.funcionario || ''}</div>
                            <div><span>Descrição: </span>{ordemAberta.descricao || ''}</div>
                            <div><span>Situação: </span>{ordemAberta.situacao}</div>
                        </div>
                        <div id='acoesOrdemAberta'>
                            <button id="bttFecharOrdemAberta" onClick={handleFecharOrdem}>cancelar</button>
                            <button id="bttEditarOrdem" onClick={() => handleEditClick(ordemAberta.id)}>editar</button>
                        </div>
                    </section>
                </div>
            }
        </div>
    )
}

export default Ordens