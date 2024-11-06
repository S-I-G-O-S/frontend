// Funções de requisições
import {getFuncionarios, getPageFuncionarios} from '../../services/funcionariosAPI.js'
import {getEspecialidades} from '../../services/especialidadesAPI.js'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Skeleton, Input, Select } from 'antd'
const { Search } = Input

import '../../styles/funcionarios.css'
import Edit from '../../assets/edit-text.png'
import Down from '../../assets/dark/down.png' 
import Up from '../../assets/dark/up.png'
import Loading from './../public/Loading.jsx'

function ListFuncionarios() {
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
    const [procurarNome, setProcurarNome] = useState({
        nome: '',
        is: false
    })
    const [filtros, setFiltros] = useState({
        nome: null,
        cargo: null,
        especialidade: null,
        disponivel: null,
        ativo: null,
        qtd: 15
    })
    const [pag, setPag] = useState(0)
    //  Testando outro layout da listagem de funcionarios
    const testeLayout = false

    const handleEditClick = (idFuncionario) => {
        navigate(`/funcionario?id=${idFuncionario}`);
    }
    const converterDtHr = (dataHora) => {
        const data = new Date(dataHora)
        // Formata para o estilo desejado
        const dataLegivel = data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        return dataLegivel
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
    const fetchEspecialidades = async () => {
        try {
            const response = await getEspecialidades()
            setReqstEspecialidades(response)
            setEspecialidades(response.data.content)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchFuncionarios = async (pagina) => {
        try {
            const result = await getPageFuncionarios(pagina, filtros)
            setReqstFuncionarios(result)
            setFuncionarios(result.data.content)
            console.warn(result)
        } catch (error) {
            setErro(error.message)
        }
    }
    const changePage = (current, pageSize) => {
        fetchFuncionarios(current - 1)
    }
    const procurarPorNome = (value, _e, info) => {
        setProcurarNome({
            nome: value,
            is: true
        })
        console.log(info?.source, value)
    }
    useEffect(() => {
        const fetchData = async () => {
            fetchFuncionarios(0, filtros)
            fetchEspecialidades()
        }
        fetchData()
    }, [])
    return(
        <>
        <div id='contFiltros'>
            <div id='contQTD'>
                <label>Quantidade: </label>
                <Select
                    defaultValue={15}
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
            <div>
                
            </div>
            <div id='contPesq'>
            {/* TODO ver uma forma de limpar o value ao pesquisar*/}
            {
                <Search
                    placeholder={procurarNome.is ? 'procurando funcionário...' : "procurar funcionário"}
                    onSearch={procurarPorNome}
                    allowClear
                    addonAfter
                    loading={procurarNome.is}
                    status=''
                    
                    style={{
                        width: 200,
                    }}
                    />
                    
            }
            </div> 
        </div>
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
                                funcionario.isDisponivel
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
                <tr id='titleList'>
                    <th className='nomeTitle cl1'>nome</th>
                    <th className='cellTitle cl2'>celular</th>
                    <th className='ultAtvTitle cl3'>ultima atividade</th>
                    <th className='cargoTitle cl4'>cargo</th>
                    <th className='statusTitle cl5'>status</th>
                    <th className='cl6'></th>
                    <th className='cl7'></th>
                </tr>
            {
                !funcionarios ? 
                <Skeleton/>:
                funcionarios.map(funcionario => (
                    <tr id={`funcionario${funcionario.id}`} className='funcs skillsFechado' key={funcionario.id}>
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
                                funcionario.isDisponivel
                                    ? 'disponível'
                                    : 'indisponível'
                            }
                        </td>
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
        </table>
        </div>
        }
        <div className='paginacao'>
            {
                !reqstFuncionarios ? '' :
                // renderPaginas()
                <Pagination 
                    defaultCurrent={1} 
                    total={reqstFuncionarios.data.page.totalPages}
                    disabled={reqstFuncionarios.data.page.totalPages == 1}
                    pageSize={1}
                    responsive
                    showSizeChanger={false}
                    onChange={changePage}
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
        </>
    )
}
export default ListFuncionarios