import Header from "../public/Header"
import Nav from "../public/Nav"

function HistoricoOrdens() {
    return(
        <div id="pageHistOrdens" className="paginas">
        <Header titulo={'Historico de ordens'}></Header>
        <Nav></Nav>
        <main>
            <section>
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
                    {
                        ordens?.map(ordem => (
                            <div
                                id={`ordem${ordem.id}`}
                                className="ordem"
                                key={ordem.id}>
                                <div className="ordemId">
                                    {ordem.id}
                                </div>
                                <div className="ordemDtAbertura">
                                    {ordem.dt_Abertura}
                                </div>
                                <div className="ordemCliente">
                                    {ordem.cliente.nome}
                                </div>
                                <div className="ordemSituacao">
                                    {ordem.situacao}
                                </div>
                                <div className="ordemUltAtt">
                                {
                                    ordem.dt_Atendimento ? ordem.dt_Atendimento : ordem.dt_Abertura
                                }
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </section>
        </main>
        </div>
    )
}
export default HistoricoOrdens