import { Link } from 'react-router-dom'
import navAbrir  from '../assets/navAbrir.png'
import navFechar  from '../assets/navFechar.png'
import options from '../assets/options.png'
import '../styles/clientes.css'

function Clientes() {

    async function addCliente() {
        changeRegClienteContainer()
    }
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
    async function changeRegClienteContainer() {
        const sombra = document.getElementById("sombra")
        const contRegCliente = document.getElementById("containerNovoCliente")
        if (sombra.style.display == 'none') {
            sombra.style.display = 'flex'
            contRegCliente.style.display = 'grid'
        } else {
            document.getElementById("sombra").style.display = 'none',
            document.getElementById("containerNovoCliente").style.display = 'none'
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
            <Link className="links" to="/home">home</Link>
            <Link className="links" to="/tecnicos">tenicos</Link>
            <Link className="links" to="/ordens">ordens de serviços</Link>
        </div>
        <main id='mainClientes'>
            {/* Listagem */}
            <section id='containerListClientes'>
                <div id='tabelaClientes'>
                    <div id='cabecalho'>
                        <div id='cNome'>nome</div>
                        <div id='cCNPJ'>CNPJ</div>
                        <div id='adicionarCliente'>
                            <button onClick={changeRegClienteContainer}>novo cliente</button>
                        </div>
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
                        </div>
                        <div id='cliente1' className='clientes'>
                            <div className='nome'>Açougue JM</div>
                            <div className='cnpj'>00.000.000/0001-11</div>
                            <div className='options'>
                                editar
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div id='sombra' onClick={changeRegClienteContainer}>
            {/* para escurercer o resto do site ao reg novo cliente */}
            </div>
            {/* Adicionar Novo */}
            <section id='containerNovoCliente'>
                <h2>Registrando cliente</h2>
                <div id='geral'>
                    <div id='nome'>
                        <label>nome</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div id='cnpj'>
                        <label>CNPJ</label>
                        <input type="text" name="" id="" />
                    </div>
                </div>
                <div id='contEnderecos' className='contInfosNovoCliente'>
                    <h3 id='title'>endereços</h3>
                    <div id='bttShow'>V</div>
                    <div id='bttNovo'>novo</div>
                    <div id='inpsEnderecos' className='inpsNovoCliente'>
                        <input id="" />
                    </div>
                </div>
                <div id='contTelefones' className='contInfosNovoCliente'>
                    <h3 id='title'>telefones</h3>
                    <div id='bttShow'>V</div>
                    <div id='bttNovo'>novo</div>
                    <div id='inpsTelefones' className='inpsNovoCliente'>
                        <input id="" />
                    </div>
                </div>
                <div id='contEmails' className='contInfosNovoCliente'>
                    <h3 id='title'>emails</h3>
                    <div id='bttShow'>V</div>
                    <div id='bttNovo'>novo</div>
                    <div id='inpsEmails' className='inpsNovoCliente'>
                        <input id="" />
                    </div>
                </div>
                <div id='concForm'>
                    <button onClick={changeRegClienteContainer}>cancelar</button>
                    <button onClick={addCliente}>adicionar</button>
                </div>
            </section>
        </main>
        </>
    )
}

export default Clientes