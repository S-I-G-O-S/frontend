import '../../styles/funcionario.css'
import Nav from '../../components/public/Nav'
import Header from '../../components/public/Header'
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
                    <div id='contInfosFunc'>
                        <div>
                            <label>Nome:</label>
                            <input type="text" id="" />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="text" id="" />
                        </div>
                        <div>
                            <label>Celular:</label>
                            <input type="text" id="" />
                        </div>
                    </div>
                    <div id='contEndFunc'>
                        <div id='cepFunc'>
                            <label>CEP:</label>
                            <input type="text" />
                        </div>
                        <div id='ruaFunc'>
                            <label>Rua/logradouro:</label>
                            <input type="text" />
                        </div>
                        <div id='numFunc'>
                            <label>Nº:</label>
                            <input type="text" />
                        </div>
                        <div id='compFunc'>
                            <label>Complemento:</label>
                            <input type="text" />
                        </div>
                        <div id='bairroFunc'>
                            <label>Bairro:</label>
                            <input type="text" />
                        </div>
                        <div id='cidadeFunc'>
                            <label>Cidade:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div id='contControle'>
                        <button>Cancelar</button>
                        <button>Salvar</button>
                        <button>Excluir</button>
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