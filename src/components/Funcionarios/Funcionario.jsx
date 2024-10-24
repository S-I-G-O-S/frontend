// Funções de requisições
import {getFuncionarioPorID, deleteFuncionario, postFuncionario, putFuncionario} from '../../services/funcionariosAPI.js'
import {getEspecialidades} from '../../services/especialidadesAPI.js'
import { cepAPI } from '../../services/cepAPI.js'

import '../../styles/funcionario.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import { useLocation, useNavigate  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../public/Loading.jsx'

function Funcionario() {
    {/*
    // TODO adicionar metodo p/ pegaro 1º e ultimo nome do funcionario
    const nomeCompleto = "Leonardo Martinez Nunes Barbosa Silva Almeida";
    const nomes = nomeCompleto.split(" "); // separa a string em um array
    const primeiroNome = nomes[0]; // primeiro elemento do array
    const ultimoNome = nomes[nomes.length - 1]; // último elemento do array
    const resultado = `${primeiroNome} ${ultimoNome}`
    */}
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idFuncionario = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [funcionario, setFuncionario] = useState()
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [reqstEspecialidades, setReqstEspecialidades] = useState()
    const [pesqAddEspec, setPesqAddEspec] = useState('')
    const [cepMensagem, setCepMensagem] = useState('')
    const [erro, setErro] = useState()
    const [viewSenha, setViewSenha] = useState(false)
    
    const addEspecToFunc = () => {
        console.info("ADICIONANDO ESPECIALIDADE")
        let especToAdd = especialidades.find(espec => espec.nome.toLowerCase() === pesqAddEspec.toLowerCase())
        if (!especToAdd) {
            console.error("Serviço não encontrado!")
            setPesqAddEspec("Especialidade não encontrada")
            setTimeout(() => {
                setPesqAddEspec('')
            }, 2000)
            return
        }

        if (funcionario.especialidades.some(espec => espec.id === pesqAddEspec.id)) {
            console.error("Esta especialidade já foi adicionado a este funcionario!");
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
    const handleCEP = (value) => {
        const cep = value.replace(/\D/g, '');
        if (cep.length <= 8) {
            setFuncionario(prevState => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: cep,
                }
            }))
        }
    }
    const fetchCEP = async () => {
        const cep = funcionario.endereco.cep.replace(/\D/g, '')
        if (cep.length === 8) {
            try {
                const response = await cepAPI(cep)
                console.warn(response)
                const { street, neighborhood, city, state } = response.data
                setFuncionario(prevState => ({
                    ...prevState,
                    endereco: {
                        ...prevState.endereco,
                        logradouro: street,
                        bairro: neighborhood,
                        cidade: city,
                        uf: state
                    }
                }))
            } catch (error) {
                setErro("Erro ao buscar CEP:", error)
                setCepMensagem("CEP não encontrado ou inválido.")
                setTimeout(() => {
                    setCepMensagem('')
                }, 5000)
                // alert("CEP não encontrado ou inválido.");
            }
        } else {
            setErro("São necessários 8 digitos.")
            setCepMensagem("São necessários 8 digitos.")
                setTimeout(() => {
                    setCepMensagem('')
                }, 5000)
        }
    }
    const handleChangeDados = (value, field) => {
        setFuncionario(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const handleChangeEndereco = (value, field) => {
        setFuncionario(prevState => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                [field]: value,
            }
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
        console.warn(funcionario)
        funcionario.especialidades.map(espec => (
            arrayEspecs.push(espec.id)
        ))
        let result
        if ('id' in funcionario) {
            result = await putFuncionario(funcionario, arrayEspecs)
        } else {
            console.warn("Debbug "+ viewSenha)
            if(viewSenha) {
                result = await postFuncionario(funcionario, arrayEspecs)
            } else {
                setViewSenha(true)
                return
            }
        }

        if (result.success) {
            window.alert('Alterações salvas com sucesso!')
            // window.location.reload()
            goToFuncionarios()
        } else {
            window.alert(result.error)
        }
    }
    const converterEspecs = (espec) => {
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
            const response = await getEspecialidades()
            setReqstEspecialidades(response)
            setEspecialidades(response.data.content)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchFuncionario = async () => {
        try {
            const response = await getFuncionarioPorID(idFuncionario)
            setFuncionario(response.data)
            setReqstFuncionarios(response)
            // console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                idFuncionario !== null
                ? fetchFuncionario()
                : novoFuncionario()
                
                fetchEspecialidades()
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData()
    }, [])
    return(
        <div id="pageFuncionario">
            <Header titulo={
                idFuncionario !== null
                ? ( !funcionario ? 
                    `Editando funcionário(a)` :
                    `Editando funcionário(a) "${funcionario.nome}"`
                )
                : 'Novo funcionário'
            }>
            </Header>
            <Nav></Nav>
            <main>
            {
                !funcionario ? 
                <section id='secInfos'>
                    <Loading></Loading>
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
                            onChange={(e) => handleChangeDados(e.target.value, "nome")}
                            />
                        </div>
                        <div id='contEmailFunc'>
                            <label>Email:</label>
                            <input
                            type="text"
                            value={funcionario.email || ""}
                            onChange={(e) => handleChangeDados(e.target.value, "email")}
                            />
                        </div>
                        <div id='contCellFunc'>
                            <label>Celular:</label>
                            <input
                            type="text"
                            value={funcionario.celular || ""}
                            onChange={(e) => handleChangeDados(e.target.value, "celular")}
                            />
                        </div>
                        <div id='contCargoFunc'>
                            <label>Cargo:</label>
                            <select name="" id="" 
                                value={funcionario.cargo || ""}
                                onChange={(e) => handleChangeDados(e.target.value, "cargo")}>
                                <option value="técnico">Técnico</option>
                                <option value="base">Base</option>
                                <option value="adm">ADM</option>
                            </select>
                        </div>
                    </div>
                    <div id='contEndFunc'>
                        <div id='contCepFunc'>
                            <label>CEP:</label>
                            <input
                            type="text"
                            value={funcionario.endereco.cep || ""}
                            onChange={(e) => handleCEP(e.target.value)}
                            />
                            <button onClick={fetchCEP}>Pesquisar CEP</button>
                            <p>{cepMensagem}</p>
                        </div>
                        <div id='contRuaFunc'>
                            <label>Rua/logradouro:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.logradouro || ""}
                            onChange={(e) => handleChangeEndereco(e.target.value, "logradouro")}
                            />
                        </div>
                        <div id='contNumFunc'>
                            <label>Nº:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.numero || ""}
                            onChange={(e) => handleChangeEndereco(e.target.value, "numero")}
                            />
                        </div>
                        <div id='contCompFunc'>
                            <label>Complemento:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.complemento || ""}
                            onChange={(e) => handleChangeEndereco(e.target.value, "complemento")}
                            />
                        </div>
                        <div id='contBairroFunc'>
                            <label>Bairro:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.bairro || ""}
                            onChange={(e) => handleChangeEndereco(e.target.value, "bairro")}
                            />
                        </div>
                        <div id='contCidadeFunc'>
                            <label>Cidade:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.cidade || ""}
                            onChange={(e) => handleChangeEndereco(e.target.value, "cidade")}
                            />
                        </div>
                        <div id='contUFFunc'>
                            <label>UF:</label>
                            <input
                            type="text"
                            value={funcionario.endereco?.uf || ""}
                            onChange={(e) => handleChangeEndereco(e.target.value, "uf")}
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
                                !especialidades ? '' : 
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
                                <Loading></Loading>
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
            {
                viewSenha ?
                <div id='shadowBG'>
                    <section id='secTempSenha'>
                        <h2>Definindo senha temporária</h2>
                        <p>Esta será a senha fornecida ao funcionário para seu primeiro acesso. </p>
                        <div>
                            <input type="text" name="" id="" 
                            value={funcionario.senha || ""}
                            onChange={(e) => handleChangeDados(e.target.value, "senha")}/>
                            {/* TODO Adicionar função de senha automatica */}
                            <button>Gerar senha automatica</button>
                        </div>
                        <div>
                            <button onClick={setViewSenha(false)}>voltar</button>
                            <button onClick={handleSalvar}>salvar</button>
                        </div>
                    </section>
                </div> : ''
            }
        </div>
    )
}

export default Funcionario