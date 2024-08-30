import { Link } from 'react-router-dom'
import navAbrir  from '../assets/navAbrir.png'
import navFechar  from '../assets/navFechar.png'
import options from '../assets/options.png'
import '../styles/clientes.css'

function Clientes() {
    async function changeNav() {
        const sideNav = document.getElementById("sideNavClientes")
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
        <nav id='navClientes'>
            <img id="bttNav" src={ navAbrir } alt="" onClick={changeNav} className="navAbrir"/>
            <Link id="sair" to="/">
                sair
            </Link>
        </nav>
        <div id="sideNavClientes" className="goTo">
            <Link className="links" to="/tecnicos">tenicos</Link>
            <Link className="links" to="/home">home</Link>
            <Link className="links" to="/ordens">ordens de serviços</Link>
        </div>
        <main id='mainClientes'>
            {/* Filtragem 
                NOME
                QTD ENDEREÇOS
                QT
            */}
            <section>
                <div id='tabelaClientes'>
                    <div id='cabecalho'>
                        <div id='cNome'>nome</div>
                        <div id='cCNPJ'>CNPJ</div>
                        <div id='adicionarCliente'>+</div>
                    </div>
                    <div id='listClientes'>
                        <div id='cliente1' className='clientes'>
                            <div className='nome'>Açougue JM</div>
                            <div className='cnpj'>00.000.000/0001-11</div>
                            <div className='options'>
                                editar
                            </div>
                        </div>
                        <div id='cliente1' className='clientes'>
                            <div className='nome'>Açougue JM</div>
                            <div className='cnpj'>00.000.000/0001-11</div>
                            <div className='options'>
                                editar
                            </div>
                        </div><div id='cliente1' className='clientes'>
                            <div className='nome'>Açougue JM</div>
                            <div className='cnpj'>00.000.000/0001-11</div>
                            <div className='options'>
                                editar
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Adicionar Novo */}
            {/* Listagem */}
        </main>
        </>
    )
}

export default Clientes