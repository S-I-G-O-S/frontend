import Nav from "@components/public/Nav.jsx"
import '@styles/ordens.css'
import { useNavigate, useLocation } from "react-router-dom"
import { getPageOrdens } from "@backend/ordemAPI.js"
import Loading from "@components/public/Loading.jsx"

import { useEffect, useState } from "react"
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, FieldTimeOutlined, RollbackOutlined, ToolOutlined } from '@ant-design/icons'
import { Pagination } from "antd"
import { getUsuarioContext } from "../context/UsuarioContext.jsx";

function Ordens() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let situacaoParam = searchParams?.get('situacao') ?? ''
    const navigate = useNavigate()
    const { usuario } = getUsuarioContext()
    const [ordemAberta, setOrdemAberta] = useState(null)
    const [ordens, setOrdens] = useState(null)
    const [reqstOrdens, setReqstOrdens] = useState(null)
    const [filtros, setFiltros] = useState({
        situacao: {
            value: '',
            is: false
        },
        funcionario: {
            value: '',
            is: false
        },
        servico: {
            value: '',
            is: false
        },
        qtd: 15
    })
    const [render, setRender] = useState({
        cliente: false,
        funcionario: false,
        servico: false
    })
    const [loadings, setLoadings] = useState({
        editarOrdem: false,
        situacao: false,
        bttPendente: false,
        bttEmExecucao: false,
        bttRetorno: false,
        bttCancelada: false,
        bttFinalizada: false
    })
    /*const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })*/
    
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
    //  SEC FILTRO GERAL
    const handleFecharFiltro = (tipoFiltro) => {
        setRender(prevState => ({
            ...prevState,
            [tipoFiltro]: false
        }))
    }
    //  SEC ORDEM ABERTA
    const handleEditClick = (idOrdem) => {
        navigate(`/ordem?id=${idOrdem}`)
    }
    const handleAbrirOrdem = (idOrdem) => {
        const ordemToAbrir = ordens.find(ordem => ordem.id == idOrdem)
        if (!ordemToAbrir) {
            console.error('Erro ao abrir ordem!')
            return
        }
        setOrdemAberta(ordemToAbrir)
    }
    const handleFecharOrdem = () => {
        setOrdemAberta(null)
    }
    //  SEC 1
    const handleNovaOrdem = () => {
        navigate('/nova-ordem')
    }
    useEffect(() => {
        console.clear()
        console.log('Filtrando por situação: '+ filtros.situacao.value)
        fetchOrdens(0)
    }, [filtros.situacao.value])
    const handleChangeFilters = (value, field) => {
        // setloadings(prevState => ({
        //     ...prevState,
        //     situacao: true,
        // }))
        if (value==filtros.situacao.value) {
            //  Quando o usuario clicar no mesmo botão de situação, ele vai ser anulado
            value='default'
        }
        switch (value) {
            case 'PENDENTE':
                changeLoadings(!loadings.bttPendente, 'bttPendente')
                break;
            case 'EM_EXECUCAO':
                changeLoadings(!loadings.bttEmExecucao, 'bttEmExecucao')
                break;
            case 'RETORNO':
                changeLoadings(!loadings.bttRetorno, 'bttRetorno')
                break;
            case 'FINALIZADA':
                changeLoadings(!loadings.bttFinalizada, 'bttFinalizada')
                break;
            case 'CANCELADA':
                changeLoadings(!loadings.bttCancelada, 'bttCancelada')
                break;
            default: console.warn('Erro de tipagem das ordens!')
                break;
        }
        
        setFiltros(prevState => ({
            ...prevState,
            [field]: {
                value,
                is: (value=='' || value=='default'? false : true)
            },
        }))
    }
    const changeAllSituacaoLoadings = () => {
        changeLoadings(false, 'bttPendente')
        changeLoadings(false, 'bttEmExecucao')
        changeLoadings(false, 'bttRetorno')
        changeLoadings(false, 'bttFinalizada')
        changeLoadings(false, 'bttCancelada')
    }
    const changeLoadings = (value, field) => {
        setLoadings(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    //  SEC 2
    const changePage = (current) => {
        fetchOrdens(current - 1)
    }

    //  REQUISIÇÕES
    const fetchOrdens = async (pagina) => {
        const result = await getPageOrdens(pagina, filtros)
        if (!result.success) {
            console.error(error)
            return
        }
        setReqstOrdens(result.response)
        setOrdens(result.response.data.content)
        console.warn(result.response)
        changeAllSituacaoLoadings()
        // setloadings(prevState => ({
        //     ...prevState,
        //     situacao: false,
        // }))
    }
    useEffect(() => {
        console.clear()
        const fetchData = async () => {
            fetchOrdens(0)
        }
        if (situacaoParam=='') {
            setTimeout(() => {
                fetchData()
            }, 200)
        } else {
            handleChangeFilters(situacaoParam, 'situacao')
        }
    }, [])
    return (
        <div id="pageOrdens" className='paginas'>
            {/* <Header titulo={"Ordens"} usuario={usuario}></Header> */}
            <Nav cargo={usuario?.cargo || ''}></Nav>
            <main id="mainOrdens">
            <section id="sec1">
                <div id="contNovo">
                    <button id="bttNovaOrdem" onClick={handleNovaOrdem}>
                        Nova Ordem
                    </button>
                    {/* <button id="bttGoToHistOrdens" onClick={goToHistOrdens}>Ver historico detalhado</button> */}
                </div>
                <div id="contSituacoes">
                    <button
                        id="bttSituacaoPendente"
                        className={ `bttsSituacao ${filtros.situacao.value=='PENDENTE' ? 'bttSelecionado' : ''}`}
                        onClick={() => handleChangeFilters('PENDENTE', 'situacao')}
                        disabled={loadings.bttPendente}
                        >
                        <div>
                            <FieldTimeOutlined />
                            <p>Pendentes</p>
                        </div>
                        {/* 
                            loadings.bttPendente &&
                            <LoadingOutlined />
                        */}
                    </button>
                    <button
                        id="bttSituacaoEmExecucao"
                        className={ `bttsSituacao ${filtros.situacao.value=='EM_EXECUCAO' ? 'bttSelecionado' : ''}`}
                        onClick={() => handleChangeFilters('EM_EXECUCAO', 'situacao')}
                        disabled={loadings.bttEmExecucao}
                        >
                        <div>
                            <ToolOutlined />
                            <p>Em execução</p>
                        </div>
                        {/*
                            loadings.bttEmExecucao &&
                            <LoadingOutlined/>
                        */}
                    </button>
                    <button
                        id="bttSituacaoRetorno"
                        className={ `bttsSituacao ${filtros.situacao.value=='RETORNO' ? 'bttSelecionado' : ''}`}
                        onClick={() => handleChangeFilters('RETORNO', 'situacao')}
                        disabled={loadings.bttRetorno}
                        >
                        <div>
                            <RollbackOutlined/>
                            <p>Em retorno</p>
                        </div>
                        {/*
                            loadings.bttRetorno &&
                            <LoadingOutlined/>
                        */}
                    </button>
                    <button
                        id="bttSituacaoCancelada"
                        className={ `bttsSituacao ${filtros.situacao.value=='CANCELADA' ? 'bttSelecionado' : ''}`}
                        onClick={() => handleChangeFilters('CANCELADA', 'situacao')}
                        disabled={loadings.bttCancelada}
                        >
                        <div>
                            <CloseCircleOutlined />
                            <p>Canceladas</p>
                        </div>
                        {/*
                            loadings.bttCancelada &&
                            <LoadingOutlined/>
                        */}
                    </button>
                    <button
                        id="bttSituacaoFinalizada"
                        className={ `bttsSituacao ${filtros.situacao.value=='FINALIZADA' ? 'bttSelecionado' : ''}`}
                        onClick={() => handleChangeFilters('FINALIZADA', 'situacao')}
                        disabled={loadings.bttFinalizada}
                        >
                        <div>
                            <CheckCircleOutlined />
                            <p>Finalizadas</p>
                        </div>
                        {/*
                            loadings.bttFinalizada &&
                            <LoadingOutlined/>
                        */}
                    </button>
                </div>
            </section>
            <section id="secHistOrdens">
                <div id="contTableHistOrdens">
                    <table id="tableHistOrdens">
                        <thead id="titleList">
                        <tr>
                            <th id="idTitleList">id</th>
                            <th>data abertura</th>
                            <th>cliente</th>
                            <th>funcionário</th>
                            <th id="situacaoTitleList">situação</th>
                        </tr>
                        </thead>
                        <tbody id="listOrdens">
                            {
                                !ordens ?
                                <tr>
                                    <td colSpan='6'>
                                    <Loading/>
                                    </td>
                                </tr>
                                :
                                (
                                    ordens.length==0 ? 
                                    <tr id="msgSemOrdens">
                                        <td colSpan='6'>
                                            sem ordens
                                        </td>
                                    </tr>
                                    :
                                    ordens?.map(ordem => (
                                        <tr id={`ordem${ordem.id}`}
                                            className="ordem"
                                            key={ordem.id}
                                            onClick={() => 
                                                handleAbrirOrdem(ordem.id)
                                            }
                                        >
                                            <td className="cl1">{ordem.id}</td>
                                            <td className="cl2">{converterDtHr(ordem.dtAbertura)}</td>
                                            <td className="cl3">{ordem.cliente}</td>
                                            <td className="cl4">{ordem.funcionario || 'nenhum'}</td>
                                            <td className={`cl5 tipoOrdem${ordem.situacao}`}>{ordem.situacao=="EM_EXECUCAO" ? "EM EXECUÇÃO": ordem.situacao}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='paginacao'>
                    {
                        (!reqstOrdens || reqstOrdens.data.totalPages==1)? '' :
                        // renderPaginas()
                        <Pagination 
                            defaultCurrent={1} 
                            total={reqstOrdens.data.totalPages}
                            disabled={reqstOrdens.data.totalPages == 1}
                            pageSize={1}
                            responsive
                            showSizeChanger={false}
                            onChange={changePage}
                            showTitle={false}
                            />
                    }
                </div>
            </section>
            </main>
            {
                ordemAberta &&
                <div className='shadowBG'>
                    <section id="secOrdemAberta">
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
                            <div id="infoSituacaoOrdemAberta"><span>Situação: </span>{ordemAberta.situacao}</div>
                        </div>
                        <div id='acoesOrdemAberta'>
                            <button id="bttFecharOrdemAberta" onClick={handleFecharOrdem}>cancelar</button>
                            <button id="bttEditarOrdem" onClick={() => handleEditClick(ordemAberta.id)}>editar</button>
                        </div>
                    </section>
                </div>
            }
            {/*
                render.cliente && 
                <div className="shadowBG">
                    <section id="secFiltroCliente" className="secsFiltro">
                        <div id="HeaderFiltroCliente">
                            <h2>Procurar por cliente</h2>
                            <CloseOutlined className="fecharFiltro" onClick={() => handleFecharFiltro('cliente')}/>
                        </div>
                    </section>
                </div>
            */}
        </div>
    )
}

export default Ordens