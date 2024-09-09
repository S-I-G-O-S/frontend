import '../styles/funcionarios.css'
import Nav from '../components/public/Nav'
import Header from '../components/public/Header'
function Funcionarios() {
    return (
        <div id='pageFuncionarios'>
        <Header></Header>
        <Nav></Nav>
        {/* <nav id="navFuncionarios" className="goTo navFechado">
            <img id="bttNav" src={ navRight } alt="" onClick={changeNav} className="navAbrir"/>
            <div id='containerLinks'>
                <Link className="links" id='goToHome' to="/home">
                    <img src={homeIcon} alt="home" />
                    <p className='nomeGoTo' id='goToHomeP'>home</p>
                </Link>
                <Link className="links" id='goToClientes' to="/clientes">
                    <img src={clientesIcon} alt="clientes" />
                    <p className='nomeGoTo' id='goToClientesP'>clientes</p>
                </Link>
                <Link className="links" id='goToOrdens' to="/ordens">
                    <img src={ordensIcon} alt="ordens" />
                    <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                </Link>
            </div>
        </nav> */}
        <main id='mainFuncionarios'>
            <section id='sec1'>
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
                            <input type="checkbox" className='selectFunc' id="" />
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
                            <input type="checkbox" className='selectFunc' id="" />
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
                            <input type="checkbox" className='selectFunc' id="" />
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
            <section id='sec2'>
                FILTROS
                <br />lugar onde o usuario vai poder filtrar quais funcionarios deseja ver, como por exemplo, só funcionarios disponiveis ou por especialidades.
            </section>
            <section id='sec3'>

            </section>
            <section id='sec4'>
                ESPECIALIDADES
                <br />Onde o usuario poderá editar, criar, excluir e saber mais sobre as especialidades registradas no sistema.
            </section>
        </main>
        </div>
    )
}

export default Funcionarios