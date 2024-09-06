import { Link } from 'react-router-dom'
import navLeft  from '../assets/navLeft.png'
import navRight  from '../assets/navRight.png'
import funcsIcon from '../assets/funcsIcon.png'
import homeIcon from '../assets/homeIcon.png'
import ordensIcon from '../assets/ordensIcon.png'
import '../styles/clientes.css'

function Clientes() {
    async function addCliente() {
        changeRegClienteContainer()
    }
    async function changeNav() {
        const nav = document.getElementById("navClientes")
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
    async function changeRegClienteContainer() {
        const sombra = document.getElementById("sombra")
        const contRegCliente = document.getElementById("containerNovoCliente")
        if (sombra.style.display == 'flex') {
            sombra.style.display = 'none'
            contRegCliente.style.display = 'none'
        } else {
            sombra.style.display = 'flex'
            contRegCliente.style.display = 'grid'
        }
    }
    return (
        <div id='pageClientes'>
        <header id='headerClientes'>
            <Link id="sair" to="/">
                sair
            </Link>
        </header>
        <nav id="navClientes" className="goTo navFechado">
            <img id="bttNav" src={ navRight } alt="" onClick={changeNav} className="navAbrir"/>
            <div id='containerLinks'>
                <Link className="links" id='goToClientes' to="/clientes">
                    <img src={homeIcon} alt="clientes" />
                    <p className='nomeGoTo' id='goToClientesP'>home</p>
                </Link>
                <Link className="links" id='goToFuncs' to="/funcionarios">
                    <img src={funcsIcon} alt="home" />
                    <p className='nomeGoTo' id='goToHomeP'>funcionarios</p>
                </Link>
                <Link className="links" id='goToOrdens' to="/ordens">
                    <img src={ordensIcon} alt="ordens" />
                    <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                </Link>
            </div>
        </nav>
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
        </div>
    )
}

export default Clientes