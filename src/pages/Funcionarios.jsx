import '../styles/funcionarios.css'
import Nav from '../components/public/Nav'
import Header from '../components/public/Header'
import Options from '../assets/options.png'
import Edit from '../assets/edit-text.png'
import Down from '../assets/dark/down.png' 
import Up from '../assets/dark/up.png'
import { useNavigate } from 'react-router-dom';

function Funcionarios() {
    const navigate = useNavigate();

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
                        <button className='btt'>Especialidades</button>
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