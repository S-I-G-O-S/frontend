import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/home.css'

// TODO Colocar mais conteudo como atalhos

function Home() {
    return (
        <div id='pageHome'>
        <Header titulo={"Home"}></Header>
        <Nav></Nav>
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