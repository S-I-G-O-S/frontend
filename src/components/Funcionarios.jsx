import config from '../services/devConfig.js'
// Dados simulados
import simuGetEspecialidades from '../dadosSimulados/especialidades.js'
import simuGetFuncionarios from '../dadosSimulados/funcionarios.js'

// Funções de requisições
import {getFuncionarios, getPageFuncionarios} from '../services/funcionariosAPI.js'
import {getEspecialidades} from '../services/especialidadesAPI.js'

// Estilização
import '../styles/funcionarios.css'
import Edit from '../assets/edit-text.png'
import Down from '../assets/dark/down.png' 
import Up from '../assets/dark/up.png'

import Nav from './public/Nav'
import Header from './public/Header'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Loading from './public/Loading.jsx'

// TODO tratamento para evitar espaços no começo e no final dos nomes

//https://community.revelo.com.br/react-query-um-guia-pratico/
function Funcionarios() {
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
    const [reqstEspecialidades, setReqstEspecialidades] = useState()
    const [funcionarios, setFuncionarios] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [erro, setErro] = useState()
    const [filtros, setFiltros] = useState({
        nome: null,
        cargo: null,
        especialidade: null,
        disponivel: null,
        ativo: null,
    })

    const navigate = useNavigate()
    const goToEspecialidades = () => {
        navigate(`/especialidades`)
    }
    const handleCreateClick = () => {
        navigate(`/funcionario`)
    }
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
    const handlePageClick = (pagina) => {
        fetchFuncionarios(pagina)
    }

    const renderPaginas = () => {
        const totalPages = reqstFuncionarios.data.page.totalPages
        let render = []
        for (let pags = 0; pags < totalPages; pags++) {
            render.push(
                <button 
                    key={pags} 
                    className="pagina-item"
                    onClick={() => handlePageClick(pags)}
                >
                    {pags + 1}
                </button>
            )
        }
        return render
    }

    useEffect(() => {
        const fetchData = async () => {
            fetchFuncionarios(0)
            fetchEspecialidades()
        }
        fetchData()
    }, [])

    return (
        <div id='pageFuncionarios'>
        <Header titulo={"Funcionários"}></Header>
        <Nav></Nav>
        <main id='mainFuncionarios'>
            <section id='secList'>
                <div id='contEspecsNovoFunc'>
                    <button className='btt' onClick={() => goToEspecialidades()}>
                            Especialidades e Serviços
                    </button>
                    <button className='btt'
                    onClick={() => handleCreateClick()}>Novo Funcionário</button>
                </div>
                <div id='titleList'>
                    <div className='nomeTitle'>nome</div>
                    <div className='cellTitle'>celular</div>
                    <div className='ultAtvTitle'>Ultima atividade</div>
                    <div className='cargoTitle'>cargo</div>
                    <div className='statusTitle'>status</div>
                </div>
                <div id='listFuncs'>
                    {
                        !funcionarios ? 
                        <Loading></Loading> :
                        funcionarios.map(funcionario => (
                            <div id={`funcionario${funcionario.id}`} className='funcs skillsFechado' key={funcionario.id}>
                                <div className='cardFunc' >
                                    <div className='nomeFunc'>
                                        {funcionario.primeiro + ' ' + funcionario.ultimo}
                                    </div>
                                    <div className='cellFunc'>
                                        {funcionario.celular}
                                    </div>
                                    <div className='ultAtvFunc'>
                                        {converterDtHr(funcionario.ultimaAtividade)}
                                    </div>
                                    <div className='cargoFunc'>
                                        {funcionario.cargo}
                                    </div>
                                    <div className='statusFunc'>
                                        {
                                            funcionario.isDisponivel
                                                ? 'disponível'
                                                : 'indisponível'
                                        }
                                    </div>
                                    <div className='setaSkillsFunc'
                                    onClick={() => verEspecialidades(funcionario.id)}>
                                        <img id={`imgSetaSkillsFunc${funcionario.id}`} src={Down} alt="ver especialidades"/>
                                    </div>
                                    <div className='editFunc' onClick={() => handleEditClick(funcionario.id)}>
                                        <img src={Edit} alt="editar"/>
                                    </div>
                                </div>
                                <div id={`contSkillsFunc${funcionario.id}`} className='containerSkillsFunc skillsFechado'>
                                    {
                                        !especialidades ? 'carregando...' :
                                        funcionario.especialidades.map(especID => (
                                            converterEspecs(especID)
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div id='contPagesFuncionarios' className='paginacao'>
                    {
                        !reqstFuncionarios ? '' :
                        renderPaginas()
                    }
                </div>
            </section>
        </main>
        </div>
    )
}

export default Funcionarios