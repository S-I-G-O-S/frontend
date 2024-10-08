import '../../styles/especialidades.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import UnitEspec from './Especialidades/unitEspecialidade'
import { useEffect, useState } from 'react'
// import Options from '../../assets/options.png'
// import Edit from '../../assets/edit-text.png'
// import Down from '../../assets/dark/down.png' 
// import Up from '../../assets/dark/up.png'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

// TODO a pagina lateral direita será para a edição de especialidades e serviços

//https://www.delftstack.com/pt/howto/react/for-loop-in-react/

function Especialidades() {
    // GETS DAS API'S
    let reqstEspecialidades = [
        {
            "id": 1,
            "nome": "Especialidade 1",
            "descricao": "descrição 1",
            "cor": "#b80a0a/#fff",
            "servicos": [1, 2, 3, 6]
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
    const [especAberta, setEspecAberta] = useState(
        { 
            id: 0, 
            nome: '', 
            descricao: '', 
            cor: '',
            servicos: []
        }
    )
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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
    const abrirEspec = (idEspec) => {
        const especSelecionada = especialidades.find(espec => espec.id === idEspec)
        console.log(especSelecionada)
        if (!especSelecionada) {
            setError('Erro ao abrir especialidade.')
            return;
        }
        const [auxCor1, auxCor2] = especSelecionada.cor.split('/');
        if (!auxCor1 || !auxCor2) {
            setError('Erro ao abrir especialidade. Cor inv lida.')
            return;
        }
        setEspecAberta(especSelecionada)
        setPrevEspec({
            prevTema: "preVisuLight",
            cor1: auxCor1,
            cor2: auxCor2,
            nome: especSelecionada.nome,
        })
    }
    const fecharEspec = () => {
        
    }
    const postNovoEspec = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/especialidade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(especAberta),
            })

            if (response.ok) {
                setMessage('Especialidade criada com sucesso!')
            } else {
                const errorData = await response.json()
                setMessage(`Erro: ${errorData.message}`)
            }
        } catch (error) {
            setMessage(`Erro de conexão: ${error.message}`)
        }
    }
    const getEspecialidades = async () => {
        try {
            const response = await fetch('/api/especialidade', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setEspecialidades(data)
            } else {
                const errorData = await response.json()
                setError(`Erro: ${errorData.message}`)
            }
        } catch (error) {
            setError(`Erro de conexão: ${error.message}`)
        }
    }

    useEffect(() => {
        // getEspecialidades()
    }, [])

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
                            <UnitEspec key={espec.id} espec={espec} onClick={() => abrirEspec(espec.id)}></UnitEspec>
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
                        {
                            especAberta.servicos.map(servico => 
                                <p key={servico.id}>
                                    {servico.nome}
                                </p>
                            )
                        }
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