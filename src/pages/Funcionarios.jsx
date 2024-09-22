import '../styles/funcionarios.css'
import Nav from '../components/public/Nav'
import Header from '../components/public/Header'
function Funcionarios() {
    // TODO função para selecionar todos os funcionarios
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
                        <button className='btt'>Novo Funcionário</button>
                    </div>
                </div>
                <div id='titleList'>
                    <div className='nomeTitle'>nome</div>
                    <div className='cellTitle'>celular</div>
                    <div className='cargoTitle'>cargo</div>
                    <div className='statusTitle'>status</div>
                </div>
                <div id='listFuncs'>
                    <div className='funcs'>
                        <div className='nomeFunc'>Leonardo Almeida</div>
                        <div className='cellFunc'>(13) 123456-7891</div>
                        <div className='cargoFunc'>tecnico</div>
                        <div className='statusFunc'>disponivel</div>
                        <div className='containerSkillsFunc'>
                            <div className='skillsFunc skill1'>portão</div>
                            <div className='skillsFunc skill2'>camera</div>
                            <div className='skillsFunc skill3'>escada rolante</div>
                            <div className='skillsFunc skill4'>interfone</div>
                        </div>
                    </div>
                    <div className='funcs'>
                        <div className='nomeFunc'>Leonardo Almeida</div>
                        <div className='cellFunc'>(13) 123456-7891</div>
                        <div className='cargoFunc'>tecnico</div>
                        <div className='statusFunc'>disponivel</div>
                        <div className='containerSkillsFunc'>
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