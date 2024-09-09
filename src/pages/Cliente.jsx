import Nav from '../components/public/Nav'
import '../styles/cliente.css'
import Header from '../components/public/Header'

function Cliente() {
    return(
        <div id="pageCliente">
            <Header></Header>
            <Nav></Nav>
            <main id='mainCliente'>
                <section id='sec1'>
                    <h2>infos do cliente</h2>
                </section>
                <section id='sec2'>
                    <h2>contatos</h2>
                </section>
                <section id='sec3'>
                    <h2>historico de ordens</h2>
                </section>
            </main>
        </div>
    )
}

export default Cliente