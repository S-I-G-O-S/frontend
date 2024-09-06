import { Link } from 'react-router-dom'
import navLeft  from '../assets/navLeft.png'
import navRight  from '../assets/navRight.png'
import funcsIcon from '../assets/funcsIcon.png'
import clientesIcon from '../assets/clientesIcon.png'
import ordensIcon from '../assets/ordensIcon.png'
import '../styles/home.css'
function Home() {
    async function changeNav() {
        const nav = document.getElementById("navHome")
        const button = document.getElementById("bttNav")

        if (button.className == "navFechar") {
            //sideNav.style.display = "none"
            button.className = "navAbrir"
            button.src = navRight
            nav.className = "navFechado"
        } else {
            //sideNav.style.display = "flex"
            button.className = "navFechar"
            button.src = navLeft
            nav.className = "navAberto"
        }
    }
    return (
        <div id='pageHome'>
        <header id='headerHome'>
            <Link id="sair" to="/">
                sair
            </Link>
        </header>
        <nav id="navHome" className="goTo navFechado">
            <img id="bttNav" src={ navRight } alt="" onClick={changeNav} className="navAbrir"/>
            <div id='containerLinks'>
                <Link className="links" id='goToFuncs' to="/funcionarios">
                    <img src={funcsIcon} alt="home" />
                    <p className='nomeGoTo' id='goToHomeP'>funcionarios</p>
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
        </nav>
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
        </main>
        </div>
    )
}

export default Home