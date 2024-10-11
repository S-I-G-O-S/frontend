import '../styles/funcionarios.css'
import Nav from './public/Nav'
import Header from './public/Header'
import Options from '../assets/options.png'
import Edit from '../assets/edit-text.png'
import Down from '../assets/dark/down.png' 
import Up from '../assets/dark/up.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

// TODO O carregamento das especialidades será diferente do "funcionarios"
// TODO tratamento para evitar espaços no começo e no final dos nomes

//https://community.revelo.com.br/react-query-um-guia-pratico/

/* ****************************************************************** 
/* ****************************************************************** */
function Funcionarios() {
    const [nome, setNome] = useState()
    const [reqstFuncionarios, setReqstFuncionarios] = useState([])
    const [reqstEspecialidades, setReqstEspecialidades] = useState([])
    // const [funcionarios, setFuncionarios] = useState(reqstFuncionarios.content)
    const [funcionarios, setFuncionarios] = useState([
        {
            id: "1",
            nome: "João Almeida da Silva",
            primeiroNome: "João",
            ultimoNome: "Silva",
            cpf: "99999999999",
            email: "bR9kS@example.com",
            celular: "(13) 99999-9999",
            cargo: "tecnico",
            isDisponivel: true,
            isAtivo: true,
            ultimaAtividade: "2022-01-01",
            endereco: [
                {
                    cep: "99999-999",
                    logradouro: "Rua dos Bobos",
                    numero: "0",
                    bairro: "Centro",
                    cidade: "São Paulo",
                    uf: "SP",
                    complemento: "apto. 123",
                }
            ],
            especialidades: [1],
        },
    ])
    //const [especialidades, setEspecialidades] = useState(reqstEspecialidades.content)
    const [especialidades, setEspecialidades] = useState([
        {
            "id": 1,
            "nome": "Especialidade 1",
            "descricao": "descrição 1",
            "cor": "#b80a0a/#ffffff",
            "servicos": [
                {
                    "id": 1,
                    "nome": "Concerto de portão (marca famosa 1)",
                    "descricao": "Imagine uma descrição boa deste serviço aqui"
                },
                {
                    "id": 2,
                    "nome": "Concerto de portão (marca famosa 2)",
                    "descricao": "Imagine uma descrição boa deste serviço aqui"
                },
                {
                    "id": 3,
                    "nome": "Concerto de portão (marca famosa 3)",
                    "descricao": "Imagine uma descrição boa deste serviço aqui"
                }
            ]
        },
    ])
    const [error, setError] = useState()

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
    const getFuncionarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/funcionarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setReqstFuncionarios(data)
            } else {
                const errorData = await response.json()
                setError(`Erro: ${errorData.message}`)
            }
        } catch (error) {
            setError(`Erro de conexão: ${error.message}`)
        }
    }
    const getEspecialidades = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/especialidades', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setReqstEspecialidades(data)
            } else {
                const errorData = await response.json()
                setError(`Erro: ${errorData.message}`)
            }
        } catch (error) {
            setError(`Erro de conexão: ${error.message}`)
        }
    }
    useEffect(() => {
        // getFuncionarios()
        // getEspecialidades()
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
                        funcionarios
                            .filter(funcionario => funcionario.isAtivo == true)
                            .map(funcionario => (
                                <div id={`funcionario${funcionario.id}`} className='funcs skillsFechado' key={funcionario.id}>
                                    <div className='cardFunc' >
                                        <div className='nomeFunc'>
                                            {funcionario.primeiroNome + ' ' + funcionario.ultimoNome}
                                        </div>
                                        <div className='cellFunc'>
                                            {funcionario.celular}
                                        </div>
                                        <div className='ultAtvFunc'>
                                            {funcionario.ultimaAtividade}
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