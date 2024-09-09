import Nav from '../components/public/Nav'
import '../styles/clientes.css'
import Header from '../components/public/Header'

function Clientes() {
    async function addCliente() {
        changeRegClienteContainer()
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
        <Header></Header>
        <Nav></Nav>
        <main id='mainClientes'>
            {/* Listagem */}
            <section id='containerListClientes'>
                <div id='tabelaClientes'>
                    <div id='cabecalho'>
                        <div id='cNome'>nome</div>
                        <div id='cCNPJ'>CNPJ</div>
                        <div id='cEndereco'>endereço</div>
                        <div id='adicionarCliente'>
                            <button onClick={changeRegClienteContainer}>novo cliente</button>
                        </div>
                    </div>
                    <div id='listClientes'>
                        <div id='cliente1' className='clientes'>
                            <div className='nome'>Açougue JM</div>
                            <div className='cnpj'>00.000.000/0001-11</div>
                            <div className='endereco'>R. Leopoldo, 32</div>
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