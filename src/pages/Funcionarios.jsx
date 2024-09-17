import '../styles/funcionarios.css'
import Nav from '../components/public/Nav'
import Header from '../components/public/Header'
function Funcionarios() {
    return (
        <div id='pageFuncionarios'>
        <Header></Header>
        <Nav></Nav>
        <main id='mainFuncionarios'>
            <section id='secList'>
                <h2>Funcionários</h2>
                <div id='containerSelectCriar'>
                    <div id='select'>
                        <input type="checkbox" name="" id="" className='checkbox'/>
                        <p><span></span>todos</p>
                    </div>
                    <div id='contAddNovo'>
                        <button>Novo Funcionario</button>
                    </div>
                </div>
                <div id='titleList'>
                    <div className='selectTitle'></div>
                    <div className='nomeTitle'>nome</div>
                    <div className='cellTitle'>celular</div>
                    <div className='cargoTitle'>cargo</div>
                    <div className='statusTitle'>status</div>
                </div>
                <div id='listFuncs'>
                    <div className='funcs'>
                        <div className='containerSelectFunc'>
                            <input type="checkbox" className='selectFunc checkbox' id="" />
                        </div>
                        <div className='nomeFunc'>Leonardo Almeida</div>
                        <div className='cellFunc'>(13) 123456-7891</div>
                        <div className='cargoFunc'>tecnico</div>
                        <div className='statusFunc'>disponivel</div>
                        <div className='containerSkillsFunc'>
                            <div className='skillsFunc'>portão</div>
                            <div className='skillsFunc'>camera</div>
                            <div className='skillsFunc'>escada rolante</div>
                            <div className='skillsFunc'>interfone</div>
                        </div>
                    </div>
                    <div className='funcs'>
                        <div className='containerSelectFunc'>
                            <input type="checkbox" className='selectFunc checkbox' id="" />
                        </div>
                        <div className='nomeFunc'>Leonardo Almeida</div>
                        <div className='cellFunc'>(13) 123456-7891</div>
                        <div className='cargoFunc'>tecnico</div>
                        <div className='statusFunc'>disponivel</div>
                        <div className='containerSkillsFunc'>
                            <div className='skillsFunc'>portão</div>
                            <div className='skillsFunc'>camera</div>
                            <div className='skillsFunc'>escada rolante</div>
                            <div className='skillsFunc'>interfone</div>
                        </div>
                    </div>
                    <div className='funcs'>
                        <div className='containerSelectFunc'>
                            <input type="checkbox" className='selectFunc checkbox' id="" />
                        </div>
                        <div className='nomeFunc'>Leonardo Almeida</div>
                        <div className='cellFunc'>(13) 123456-7891</div>
                        <div className='cargoFunc'>tecnico</div>
                        <div className='statusFunc'>disponivel</div>
                        <div className='containerSkillsFunc'>
                            <div className='skillsFunc'>portão</div>
                            <div className='skillsFunc'>camera</div>
                            <div className='skillsFunc'>escada rolante</div>
                            <div className='skillsFunc'>interfone</div>
                        </div>
                    </div>
                </div>
            </section>
            <section id='secEspecialidades'>
                ESPECIALIDADES
                <br />Onde o usuario poderá editar, criar, excluir e saber mais sobre as especialidades registradas no sistema.
            </section>
        </main>
        </div>
    )
}

export default Funcionarios