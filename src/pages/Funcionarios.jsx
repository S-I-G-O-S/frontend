// Funções de requisições
import { getPageFuncionarios } from '@backend/funcionariosAPI.js'
import { getEspecialidades } from '@backend/especialidadesAPI.js'

// Estilização
import '@styles/funcionarios.css'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

import { CloseOutlined, FilterFilled, SearchOutlined } from '@ant-design/icons'

import Nav from '@components/public/Nav.jsx'
import { getUsuarioContext } from '@context/UsuarioContext';
import Paginacao from '@components/public/Paginacao';
import ListFuncionarios from '@components/Funcionarios/ListFuncionarios';
import Loading from '@components/public/Loading.jsx'
import Filtros from '@components/Funcionarios/Filtros';
import { useAuth } from '@context/authContext';

//  SÓ O ADM E O PROPRIO TECNICO PODEM EDITAR O FUNCIONARIO
function Funcionarios() {
    const {checkAuth} = useAuth()
    const navigate = useNavigate()
    const { usuario } = getUsuarioContext()
    const [loadingRows, setLoadingRows] = useState(false)
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
    const [funcionarios, setFuncionarios] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [modalFiltros, setModalFiltros] = useState(false)
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
    const handleChangeFiltros = (value, field) => {
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
        setModalFiltros(!modalFiltros)
    }
    const handleAplicarFiltros = () => {
        console.log('Aplicando filtros:')
        console.warn(filtros)
        fetchFuncionarios(0)
        setModalFiltros(false)
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
            console.error(result.error)
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
        checkAuth()
        const fetchData = async () => {
            filtros ? fetchFuncionarios(0) : ''
            fetchEspecialidades()
        }
        fetchData()
    }, [])

    return (
        <div id='pageFuncionarios' className='paginas'>
        {/* <Header titulo={"Funcionarios"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id='mainFuncionarios'>
        {(usuario.cargo=='BASE' || usuario.cargo=="ADM" || usuario.cargo=="DEV") &&
            <section id='secList' className='section'>
                <div id='contEspecsNovoFunc'>
                    <button className='btt' onClick={() => navigate(`/servicos`)}>
                            Especialidades e Serviços
                    </button>
                    {   
                    usuario.cargo == 'ADM' || usuario.cargo == 'DEV' ?
                    <button className='btt'
                        onClick={() => navigate(`/funcionario`)}>Novo Funcionário</button>
                    : ''
                    } 
                </div>
                {
                !funcionarios ? '' :
                <div id='contFiltros'>
                    <div id='contPesqFunc'>
                        {/* FIXME Mudar para o compomente externo */}
                        <input type="text" 
                            value={filtros.nome.value == 'default' ? '' : filtros.nome.value}
                            onChange={(e) => handleChangeFiltros(e.target.value, "nome")}
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
                <div id="contListFuncs">
                <table id='listFuncs'>
                    <thead>
                        <tr id='titleList'>
                            <th className='nomeTitle cl1'>nome</th>
                            <th className='cellTitle cl2'>celular</th>
                            <th className='ultAtvTitle cl3'>ultima atividade</th>
                            <th className='cargoTitle cl4'>cargo</th>
                            <th className='statusTitle cl5'>status</th>
                            {/* <th className='cl6'>especialidades</th> */}
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                    {loadingRows ? (    
                        <tr>
                            <td colSpan='5'>
                                <Loading/>
                            </td>
                        </tr>
                        ) : (
                        <ListFuncionarios
                            funcionarios={funcionarios}
                            especialidades={especialidades}
                            cargo={usuario.cargo}
                        />

                    )}
                    </tbody>
                </table>
                </div>
                {funcionarios && 
                    <Paginacao
                        totalPages={reqstFuncionarios.data.totalPages}
                        changePage={changePage}
                    />
                }
            </section>
        }
        </main>
        {modalFiltros && (
            <div id='shadowBG'>
                <Filtros
                    filtros={filtros}
                    onChangeQTD={handleChangeQTD}
                    onChange={handleChangeFiltros}
                    onAplicar={handleAplicarFiltros}
                    onCancelar={() => setModalFiltros(false)}
                    especialidades={especialidades}
                    cargo={usuario.cargo}
                />
            </div>
        )}
        </div>
    )
}

export default Funcionarios