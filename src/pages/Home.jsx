import { Link } from "react-router-dom";
import '../styles/home.css'
import navAbrir  from '../assets/navAbrir.png'
import navFechar  from '../assets/navFechar.png'
function Home() {
    async function changeNav() {
        const sideNav = document.getElementById("sideNavHome")
        const button = document.getElementById("bttNav")

        if (button.className == "navFechar") {
            sideNav.style.display = "none"
            button.className = "navAbrir"
            button.src = navAbrir
        } else {
            sideNav.style.display = "flex"
            button.className = "navFechar"
            button.src = navFechar
        }
    }
    return (
        <>
        <nav id="navHome">
            <img id="bttNav" src={ navAbrir } alt="" onClick={changeNav} className="navAbrir"/>
            <Link id="sair" to="/">
                sair
            </Link>
        </nav>
        <div id="sideNavHome" className="goTo">
            <Link className="links" to="/tecnicos">tenicos</Link>
            <Link className="links" to="/clientes">clientes</Link>
            <Link className="links" to="/ordens">ordens de serviços</Link>
        </div>
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
        </>
    )
}

export default Home