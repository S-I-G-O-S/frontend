import config from '../services/devConfig.js'
// Dados simulados
import simuGetEspecialidades from '../dadosSimulados/especialidades.js'
import simuGetFuncionarios from '../dadosSimulados/funcionarios.js'

// Funções de requisições
import {getFuncionarios} from '../services/funcionariosAPI.js'
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

// TODO O carregamento das especialidades será diferente do "funcionarios"
// TODO tratamento para evitar espaços no começo e no final dos nomes

//https://community.revelo.com.br/react-query-um-guia-pratico/
function Funcionarios() {
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
    const [reqstEspecialidades, setReqstEspecialidades] = useState()
    const [funcionarios, setFuncionarios] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [erro, setErro] = useState()

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
            const data = await getEspecialidades()
            //setReqstEspecialidades(data)
            setEspecialidades(data.content)
            console.log(data.content)
        } catch (error) {
            setErro(error.message)
        }
    }
    const fetchFuncionarios = async () => {
        try {
            const data = await getFuncionarios()
            ///setReqstFuncionarios(data)
            setFuncionarios(data.content)
            console.log(data.content)
        } catch (error) {
            setErro(error.message)
        }
    }
    useEffect(() => {
        console.log(erro)   
    }, [erro])

    useEffect(() => {
        const fetchData = async () => {
            if (config.simularDados) {
                setReqstEspecialidades(simuGetEspecialidades)
                setReqstFuncionarios(simuGetFuncionarios)

                setFuncionarios(simuGetFuncionarios.content)
                setEspecialidades(simuGetEspecialidades.content)
            } else {
                fetchFuncionarios()
                fetchEspecialidades()
            }
        }
        fetchData()
    }, [])

    return (
        <div id='pageFuncionarios'>
        <Header titulo={"Funcionários"}></Header>
        <Nav></Nav>
        <main id='mainFuncionarios'>
            <section id='secList'>
                <div id='containerH2Criar'>
                    <h2>Funcionários</h2>
                    <div id='contEspecsNovoFunc'>
                        <button className='btt' onClick={() => goToEspecialidades()}>
                                Especialidades
                        </button>
                        <button className='btt'
                        onClick={() => handleCreateClick()}>Novo Funcionário</button>
                    </div>
                </div>
                <div id='titleList'>
                    <div className='nomeTitle'>nome</div>
                    <div className='cellTitle'>celular</div>
                    <div>Ultima atividade</div>
                    <div className='cargoTitle'>cargo</div>
                    <div className='statusTitle'>status</div>
                </div>
                <div id='listFuncs'>
                    {
                        !funcionarios ? "carregando..." :
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
            </section>
        </main>
        </div>
    )
}

export default Funcionarios