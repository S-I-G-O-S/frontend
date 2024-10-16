// Funções de requisições
import {getFuncionarioPorID, deleteFuncionario, postFuncionario, putFuncionario} from '../../services/funcionariosAPI.js'
import {getEspecialidades} from '../../services/especialidadesAPI.js'

import '../../styles/funcionario.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import { useLocation, useNavigate  } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { cepAPI } from '../../services/cepAPI'
// import { useQuery } from ‘react-query’

function Funcionario() {
    // const nomeCompleto = "Leonardo Martinez Nunes Barbosa Silva Almeida";
    // const nomes = nomeCompleto.split(" "); // separa a string em um array
    // const primeiroNome = nomes[0]; // primeiro elemento do array
    // const ultimoNome = nomes[nomes.length - 1]; // último elemento do array
    // const resultado = `${primeiroNome} ${ultimoNome}`
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idFuncionario = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [funcionario, setFuncionario] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [reqstEspecialidades, setReqstEspecialidades] = useState()
    const [pesqAddEspec, setPesqAddEspec] = useState('')
    const [erro, setErro] = useState()
    
    const addEspecToFunc = () => {
        console.info("ADICIONANDO ESPECIALIDADE")
        let especToAdd = especialidades.find(espec => espec.nome.toLowerCase() === pesqAddEspec.toLowerCase())
        console.warn(especToAdd)
        if (!especToAdd) {
            setErro("Serviço não encontrado!")
            setPesqAddEspec("Especialidade não encontrada")
            setTimeout(() => {
                setPesqAddEspec('')
            }, 2000)
            return
        }

        if (funcionario.especialidades.some(espec => espec.id === pesqAddEspec.id)) {
            setErro("Esta especialidade já foi adicionado a este funcionario!");
            return
        }
        setFuncionario(especState => ({
            ...especState,
            especialidades: [...especState.especialidades, especToAdd]
        }))
        setPesqAddEspec('')
    }
    const deleteEspecFunc = (idEspec) => {
        setFuncionario(especState => ({
            ...especState,
            especialidades: especState.especialidades.filter(espec => espec.id !== idEspec)
        }))
    }
    const changePesqAddEspec = (value) => {
        setPesqAddEspec(value)
    }
    const changeInput = (value, field) => {
        setFuncionario(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const novoFuncionario = () => {
        setFuncionario(
            {
                "nome": "",
                "email": "",
                "celular": "",
                "senha": "",
                "cargo": "",
                "endereco": {
                    "cep": "",
                    "logradouro": "",
                    "numero": "",
                    "bairro": "",
                    "cidade": "",
                    "uf": "",
                    "complemento": ""
                },
                "especialidades": []
            }
        )
    }
    const goToFuncionarios = () => {
        navigate(`/funcionarios`)
    }
    const handleDelete = async () => {
        if(!window.confirm("Deseja APAGAR o funcionário " + funcionario.nome + "?")) {
            return
        }
        
        const result = await deleteFuncionario(funcionario.id);
        if (result.success) {
            setFuncionario((prev) => prev.filter((func) => func.id !== funcionario.id))
        } else {
            console.error(result.error)
        }
        navigate(`/funcionarios`)
    }
    const handleSalvar = async () => {
        let arrayEspecs = []
        funcionario.especialidades.map(espec => (
            arrayEspecs.push(espec.id)
        ))
        let result
        if ('id' in funcionario) {
            result = await putFuncionario(funcionario, arrayEspecs)
        } else {
            result = await postFuncionario(funcionario, arrayEspecs)
        }

        if (result.success) {
            window.alert('Alterações salvas com sucesso!')
        } else {
            window.alert(result.error)
        }
    }
    const converterEspecs = (espec) => {
        console.log("Debbug: " + espec.cor)
        const [cor1, cor2] = espec?.cor?.includes('/') 
                ? espec.cor.split('/') 
                : [espec.cor, '#000']
        return (
            <div className='especFunc' key={espec.id}
                style={{
                        borderColor: cor2,
                        backgroundColor: cor1,
                        color: cor2
                }}
                title={espec.descricao}
            >
                <p>{espec.nome}</p>
                <button onClick={() => {deleteEspecFunc(espec.id)}}>X</button>
            </div>
        )
    }
    const fetchEspecialidades = async () => {
        try {
            const data = await getEspecialidades()
            //setReqstEspecialidades(data)
            setEspecialidades(data.content)
            console.log(data.content)
        } catch (error) {
            setErro(error.message)
        }
    }
    const fetchFuncionario = async () => {
        try {
            const data = await getFuncionarioPorID(idFuncionario)
            setFuncionario(data)
            console.log(data)
        } catch (error) {
            setErro(error.message)
        }
    }
    useEffect(() => {
        console.log(erro)   
    }, [erro])
    useEffect(() => {
        const fetchData = async () => {
            try {
                idFuncionario !== null
                ? fetchFuncionario()
                : novoFuncionario()
                
                fetchEspecialidades()
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData()
    }, [])
    return(
        <div id="pageFuncionario">
            <Header titulo={
                idFuncionario !== null
                ? ( !funcionario ? 
                    `Editando funcionário` :
                    `Editando funcionário ${funcionario.nome}`
                )
                : 'Novo funcionário'
            }>
            </Header>
            <Nav></Nav>
            <main>
                {
                !funcionario ? 
                <section id='secInfos'>
                    <h2>carregando...</h2>
                </section> :
                <section id='secInfos'>
                    <h2>Informações gerais</h2>
                    {/* Infos do funcionarios */}
                    <div id='contGeralFunc'>
                        <div id='contNomeFunc'>
                            <label>Nome:</label>
                            <input
                            type="text"
                            value={funcionario.nome || ""}
                            onChange={(e) => changeInput(e.target.value, "nome")}
                            />
                        </div>
                        <div id='contEmailFunc'>
                            <label>Email:</label>
                            <input
                            type="text"
                            value={funcionario.email || ""}
                            onChange={(e) => changeInput(e.target.value, "email")}
                            />
                        </div>
                        <div id='contCellFunc'>
                            <label>Celular:</label>
                            <input
                            type="text"
                            value={funcionario.celular || ""}
                            onChange={(e) => changeInput(e.target.value, "celular")}
                            />
                        </div>
                        <div id='contCargoFunc'>
                            <label>Cargo:</label>
                            <input
                            type="text"
                            value={funcionario.cargo || ""}
                            onChange={(e) => changeInput(e.target.value, "cargo")}
                            />
                        </div>
                    </div>
                    <div id='contEndFunc'>
                        <div id='contCepFunc'>
                            <label>CEP:</label>
                            <input
                            type="text"
                            value={funcionario.endereco.cep || ""}
                            onChange={(e) => changeInput(e.target.value, "cep")}
                            />
                        </div>
                        <div id='contRuaFunc'>
                            <label>Rua/logradouro:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.logradouro || ""}
                            onChange={(e) => changeInput(e.target.value, "logradouro")}
                            />
                        </div>
                        <div id='contNumFunc'>
                            <label>Nº:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.numero || ""}
                            onChange={(e) => changeInput(e.target.value, "numero")}
                            />
                        </div>
                        <div id='contCompFunc'>
                            <label>Complemento:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.complemento || ""}
                            onChange={(e) => changeInput(e.target.value, "complemento")}
                            />
                        </div>
                        <div id='contBairroFunc'>
                            <label>Bairro:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.bairro || ""}
                            onChange={(e) => changeInput(e.target.value, "bairro")}
                            />
                        </div>
                        <div id='contCidadeFunc'>
                            <label>Cidade:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.cidade || ""}
                            onChange={(e) => changeInput(e.target.value, "cidade")}
                            />
                        </div>
                    </div>

                    <div id='contControle'>
                        <button id='bttCancelar' onClick={goToFuncionarios}>Cancelar</button>
                        <button id='bttSalvar' onClick={handleSalvar}>Salvar</button>
                        <button id='bttExcluir' onClick={handleDelete}>Excluir</button>
                    </div>
                </section>
                }
                <section id='secEspecialidades'>
                    <h2>Especialidades</h2>
                    <div id='contAddEspecFunc'>
                        {/* pesquisar */}
                        <input type="text" list='dtListEspecialidades'
                            value={pesqAddEspec}
                            onChange={(e) => changePesqAddEspec(e.target.value)}
                        />
                        <datalist id='dtListEspecialidades'>
                            {
                                !especialidades ? "" : 
                                especialidades
                                    .map(espec => (
                                        <option key={espec.id} value={espec.nome}>
                                            {espec.nome}
                                        </option>
                                    ))
                            }
                        </datalist>
                        <button onClick={addEspecToFunc}>Adicionar</button>
                    </div>
                    <div id="contListEspecFunc">
                        {/* listagem  */}
                        {
                            !funcionario || !especialidades ? (
                                <p>Carregando...</p>
                            ) : ('id' in funcionario) ? (
                                funcionario.especialidades && funcionario.especialidades.length > 0 ? (
                                    funcionario.especialidades.map(espec => (
                                        converterEspecs(espec)
                                    ))
                                ) : (
                                    <p>Nenhuma especialidade adicionada</p>
                                )
                            ) : (
                                <p>Nenhuma especialidade adicionada</p>
                            )
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Funcionario