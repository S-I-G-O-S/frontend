import Header from "../components/public/Header"
import Nav from "../components/public/Nav"
import '../styles/ordens.css'
import View from "../assets/view.png"
import Hide from "../assets/hide.png"

function Ordens() {
    function changeViewDetalhes(idOrdem) {
        const btt = document.getElementById('viewOrdem' + idOrdem)
        if (btt.className == "view") {
            btt.src = Hide
            btt.className = 'hide'
        } else {
            btt.src = View
            btt.className = 'view'
        }
    }
    // TODO Criar janela para ver mais detalhes de uma ordem
    // TODO Criar janela para configurar serviços
    return (
        <div id="pageOrdens">
        <Header></Header>
        <Nav></Nav>
        <main id="mainOrdens">
            <section>
                <h2>Histórico de ordens de serviço</h2>
                <div id="containerListOrdens">
                    <div id="cabecalho">
                        <div>id</div>
                        <div>data abertura</div>
                        <div>cliente</div>
                        <div>situação</div>
                        <div>última atualização</div>
                        <div>detalhes</div>
                    </div>
                    <div id="listOrdens">
                        <div className="ordem">
                            <div className="ordemId">000001</div>
                            <div className="ordemDtAbertura">9:00 - 21/09/2024</div>
                            <div className="ordemCliente">A.R. Vidraçarias</div>
                            <div className="ordemSituacao">Aguardando pagamento</div>
                            <div className="ordemUltAtt">11:00 - 22/09/2024</div>
                            <div onClick={() => changeViewDetalhes(1)} className="ordemDetalhes barraTabela">
                                <img id="viewOrdem1" className="view" src={View} alt="" />
                            </div>
                        </div>
                        <div className="ordem">
                            <div className="ordemId">000002</div>
                            <div className="ordemDtAbertura">15:00 - 21/09/2024</div>
                            <div className="ordemCliente">Teste de cliente com nome grande</div>
                            <div className="ordemSituacao">Em atendimento</div>
                            <div className="ordemUltAtt">15:01 - 21/09/2024</div>
                            <div onClick={() => changeViewDetalhes(2)} className="ordemDetalhes barraTabela">
                                <img id="viewOrdem2" className="view" src={View} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </div>
    )
}

export default Ordens