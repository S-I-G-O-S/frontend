// Funções de requisições
import {getPageFuncionarios} from '../../services/funcionariosAPI.js'
import {getEspecialidades} from '../../services/especialidadesAPI.js'

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
import { color } from 'storybook/internal/theming';

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
    const [especsFiltro, setEspecsFiltro] = useState({})
    const [filtros, setFiltros] = useState({
        nome: {
            valor: '',
            is: false
        },
        cargo: {
            valor: '',
            is: false
        },
        especialidade: {
            valor: '',
            is: false
        },
        disponivel: {
            valor: '',
            is: false
        },
        ativo: {
            valor: '',
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
        setFiltros(prevState => ({
            ...prevState,
            [field]: {
                value,
                is: (value == '' ? false : true)
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
    useEffect(() => {
        
    }, [filtros.qtd])
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
        fetchFuncionarios(0)
        setShowContFiltros(false)
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

    useEffect(() => {
        if(especialidades) {
            setEspecsFiltro(especialidades.map(espec => (
                {
                    label: espec.nome, 
                    value: espec.id
                }
            )))
        }
        console.table(especsFiltro)
    }, [especialidades])
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
            fetchFuncionarios(0)
            fetchEspecialidades()
        }
        fetchData()
    }, [])
    return(
        <>
        {
        !funcionarios ? '' :
        <div id='contFiltros'>
            <div id='contQTD'>
                <label>Quantidade: </label>
                <Select
                    size='small'
                    defaultValue={15}
                    onChange={handleChangeQTD}
                    options={[
                    { 
                        value: 15, label: 15 
                    },
                    {
                        value: 30, label: 30
                    },
                    {
                        value: 40, label: 40
                    }
                    ]} 
                />
            </div>
            <div id='contPesqFunc'>
                <input type="text" 
                    value={filtros.nome.valor}
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
        <Modal 
            title="Filtros"
            open={showContFiltros}
            onOk={handleAplicarFiltros}
            onCancel={handleChangeContFiltros}
            footer={[
                <Button 
                    key='back'
                    type='default'
                    onClick={handleChangeContFiltros}
                    >
                    Cancelar
                </Button>,
                <Button 
                    key='submit'
                    type='default'
                    onClick={handleAplicarFiltros}
                    >
                    Aplicar filtros
                </Button>
            ]}
            >
            <div className='contModal'>
            
            <div>
                <label>Cargo: </label>
                <Select
                    size={'small'}
                    defaultValue={'Todos'}
                    // TODO ajustar tamanho para n cortar toas as opções
                    onChange={() => handleChangeFilters('cargo')}
                    options={[
                    {
                        value: null, label: 'Todos'
                    },
                    { 
                        value: 'TECNICO', label: 'Técnico' 
                    },
                    {
                        value: 'BASE', label: 'Base'
                    },
                    {
                        value: 'ADM', label: 'ADM'
                    },
                    {
                        value: 'DEV', label: 'Dev'
                    }
                    ]} 
                />
            </div>
            <div>
                <label>Especialidade: </label>
                <Select
                    size={'small'}
                    allowClear
                    showSearch
                    placeholder='pesquisar especialidade'
                    optionFilterProp='label'
                    // onChange={null}
                    options={especsFiltro || {label: 'sem especialidades', value: 'null'}}
                />
            </div>
            <div>
                <label>Disponibilidade: </label>
                <Select
                    size={'small'}
                    defaultValue={'Todos'}
                    // TODO ajustar tamanho para n cortar toas as opções
                    onChange={() => handleChangeFilters('disponivel')}
                    options={[
                    {
                        value: null, label: 'Todos'
                    },
                    { 
                        value: true, label: 'Disponiveis' 
                    },
                    {
                        value: false, label: 'Indisponiveis'
                    }
                    ]} 
                />
            </div>
            {
                cargo=='ADM'|| cargo=='DEV' ? 
                <div>
                    <label>Funcionarios ativos: </label>
                    <Select
                        size={'small'}
                        defaultValue={'Ativos'}
                        // TODO ajustar tamanho para n cortar toas as opções
                        onChange={handleChangeQTD}
                        options={[
                        {
                            value: true, label: 'Ativos'
                        },
                        {
                            value: false, label: 'Inativos'
                        }
                        ]} 
                    />
                </div> : ''
            }
            </div>
        </Modal>
        </>

    )
}
export default ListFuncionarios