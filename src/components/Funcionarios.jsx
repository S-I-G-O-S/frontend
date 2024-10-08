import '../styles/funcionarios.css'
import Nav from './public/Nav'
import Header from './public/Header'
import Options from '../assets/options.png'
import Edit from '../assets/edit-text.png'
import Down from '../assets/dark/down.png' 
import Up from '../assets/dark/up.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'

// TODO Mudar a coluna "Status" para "disponivel"
// TODO O carregamento das especialidades será diferente do "funcionarios"
// TODO A relação de "funcionario" X "especialidade" será assincrona e separada
// TODO tratamento para evitar espaços no começo e no final dos nomes

//https://community.revelo.com.br/react-query-um-guia-pratico/



function Funcionarios() {
    const nomeCompleto = "Leonardo Martinez Nunes Barbosa Silva Almeida";
    const nomes = nomeCompleto.split(" "); // separa a string em um array
    const primeiroNome = nomes[0]; // primeiro elemento do array
    const ultimoNome = nomes[nomes.length - 1]; // último elemento do array
    const resultado = `${primeiroNome} ${ultimoNome}`

    const [nome, setNome] = useState(resultado)
    const navigate = useNavigate();

    const goToEspecialidades = () => {
        navigate(`/especialidades`)
    }
    const handleCreateClick = () => {
        navigate(`/funcionario`)
    }
    const handleEditClick = (idFuncionario) => {
        navigate(`/funcionario?id=${idFuncionario}`);
    };
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
    return (
        <div id='pageFuncionarios'>
        <Header></Header>
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
                    <div className='funcs'>
                        <div className='cardFunc' >
                            <div className='nomeFunc'>
                                Leonardo Almeida
                            </div>
                            <div className='cellFunc'>
                                (13) 123456-7891
                            </div>
                            <div className='ultAtvFunc'>
                                há 3 horas atras
                            </div>
                            <div className='cargoFunc'>tecnico</div>
                            <div className='statusFunc'>disponivel</div>
                            <div className='setaSkillsFunc'
                            onClick={() => verEspecialidades(1)}>
                                <img id='imgSetaSkillsFunc1' src={Down} alt="ver especialidades"/>
                            </div>
                            <div className='editFunc' onClick={() => handleEditClick(1)}>
                                <img src={Edit} alt="editar"/>
                            </div>
                        </div>
                        <div id='contSkillsFunc1' className='containerSkillsFunc skillsFechado'>
                            <div className='skillsFunc skill1'>portão</div>
                            <div className='skillsFunc skill2'>camera</div>
                            <div className='skillsFunc skill3'>escada rolante</div>
                            <div className='skillsFunc skill4'>interfone</div>
                        </div>
                    </div>
                    <div className='funcs'>
                        <div className='cardFunc' >
                            <div className='nomeFunc'>
                                {nome}
                            </div>
                            <div className='cellFunc'>
                                (13) 123456-7891
                            </div>
                            <div className='ultAtvFunc'>
                                há 3 horas atras
                            </div>
                            <div className='cargoFunc'>tecnico</div>
                            <div className='statusFunc'>disponivel</div>
                            <div className='setaSkillsFunc'
                            onClick={() => verEspecialidades(2)}>
                                <img id='imgSetaSkillsFunc2' src={Down} alt="ver especialidades"/>
                            </div>
                            <div className='editFunc' onClick={() => handleEditClick(2)}>
                                <img src={Edit} alt="editar"/>
                            </div>
                        </div>
                        <div id='contSkillsFunc2' className='containerSkillsFunc skillsFechado'>
                            <div className='skillsFunc skill1'>portão</div>
                            <div className='skillsFunc skill2'>camera</div>
                            <div className='skillsFunc skill3'>escada rolante</div>
                            <div className='skillsFunc skill4'>interfone</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </div>
    )
}

export default Funcionarios