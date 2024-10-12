import '../../styles/funcionario.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'
import { useFetcher, useLocation, useNavigate  } from 'react-router-dom'
// import { cepAPI } from '../../services/cepAPI'
// import { useQuery } from ‘react-query’;

// TODO Os funcionarios tem CPF
function Funcionario() {
    const nomeCompleto = "Leonardo Martinez Nunes Barbosa Silva Almeida";
    const nomes = nomeCompleto.split(" "); // separa a string em um array
    const primeiroNome = nomes[0]; // primeiro elemento do array
    const ultimoNome = nomes[nomes.length - 1]; // último elemento do array
    const resultado = `${primeiroNome} ${ultimoNome}`
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idFuncionario = searchParams?.get('id') ?? null
    console.log(idFuncionario)

    const navigate = useNavigate()
    const goToFuncionarios = () => {
        navigate(`/funcionarios`)
    }
    const getEspecialidades = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/funcionarios${idFuncionario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setReqstEspecialidades(data)
            } else {
                const errorData = await response.json()
                setError(`Erro: ${errorData.message}`)
            }
        } catch (error) {
            setError(`Erro de conexão: ${error.message}`)
        }
    }
    return(
        <div id="pageFuncionario">
            <Header titulo={"Editando funcionário " + idFuncionario}></Header>
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
                        <button id='bttCancelar' onClick={goToFuncionarios}>Cancelar</button>
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