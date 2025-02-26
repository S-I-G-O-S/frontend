// Funções de requisições
import { getPageFuncionarios } from '@backend/funcionariosAPI.js'
import { getEspecialidades } from '@backend/especialidadesAPI.js'
import { getCookie } from '@services/cookies.js'

// Estilização
import '@styles/funcionarios.css'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

import { Pagination, Skeleton, Dropdown } from 'antd'
import { EditFilled, OrderedListOutlined, CloseOutlined, FilterFilled, SearchOutlined, DownOutlined } from '@ant-design/icons'

import Nav from '@components/public/Nav.jsx'
import Edit from '@assets/edit-text.png'
import Down from '@assets/dark/down.png' 
import Up from '@assets/dark/up.png'
import Loading from '@components/public/Loading.jsx'
import { getUsuarioContext } from '../context/UsuarioContext';

// TODO Substituir Dropdown por abrir uma modal com informações do usuario e link para a pag de edição do funcionario
//  SÓ O ADM E O PROPRIO TECNICO PODEM EDITAR O FUNCIONARIO
function Funcionarios() {
    const navigate = useNavigate()
    const { usuario } = getUsuarioContext()
    // const [usuario, setUsuario] = useState(() => {
    //     const cookieUsuario = getCookie('usuario')
    //     return cookieUsuario ? cookieUsuario : ''
    // })
    const [loadingRows, setLoadingRows] = useState(false)
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
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
    const goToEspecialidades = () => {
        navigate(`/especialidades`)
    }
    const handleCreateClick = () => {
        navigate(`/funcionario`)
    }
    const handleEditClick = (idFuncionario) => {
        navigate(`/funcionario?id=${idFuncionario}`)
    }
    const converterDtHr = (dataHora) => {
        if (!dataHora) {
            return '--/--/----, --:--'
        }
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
    const converterCargo = (cargo) => {
        var cargoConvertido
        switch(cargo) {
            case 'TECNICO': 
                cargoConvertido = 'Técnico'
                break;
            case 'BASE': 
                cargoConvertido = 'Base'
                break;
            case 'DEV': 
                cargoConvertido = 'Dev'
                break;
            case 'ADM': 
                cargoConvertido = 'ADM'
                break;
            default: 
                cargoConvertido = 'erro'
                break;
        }
        return cargoConvertido
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
    const listEspecialidades = (ids) => {
        return ids.map((id) => {
            const especialidade = especialidades.find((esp) => esp.id === id)
            if (especialidade) {
            return {
                key: especialidade.id,
                label: especialidade.nome
            }
            }
            return null;
        }).filter(Boolean)
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
        const result = await getEspecialidades()
        if (!result.success)  {
            console.error(error.message)
            return
        }
        setEspecialidades(result.response.data.content)
        console.warn(result.response)
    }
    const fetchFuncionarios = async (pagina) => {
        setLoadingRows(true)
        const result = await getPageFuncionarios(pagina, filtros)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setReqstFuncionarios(result.response)
        setFuncionarios(result.response.data.content)
        console.warn(result.response )
        setLoadingRows(false)
    }
    useEffect(() => {
        console.clear()
        const fetchData = async () => {
            filtros ? fetchFuncionarios(0) : ''
            fetchEspecialidades()
        }
        fetchData()
        // setTimeout(() => {
        //     fetchData()
        // }, 1000)
    }, [])

    return (
        <div id='pageFuncionarios' className='paginas'>
        {/* <Header titulo={"Funcionarios"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id='mainFuncionarios'>
            {
                (usuario.cargo=='BASE' || usuario.cargo=="ADM" || usuario.cargo=="DEV") &&
                <section id='secList'>
                    <div id='contEspecsNovoFunc'>
                        <button className='btt' onClick={() => goToEspecialidades()}>
                                Especialidades e Serviços
                        </button>
                        {   
                        usuario.cargo == 'ADM' || usuario.cargo == 'DEV' ?
                        <button className='btt'
                            onClick={() => handleCreateClick()}>Novo Funcionário</button>
                        : ''
                        } 
                    </div>
                    {/* <ListFuncionarios cargo={usuario.cargo}></ListFuncionarios> */}
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
                        <button id="bttFiltros" onClick={handleChangeContFiltros}>
                            <p>
                                filtros
                            </p>
                            <FilterFilled />
                        </button>
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
                                {   // Só mostrar para ADM e DEV
                                usuario.cargo=='ADM' || usuario.cargo=='DEV' ?
                                <th className='cl6'></th> : ''
                                }
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {
                                loadingRows || !funcionarios ? 
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
                                            {converterCargo(funcionario.cargo)}
                                        </td>
                                        <td className='statusFunc cl5'>
                                            {
                                                funcionario.disponivel
                                                    ? 'disponível'
                                                    : 'indisponível'
                                            }
                                        </td>
                                        {   // Só mostrar para ADM e DEV
                                        usuario.cargo=='ADM' || usuario.cargo=='DEV' ?
                                        <td className='setaSkillsFunc cl6'>
                                        { 
                                            especialidades &&
                                            <Dropdown
                                                placement='bottom'
                                                menu={{
                                                    items: [
                                                        {
                                                            key: 1,
                                                            label: (
                                                                <div onClick={() => handleEditClick(funcionario.id)}>editar</div>
                                                            ),
                                                            icon: <EditFilled style={{color: '#26110D'}}/>
                                                        },
                                                        {
                                                            key: '2',
                                                            label: 'especialidades',
                                                            children: listEspecialidades(funcionario.especialidades),
                                                            icon: <OrderedListOutlined style={{color: '#26110D'}}/>
                                                        },
                                                    ],
                                                    style: {
                                                        backgroundColor: '#F2E8DF',
                                                        fontWeight: '500'
                                                    }
                                                }}
                                                overlayStyle={{
                                                    border: "0.1rem solid #26110D",
                                                    borderRadius: '0.5rem'
                                                }}
                                            >
                                                {/* <img id={`imgSetaSkillsFunc${funcionario.id}`} className='imgSetaSKills' src={Down} alt="ver esp :ecialidades"/> */}
                                                <DownOutlined style={{color: '#26110D'}}/>
                                            </Dropdown>
                                        }
                                        </td> 
                                        : ''
                                        }
                                        {/* <td className='editFunc cl7' onClick={() => handleEditClick(funcionario.id)}>
                                            <img className='imgEditFunc' src={Edit} alt="editar"/>
                                        </td> */}
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
                </section>
            }
        </main>
        {
        showContFiltros && (
        <div id='shadowBG'>
            <section id='secFiltros'>
                <div id='headerFiltros'>
                    <h2>Filtros</h2>
                    <div 
                        id='closeModel'
                        onClick={handleChangeContFiltros}>
                    <CloseOutlined />
                    </div>
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
                        usuario.cargo=='ADM'|| usuario.cargo=='DEV' ? 
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
                <div id='footerFiltros'>
                    <button 
                        id='bttCancelar'
                        key='cancelar'
                        onClick={handleChangeContFiltros}
                        >
                        Cancelar
                    </button>
                    <button
                        id='bttAplicar'
                        key='filtar'
                        onClick={handleAplicarFiltros}
                        >
                        Aplicar filtros
                    </button>
                </div>
            </section>
        </div>
        )
        }
        </div>
    )
}

export default Funcionarios