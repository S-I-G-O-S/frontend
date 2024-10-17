import Nav from './public/Nav'
import '../styles/clientes.css'
import Header from './public/Header'
import { useNavigate } from 'react-router-dom';

// TODO preenchimento campos para editar clientes
function Clientes() {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate(`/cliente`)
    }
    const handleEditClick = (idCliente) => {
        navigate(`/cliente?id=${idCliente}`);
    };
    return (
        <div id='pageClientes'>
        <Header></Header>
        <Nav></Nav>
        <main id='mainClientes'>
            {/* Listagem */}
            <section id='secListClientes'>
                <div id='tabelaClientes'>
                    <div id='containerH2Novo'>
                        <h2>Clientes</h2>
                        <button onClick={() => handleCreateClick(1)}>Novo</button>
                    </div>
                    <div id='cabecalho'>
                        <div id='cNome'>nome</div>
                        <div id='cCNPJ'>CNPJ</div>
                        <div id='cEndereco'>endereço</div>
                        <div></div>
                    </div>
                    <div id='listClientes'>
                        <div id='cliente1' className='clientes'>
                            <div className='nome'>Açougue JM</div>
                            <div className='cnpj'>00.000.000/0001-11</div>
                            <div className='endereco'>R. Leopoldo, 32</div>
                            <div className='options' onClick={() => handleEditClick(1)}>
                                editar
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </div>
    )
}

export default Clientes