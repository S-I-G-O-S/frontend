import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/home.css'
function Home() {
    return (
        <div id='pageHome'>
        <Header></Header>
        <Nav></Nav>
        {/* <nav id="navHome" className="goTo navFechado">
            <img id="bttNav" src={ navRight } alt="" onClick={changeNav} className="navAbrir"/>
            <div id='containerLinks'>
                <Link className="links" id='goToFuncs' to="/funcionarios">
                    <img src={funcsIcon} alt="funcionarios" />
                    <p className='nomeGoTo' id='goToFuncionariosP'>funcionarios</p>
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
        <main id="mainHome">
            {/* SEÇÃO DE ORDENS DE SERVIÇOS ABERTOS */}
            <section id="secOrdensAbertas">
                <h2>Ordens Abertas</h2>
                <div id="ordemAberta1" className="ordensAbertas ordens">
                    <div className="nomeCliente">Cliente</div>
                    <div className="dataHora">12:00 02/05/24</div>
                    <div className="local">R. Leopoldo Martins, 74</div>
                </div>
                <div id="ordemAberta2" className="ordensAbertas ordens">
                    <div className="nomeCliente">Cliente 2</div>
                    <div className="dataHora">13:00 02/05/24</div>
                    <div className="local">R. Tenorio Fonseca, 35</div>
                </div>
            </section>
            {/* SEÇÃO DE ORDENS DE SERVIÇOS SENDO ATENDIDAS */}
            <section id="secOrdensSendoAtendidas">
                <h2>Ordens em atendimento</h2>
                <div id="ordenSendoAtendida1" className="ordensSendoAtendidas ordens">
                    <div className="nomeCliente">Cliente</div>
                    <div className="dataHora">12:00 02/05/24</div>
                    <div className="local">R. Leopoldo Martins, 74</div>
                    <div className="tecnico">
                        Fabricio Fernandes
                    </div>
                </div>
            </section>
            <section id='secTecnicosDisponiveis'>
                <h2>Tecnicos disponiveis</h2>
                <div id='listTecsDisp'>
                    
                </div>
            </section>
        </main>
        </div>
    )
}

export default Home