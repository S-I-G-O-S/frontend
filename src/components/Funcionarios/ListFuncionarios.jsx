// Funções de requisições
import {getPageFuncionarios} from '../..services/backend/funcionariosAPI.js'
import {getEspecialidades} from '../../services/backend/especialidadesAPI.js'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Skeleton, Input, Select, Button, Modal } from 'antd'
const { Search } = Input
import { FilterFilled, SearchOutlined } from '@ant-design/icons'

import '../../styles/funcionarios.css'
import Edit from '../../assets/edit-text.png'
import Down from '../../assets/dark/down.png' 
import Up from '../../assets/dark/up.png'
import Loading from './../public/Loading.jsx'

function ListFuncionarios({cargo}) {
    const navigate = useNavigate()
    const paleta = {
        azul: "#395873",
        nav: "#395873ea",
        laranja: "#D96704",
        salmao1: "#F2AE72",
        salmao2: "#f7cba4",
        salmao3: "#fcd8b9",
        branco: "#F2E8DF",
        marrom1: "#26110D",
        marrom2: "#3b1f17",
        marrom3: "#462b18",
        preto: "#000"
    }
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
    const [reqstEspecialidades, setReqstEspecialidades] = useState()
    const [funcionarios, setFuncionarios] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [showContFiltros, setShowContFiltros] = useState(false)
    const [nomeProcurado, setNomeProcurado] = useState({
        nome: '',
        is: false
    })
    const [filtros, setFiltros] = useState({
        nome: {
            value: 'default',
            is: false
        },
        cargo: {
            value: 'default',
            is: false
        },
        especialidade: {
            value: 'default',
            is: false
        },
        disponivel: {
            value: 'default',
            is: false
        },
        ativo: {
            value: 'default',
            is: false
        },
        qtd: 15
    })
    //  Testando outro layout da listagem de funcionarios
    const testeLayout = false

    const handleEditClick = (idFuncionario) => {
        navigate(`/funcionario?id=${idFuncionario}`)
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
    const converterEspecs = (idEspec) => {
        let especialidade = especialidades.find(espec => espec.id == idEspec)
        const [cor1, cor2] = especialidade.cor.split('/')
        return (
            <div className='skillsFunc' key={especialidade.id}
                style={{
                        borderColor: cor2,
                        backgroundColor: cor1,
                        color: cor2
                }}
            >
                {especialidade.nome}
            </div>
        )
    }
    const verEspecialidades = (idFuncionario) => {
        const contato = document.getElementById(`contSkillsFunc${idFuncionario}`)
        const img = document.getElementById(`imgSetaSkillsFunc${idFuncionario}`)
            if (contato.classList == 'containerSkillsFunc skillsFechado') {
            contato.classList = "containerSkillsFunc skillsAberto"
            img.src = Up
        } else {
            contato.classList = "containerSkillsFunc skillsFechado"
            img.src = Down
        }
    }
    const handleChangeFilters = (value, field) => {
        field=='nome' ? null : console.log("Debbug filtro " + value + ' ' + field)
        setFiltros(prevState => ({
            ...prevState,
            [field]: {
                value,
                is: (value=='' || value=='default'? false : true)
            },
        }))
    }
    const handleChangeQTD = (value) => {
        setFiltros(prevState => ({
            ...prevState,
            qtd: value
        }))
        fetchFuncionarios(0)
    }
    const changePage = (current, pageSize) => {
        fetchFuncionarios(current - 1)
    }
    // TODO [ACESS] implementar func de apagar todo o campo da pesquisa
    const clearProcurarNome = () => {
        setFiltros(prevState => ({
            ...prevState,
            nome: {
                value: null,
                is: false
            },
        }))
    }
    const handleChangeContFiltros = () => {
        setShowContFiltros(!showContFiltros)
    }
    const handleAplicarFiltros = () => {
        console.log('Aplicando filtros:')
        console.warn(filtros)
        fetchFuncionarios(0)
        setShowContFiltros(false)
    }
    const handleLimparFiltros = () => {
        setFiltros({
            nome: {
                value: 'default',
                is: false
            },
            cargo: {
                value: 'default',
                is: false
            },
            especialidade: {
                value: 'default',
                is: false
            },
            disponivel: {
                value: 'default',
                is: false
            },
            ativo: {
                value: 'default',
                is: false
            },
            qtd: 15
        })
        setTimeout(() => {
            fetchFuncionarios(0)
        }, 1500)
    }
    const handlePesquisarNome = () => {
        fetchFuncionarios(0)
    }
    const fetchEspecialidades = async () => {
        try {
            const response = await getEspecialidades()
            setReqstEspecialidades(response)
            setEspecialidades(response.data.content)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
            return
        }
    }
    const fetchFuncionarios = async (pagina) => {
        try {
            const result = await getPageFuncionarios(pagina, filtros)
            setReqstFuncionarios(result)
            setFuncionarios(result.data.content)
            console.warn(result)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            filtros ? fetchFuncionarios(0) : ''
            fetchEspecialidades()
        }
        fetchData()
    }, [])
    return(
        <>
        {
        !funcionarios ? '' :
        <div id='contFiltros'>
            
            <div id='contPesqFunc'>
                <input type="text" 
                    value={filtros.nome.value == 'default' ? '' : filtros.nome.value}
                    onChange={(e) => handleChangeFilters(e.target.value, "nome")}
                />
                <button onClick={handlePesquisarNome}>
                    <SearchOutlined style={{color: '#fcd8b9'}}/>
                </button>
            </div>
            {/* <Search
                size='small'
                placeholder={"procurar funcionário"}
                onSearch={procurarPorNome}
                allowClear
                onClear={clearProcurarNome}
                addonAfter
                status=''
                
                style={{
                    display: 'none',
                    width: 200,
                }}
                /> */}
            <Button 
                size='small'
                type="text" 
                icon={<FilterFilled />}  
                iconPosition={'end'}
                onClick={handleChangeContFiltros}
            >
                Filtros
            </Button>
        </div>
        }
        {
        testeLayout ? 
        <div id='layoutMobile'>
        {
            !funcionarios ? 
            <Skeleton/> :
            funcionarios.map(funcionario => (
                <div id={`funcionario${funcionario.id}`} className='funcs skillsFechado' key={funcionario.id}>
                    <div className='infosFunc'>
                        <div className='nomeFunc'>
                            <span>Nome: </span>
                            {funcionario.primeiro + ' ' + funcionario.ultimo}
                        </div>
                        <div className='cellFunc'>
                            <span>Cel: </span>
                            {funcionario.celular}
                        </div>
                        <div className='ultAtvFunc'>
                            <span>Ultima atividade: </span>
                            {converterDtHr(funcionario.ultimaAtividade)}
                        </div>
                        <div className='cargoFunc'>
                            <span>Cargo: </span>
                            {funcionario.cargo}
                        </div>
                        <div className='statusFunc'>
                            <span>Status: </span>
                            {
                                funcionario.disponivel
                                    ? 'disponível'
                                    : 'indisponível'
                            }
                        </div>
                    </div>
                    <div className='editFunc' onClick={() => handleEditClick(funcionario.id)}>
                        <img className='imgEditFunc' src={Edit} alt="editar"/>
                    </div>
                </div>
            ))
        }
        </div> 
        :
        <div id="contListFuncs">
        <table id='listFuncs'>
        <thead>
                <tr id='titleList'>
                    <th className='nomeTitle cl1'>nome</th>
                    <th className='cellTitle cl2'>celular</th>
                    <th className='ultAtvTitle cl3'>ultima atividade</th>
                    <th className='cargoTitle cl4'>cargo</th>
                    <th className='statusTitle cl5'>status</th>
                    <th className='cl6'></th>
                    <th className='cl7'></th>
                </tr>
        </thead>
        <tbody className='tbody'>
            {
                !funcionarios ? 
                <tr>
                    <td colSpan='6'>
                    <Loading/>
                    </td>
                </tr>
                :
                funcionarios.map(funcionario => (
                    <tr id={`funcionario${funcionario.id}`} className='funcs' key={funcionario.id}>
                        <td className='nomeFunc cl1'>
                            {funcionario.primeiro + ' ' + funcionario.ultimo}
                        </td>
                        <td className='cellFunc cl2'>
                            {funcionario.celular}
                        </td>
                        <td className='ultAtvFunc cl3'>
                            {converterDtHr(funcionario.ultimaAtividade)}
                        </td>
                        <td className='cargoFunc cl4'>
                            {funcionario.cargo}
                        </td>
                        <td className='statusFunc cl5'>
                            {
                                funcionario.disponivel
                                    ? 'disponível'
                                    : 'indisponível'
                            }
                        </td>
                        {/* 
                            TODO [FUNC] Deixar só a seta pra baixo, expandido e mostrando as opções de :
                                Editar funcionario (base)
                                Mostrar Especialidades (base e ADM)
                        */}
                        <td className='setaSkillsFunc cl6'
                        onClick={() => verEspecialidades(funcionario.id)}>
                            <img id={`imgSetaSkillsFunc${funcionario.id}`} className='imgSetaSKills' src={Down} alt="ver especialidades"/>
                        </td>
                        <td className='editFunc cl7' onClick={() => handleEditClick(funcionario.id)}>
                            <img className='imgEditFunc' src={Edit} alt="editar"/>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </table>
        </div>
        }
        <div className='paginacao'>
            {
                !reqstFuncionarios ? '' :
                // renderPaginas()
                <Pagination 
                    defaultCurrent={1} 
                    total={reqstFuncionarios.data.totalPages}
                    disabled={reqstFuncionarios.data.totalPages == 1}
                    pageSize={1}
                    responsive
                    showSizeChanger={false}
                    onChange={changePage}
                    showTitle={false}
                    />
            }
        </div>
        {/* <div id={`contSkillsFunc${funcionario.id}`} className='containerSkillsFunc skillsFechado'>
            {
                !especialidades ? 'carregando...' :
                funcionario.especialidades.map(especID => (
                    converterEspecs(especID)
                ))
            }
        </div> */}
        {/*
            showContFiltros && (
                <div id='contFiltros'>
                    <div id='headerContFiltros'>
                    <h2>Filtros</h2>
                    </div>
                    <div id='subContFiltros'>
                        <div id='contCargoFiltro'>
                            <label>Cargo: </label>
                            <select 
                                value={filtros?.cargo.value}
                                onChange={(e)=> handleChangeFilters(e.target.value, 'cargo')}
                                >
                                <option value="default">Todos</option>
                                <option value="TECNICO">Técnicos</option>
                                <option value="BASE">Base</option>
                                <option value="ADM">ADM</option>
                                <option value="DEV">Dev</option>
                            </select>
                        </div>
                        <div id='contEspecFiltro'>
                            <label>Especialidade: </label>
                            <select
                                value={filtros?.especialidade.value}
                                onChange={(e)=> handleChangeFilters(e.target.value, 'especialidade')} 
                                >
                            {
                                especialidades && [
                                    <option key="default" value="default">Todos</option>,
                                    ...especialidades.map(espec => (
                                        <option key={espec.id} value={espec.id}>{espec.nome}</option>
                                    ))
                                ]
                            }
                            </select>
                        </div>
                        <div id='contDispFiltro'>
                            <label>Disponibilidade: </label>
                            <select
                                value={filtros?.disponivel.value}
                                onChange={(e)=> handleChangeFilters(e.target.value, 'disponivel')}
                                >
                                <option value="default">Todos</option>
                                <option value="true">Disponíveis</option>
                                <option value="false">Indisponíveis</option>
                            </select>
                        </div>
                        {
                            cargo=='ADM'|| cargo=='DEV' ? 
                            <div id='contAtivoFiltro'>
                                <label>Funcionarios ativos: </label>
                                <select
                                    value={filtros?.ativo.value}
                                    onChange={(e)=> handleChangeFilters(e.target.value, 'ativo')}
                                    >
                                    <option value="default">Todos</option>
                                    <option value="true">Ativos</option>
                                    <option value="false">Inativos</option>
                                </select>
                            </div> : ''
                        }
                        <div id='contQTDFiltro'>
                            <label>Quantidade: </label>
                            <select 
                                id="selectQTD"
                                value={filtros?.qtd}
                                onChange={(e) => handleChangeQTD(e.target.value)}
                                >
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                            </select>
                        </div>
                    </div>
                    <div id='footerContFiltros'>
                        <button 
                            key='cancelar'
                            onClick={handleChangeContFiltros}
                            >
                            Cancelar
                        </button>,
                        <button 
                            key='filtar'
                            onClick={handleAplicarFiltros}
                            >
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            )
        */}
        {/* <Modal 
            title="Filtros"
            open={showContFiltros}
            onOk={handleAplicarFiltros}
            onCancel={handleChangeContFiltros}
            footer={[
                <button 
                    key='cancelar'
                    onClick={handleChangeContFiltros}
                    >
                    Cancelar
                </button>,
                <button 
                    key='filtar'
                    onClick={handleAplicarFiltros}
                    >
                    Aplicar filtros
                </button>
            ]}
            >
            <div className='contModal'>
                <div id='contCargoFiltro'>
                    <label>Cargo: </label>
                    <select 
                        value={filtros?.cargo.value}
                        onChange={(e)=> handleChangeFilters(e.target.value, 'cargo')}
                        >
                        <option value="default">Todos</option>
                        <option value="TECNICO">Técnicos</option>
                        <option value="BASE">Base</option>
                        <option value="ADM">ADM</option>
                        <option value="DEV">Dev</option>
                    </select>
                </div>
                <div id='contEspecFiltro'>
                    <label>Especialidade: </label>
                    <select
                        value={filtros?.especialidade.value}
                        onChange={(e)=> handleChangeFilters(e.target.value, 'especialidade')} 
                        >
                    {
                        especialidades && [
                            <option key="default" value="default">Todos</option>,
                            ...especialidades.map(espec => (
                                <option key={espec.id} value={espec.id}>{espec.nome}</option>
                            ))
                        ]
                    }
                    </select>
                </div>
                <div id='contDispFiltro'>
                    <label>Disponibilidade: </label>
                    <select
                        value={filtros?.disponivel.value}
                        onChange={(e)=> handleChangeFilters(e.target.value, 'disponivel')}
                        >
                        <option value="default">Todos</option>
                        <option value="true">Disponíveis</option>
                        <option value="false">Indisponíveis</option>
                    </select>
                </div>
                {
                    cargo=='ADM'|| cargo=='DEV' ? 
                    <div id='contAtivoFiltro'>
                        <label>Funcionarios ativos: </label>
                        <select
                            value={filtros?.ativo.value}
                            onChange={(e)=> handleChangeFilters(e.target.value, 'ativo')}
                            >
                            <option value="default">Todos</option>
                            <option value="true">Ativos</option>
                            <option value="false">Inativos</option>
                        </select>
                    </div> : ''
                }
                <div id='contQTDFiltro'>
                    <label>Quantidade: </label>
                    <select 
                        id="selectQTD"
                        value={filtros?.qtd}
                        onChange={(e) => handleChangeQTD(e.target.value)}
                        >
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
                </div>
            </div>
        </Modal> */}
        </>

    )
}
export default ListFuncionarios