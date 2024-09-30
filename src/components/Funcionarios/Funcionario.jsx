import '../../styles/funcionario.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'
import { useLocation  } from 'react-router-dom'
// import { cepAPI } from '../../services/cepAPI'

function Funcionario() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let idFuncionario = searchParams.get('id');
    console.log(idFuncionario)

    return(
        <div id="pageFuncionario">
            <Header></Header>
            <Nav></Nav>
            <main>
                <section id='secInfos'>
                    <h2>Funcionário</h2>
                    {/* Infos do funcionarios */}
                    <div id='contGeralFunc'>
                        <div id='contNomeFunc'>
                            <label>Nome:</label>
                            <input type="text" id="" />
                        </div>
                        <div id='contEmailFunc'>
                            <label>Email:</label>
                            <input type="text" id="" />
                        </div>
                        <div id='contCellFunc'>
                            <label>Celular:</label>
                            <input type="text" id="" />
                        </div>
                    </div>
                    <div id='contEndFunc'>
                        <div id='contCepFunc'>
                            <label>CEP:</label>
                            <input type="text" />
                        </div>
                        <div id='contRuaFunc'>
                            <label>Rua/logradouro:</label>
                            <input type="text" />
                        </div>
                        <div id='contNumFunc'>
                            <label>Nº:</label>
                            <input type="text" />
                        </div>
                        <div id='contCompFunc'>
                            <label>Complemento:</label>
                            <input type="text" />
                        </div>
                        <div id='contBairroFunc'>
                            <label>Bairro:</label>
                            <input type="text" />
                        </div>
                        <div id='contCidadeFunc'>
                            <label>Cidade:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div id='contControle'>
                        <button id='bttCancelar'>Cancelar</button>
                        <button id='bttSalvar'>Salvar</button>
                        <button id='bttExcluir'>Excluir</button>
                    </div>
                </section>
                <section id='secEspecialidades'>
                    <h2>Especialidades</h2>
                    <div>
                        {/* pesquisar */}
                    </div>
                    <div>
                        {/* listagem  */}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Funcionario