import '../../styles/especialidades.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import UnitEspec from './Especialidades/unitEspecialidade'
import { useState } from 'react'
// import Options from '../../assets/options.png'
// import Edit from '../../assets/edit-text.png'
// import Down from '../../assets/dark/down.png' 
// import Up from '../../assets/dark/up.png'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

// TODO a pagina agora terá uma so sessão, e a tela de edição da especialidade terá forma de popup
//https://www.delftstack.com/pt/howto/react/for-loop-in-react/

function Especialidades() {
    // GETS DAS API'S
    let reqstEspecialidades = [
        {
            "id": 1,
            "nome": "Especialidade 1",
            "contFuncs": 34,
            "cor": "#b80a0a/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 2,
            "nome": "Especialidade 2",
            "contFuncs": 34,
            "cor": "#273dfa/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 3,
            "nome": "Especialidade 3",
            "contFuncs": 34,
            "cor": "#1a9a0a/#fff",
            "servicos": ["serviço 1", "serviço com nome longo", "serviço 3"]
        },
        {
            "id": 4,
            "nome": "Especialidade 4",
            "contFuncs": 34,
            "cor": "#b80a0a/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 5,
            "nome": "Especialidade 5",
            "contFuncs": 34,
            "cor": "#273dfa/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 6,
            "nome": "Especialidade 6",
            "contFuncs": 34,
            "cor": "#1a9a0a/#fff",
            "servicos": ["serviço 1", "serviço com nome longo", "serviço 3"]
        },
        {
            "id": 7,
            "nome": "Especialidade 7",
            "contFuncs": 34,
            "cor": "#b80a0a/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 8,
            "nome": "Especialidade 8",
            "contFuncs": 34,
            "cor": "#273dfa/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 9,
            "nome": "Especialidade 9    ",
            "contFuncs": 34,
            "cor": "#1a9a0a/#fff",
            "servicos": ["serviço 1", "serviço com nome longo", "serviço 3"]
        }
    ]
    let reqstServicos = [
        {
            "id": 1,
            "nome": "Concerto de portão (marca famosa 1)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 2,
            "nome": "Concerto de portão (marca famosa 2)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 3,
            "nome": "Concerto de portão (marca famosa 3)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 4,
            "nome": "Concerto de portão (marca famosa 4)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 5,
            "nome": "Concerto de portão (marca famosa 1)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 6,
            "nome": "Concerto de portão (marca famosa 2)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 7,
            "nome": "Concerto de portão (marca famosa 3)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 8,
            "nome": "Concerto de portão (marca famosa 4)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 9,
            "nome": "Concerto de portão (marca famosa 1)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        },
        {
            "id": 10,
            "nome": "Concerto de portão (marca famosa 2)",
            "descricao": "Imagine uma descrição boa deste serviço aqui"
        }
    ]

    const [especEdit, setEspecEdit] = useState([])
    const [prevEspec, setPrevEspec] = useState({
        prevTema: "preVisuLight",
        cor1: "#fff",
        cor2: "#000",
        nome: "Exemplo",
        })
    const [layoutEspecServicos, setLayoutEspecServicos] = useState("layoutEspecs")
    const [ordemEspecServicos, setOrdemEspecServicos] = useState("asc")
    const [especialidades, setEspecialidades] = useState(reqstEspecialidades)
    const [servicos, setServicos] = useState(reqstServicos)
    const mudarLayoutEspecServicos = () => {
        if(layoutEspecServicos == "layoutEspecs") {
            setLayoutEspecServicos("layoutServicos")
        } else {
            setLayoutEspecServicos("layoutEspecs")
        }
    }
    const mudarOrdemEspecServicos = () => {
        if(ordemEspecServicos == "asc") {
            setOrdemEspecServicos("desc")
            setEspecialidades(
                [...especialidades].sort((a, b) => b.nome.localeCompare(a.nome))
            )
            setServicos(
                [...servicos].sort((a, b) => b.nome.localeCompare(a.nome))
            )
        } else {
            setOrdemEspecServicos("asc")
            setEspecialidades(
                [...especialidades].sort((a, b) => a.nome.localeCompare(b.nome)) 
            )
            setServicos(
                [...servicos].sort((a, b) => a.nome.localeCompare(b.nome))
            )   
        }
    }
    const mudarTemaPrevEspecConfig = () => {
        if (prevEspec.prevTema === "preVisuLight") {
            setPrevEspec(prevState => ({
                ...prevState,
                prevTema: "preVisuDark"
            }))
        } else {
            setPrevEspec(prevState => ({
                ...prevState, 
                prevTema: "preVisuLight"
            }))
        }
    }
    const mudarNomePrevEspec = (nomePrev) => {
        setPrevEspec(prevState => ({
                ...prevState,
                nome: nomePrev
            }))
    }
    const mudarCor1PrevEspec = (cor1Prev) => {
        setPrevEspec(prevState => ({
                ...prevState,
                cor1: cor1Prev
            }))
    }
    const mudarCor2PrevEspec = (cor2Prev) => {
        setPrevEspec(prevState => ({
                ...prevState,
                cor2: cor2Prev
            }))
    }
    return(
        <div id='pageEspecialidades'>
        <Header titulo={"Especialidades & Serviços"}></Header>
        <Nav></Nav>
        <div id='shadowBG'>
        </div>
        <main>
            <section id='sec1'>
                {/* <div id='contH2Novo'>
                    <h2>Especialidades & Serviços</h2>
                    <div id='contNovo'>
                    <button>Nova Especialidade</button>
                    <button>Novo Serviço</button>
                    </div>
                </div> */}
                {/* 
                    Nome ASC/DESC
                    Mudar layout
                    
                 */}
                <div id='contFiltrosEspecServ'>
                    <div id='orderFiltrosEspecServ'>
                        <p>Ordernar por:</p>
                        <button id='nomeOrderFiltrosEspec' onClick={mudarOrdemEspecServicos}>
                            Nome {ordemEspecServicos.toUpperCase()}
                        </button>
                    </div>
                    <div id='groupFiltrosEspecServ'>
                        <p>Agrupar por:</p>
                        <button id='bttGroupFiltrosEspec'
                        onClick={mudarLayoutEspecServicos}>
                            {
                                layoutEspecServicos == "layoutEspecs" ?
                                "Especialidades" : "Serviços" 
                            }
                        </button>
                    </div>
                </div>
                <div id='contListEspecServ' className={layoutEspecServicos}>
                    {   layoutEspecServicos == "layoutEspecs" ?
                        especialidades.map(espec => 
                            <UnitEspec key={espec.id} espec={espec}></UnitEspec>
                        ) :
                        servicos.map(serv => 
                            <div className='servicos' key={serv.id}>
                                <h4>{serv.nome}</h4>
                                
                                <div>
                                    {serv.descricao}
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
            <section id='secConfigEspec'>
                <h2>Editando especialidade</h2>
                <div id='contInfosEspecEdit'>

                    <div id='campoNomeConfigEspec'>
                        <label>Nome:</label>
                        <input 
                            type="text" id='nomeConfigEspec' 
                            value={prevEspec.nome}
                            onChange={(e) => mudarNomePrevEspec(e.target.value)}
                        />
                    </div>
                    <div id='contCamposCoresEspecEdit'>
                        <div id='campoCor1ConfigEspec' className='campoConfigEspec'>
                            <label>Cor de fundo:</label>
                            <input 
                                type="color" name="" id="inpCorFundo" 
                                value={prevEspec.cor1}
                                onChange={(e) => mudarCor1PrevEspec(e.target.value)}
                            />
                        </div>
                        <div id='campoCor2ConfigEspec' className='campoConfigEspec'>
                            <label>Cor da letra:</label>
                            <input 
                                type="color" name="" id="inpCorLetra"
                                value={prevEspec.cor2}
                                onChange={(e) => mudarCor2PrevEspec(e.target.value)}
                            />
                        </div>
                    </div>
                    <div id='contPreVisu'>
                        <div id='headPreVisu'>
                            <p>Pré-visualização:</p>
                            <button onClick={mudarTemaPrevEspecConfig}>Mudar tema</button>
                        </div>
                        <div id='preVisu' className={prevEspec.prevTema}>
                            <div id='especPreVisu'
                            style={{
                                borderColor: prevEspec.cor2,
                                backgroundColor: prevEspec.cor1,
                                color: prevEspec.cor2
                            }}>
                                {prevEspec.nome}
                            </div>
                        </div>
                    </div>
                </div>
                <div id='contServicosEspecEdit'>
                    <div id='headServicos'>
                        <p>Serviços relacionados</p>
                        <button>Adicionar</button>
                    </div>
                    <div id='listServicosEdit'>
                        <p>Serviço 1</p>
                        <p>Serviço 2</p>
                        <p>Serviço 3</p>
                        <p>Serviço 4</p>
                        <p>Serviço 5</p>
                        <p>Serviço 6</p>
                    </div>
                </div>
                <div id='contFimAcao'>
                <button>cancelar</button>
                <button>salvar</button>
                <button>deletar</button>
                </div>
            </section>
        </main>
        </div>
    )
}
export default Especialidades