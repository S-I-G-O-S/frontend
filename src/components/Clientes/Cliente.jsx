import Nav from '../public/Nav'
import '../../styles/cliente.css'
import Header from '../public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'

function Cliente() {
    const verContato = (idContato) => {
        const contato = document.getElementById(`contato${idContato}`)
        const img = document.getElementById(`img${idContato}`)
        if (contato.classList == 'contato fechado') {
            contato.classList = "contato aberto"
            img.src = Up
            console.log(`contato ${idContato} aberto`)
        } else {
            contato.classList = "contato fechado"
            img.src = Down
            console.log(`contato ${idContato} fechado`)
        }
    }
    return(
        <div id="pageCliente">
            <Header titulo={"Editando cliente "}></Header>
            <Nav></Nav>
            <main id='mainCliente'>
                <section id='secInfos'>
                    <h2>Informações do cliente</h2>
                    <div id='geral'>
                        <div id='nome'>
                            <label>Nome:</label>
                            <input type="text" />
                        </div>
                        <div id='cnpj'>
                            <label>CNPJ:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div id='endereco'>
                        <div id='cep'>
                            <label>CEP:</label>
                            <input type="text" />
                        </div>
                        <div id='rua'>
                            <label>Rua/Logradouro:</label>
                            <input type="text" />
                        </div>
                        <div id='num'>
                            <label>Nº:</label>
                            <input type="text" />
                        </div>
                        <div id='complemento'>
                            <label>Complemento:</label>
                            <input type="text" />
                        </div>
                        <div id='bairro'>
                            <label>Bairro:</label>
                            <input type="text" />
                        </div>
                        <div id='cidade'>
                            <label>Cidade:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div id='fimAcao'>
                        <button id='bttCancelar'>Cancelar</button>
                        <button id='bttSalvar'>Salvar</button>
                        <button id='bttExcluir'>Excluir</button>
                    </div>
                </section>
                <section id='secContatos'>
                    <div id='containerH2Novo'>
                        <h2>Contatos</h2>
                        <button id='bttNovoCtt'>novo</button>
                    </div>
                    <div id='listContatos'>
                        <div id='contato1' className='contato fechado'>
                            <button className='contatoHeader'
                            onClick={() => {verContato(1)}}>
                                <img id='img1' src={Down} alt="abrir"/>
                                <div className='nome'>Fabricio</div>
                            </button>
                            <div className='contatoBody'>
                                <div className='contatoTelefone'>
                                    tel/cel: <span>(13) 99932-5555</span>
                                    
                                </div>
                                <div className='contatoEmail'>
                                    email: <span>emaildaora@outlook.com</span>
                                </div>
                                <div className='contatoDescricao'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quibusdam maiores et numquam, dignissimos quod assumenda nostrum.</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='secHistorico'>
                    <h2>Histórico de ordens</h2>
                </section>
            </main>
        </div>
    )
}

export default Cliente