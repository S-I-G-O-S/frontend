
import {getClientes, postCliente} from '../services/clientesAPI.js'

import Nav from './public/Nav'
import Loading from './public/Loading.jsx'
import '../styles/clientes.css'
import Header from './public/Header'
import Edit from '../assets/edit-text.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Clientes() {
    const navigate = useNavigate();
    const [reqstClientes, setReqstClientes] = useState()
    const [clientes, setClientes] = useState()
    const [novoCliente, setNovoCliente] = useState(null)
    const [showNovoCliente, setShowNovoCliente] = useState(null)
    const [mensagem, setMensagem] = useState(null)
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario')
        return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
    })
    const handleCancelar = () => {
        setShowNovoCliente(null)
        setNovoCliente(null)
    }
    const handleCriarCliente = async () => {
        if (novoCliente.nome == '' ) {
            setMensagem('O nome do cliente é obrigatório.')
            setTimeout(() => {
                setMensagem(null)
            }, 5000)
            return 
        }
        if ( novoCliente.cnpj.length != 14) {
            // TODO dá pra adicionar uma verificação de CNPJ por api
            setMensagem('CNPJ inválido')
            setTimeout(() => {
                setMensagem(null)
            }, 5000)
            return 
        }
        let result
        try {
            result = await postCliente(novoCliente)
            console.warn(result)
        } catch (err) {
            console.error(err)
        }
        if(result.success) {
            handleEditCliente(result.response.data.id)
        } else {
            window.alert("Erro ao criar este cliente.")
            console.log(result.error)
        }
    }
    const handleShowNovoCliente = () => {
        setNovoCliente({
            nome: "novo cliente",
            cnpj: "",
            contatos: [
                // TODO ver se consegue mudar para permitir enviar novos clientes sem contato
                {
                    nome: "contato obrigatório",
                    descricao: "todo cliente deve ter ao menos 1 contato",
                    telefone: "",
                    email: ""
                }
            ],
            endereco: {
                cep: "",
                logradouro: "",
                numero: "",
                bairro: "",
                cidade: "",
                uf: "",
                complemento: ""
            }
        })
        setShowNovoCliente(true)
        
        //navigate(`/cliente`)
    }
    const handleEditCliente = (idCliente) => {
        navigate(`/cliente?id=${idCliente}`)
    }
    const formatCNPJ = (cnpj) => {
        if (!cnpj) return ""
        const cnpjLimpo = cnpj.replace(/\D/g, '')
        return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
    }
    const handleEditDado = (valor, field) => {
        setNovoCliente(prevState => ({
            ...prevState,
            [field]: valor,
        }))
    }
    const fetchClientes = async () => {
        try {
            const response = await getClientes()
            ///setReqstFuncionarios(data)
            setReqstClientes(response)
            setClientes(response.data.content)
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        fetchClientes()
    }, [])
    return (
        <div id='pageClientes'>
        <Header titulo={"Clientes"}></Header>
        <Nav></Nav>
        <main id='mainClientes'>
            {/* Listagem */}
            <section id='secListClientes'>
                <div id='tabelaClientes'>
                    {
                        usuario.cargo == 'adm' || usuario.cargo == 'dev' ?
                        <div id='containerH2Novo'>
                            <button onClick={() => handleShowNovoCliente()}>Novo cliente</button>
                        </div> : ''
                    }
                    <div id='cabecalho'>
                        <div id='cNome'>nome</div>
                        <div id='cCNPJ'>CNPJ</div>
                        <div id='cEndereco'>endereço</div>
                        <div></div>
                    </div>
                    <div id='listClientes'>
                    {
                        !clientes ? 
                        <Loading></Loading> :
                        clientes.map(cliente => (
                            <div key={cliente.id} className='clientes'>
                                <div className='nome'>{cliente.nome}</div>
                                <div className='cnpj'>
                                    { formatCNPJ(cliente.cnpj) }
                                </div>
                                <div className='endereco'>endereço talvez</div>
                                <div className='options' onClick={() => handleEditCliente(cliente.id)}>
                                    <img src={Edit} alt="" />
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </section>
        </main>
        {
            !showNovoCliente ? '' :
                <div id='shadowBG'>
                    <div id='contNovoCliente'>
                        <h2>Criando um novo cliente</h2>
                        <div id='nome'>
                            <label>Nome:</label>
                            <input type="text" value={novoCliente.nome || ""}
                            onChange={(e) => handleEditDado(e.target.value, "nome")}
                            />
                        </div>
                        <div id='cnpj'>
                            <label>CNPJ:</label>
                            <input type="text" value={novoCliente.cnpj || ""}
                            onChange={(e) => handleEditDado(e.target.value, 'cnpj')}
                            />
                        </div>
                        {
                            <p id='msgNovoCliente' style={{ visibility: mensagem ? 'visible' : 'hidden' }}>{mensagem || 'vazio'}</p>
                        }
                        <div id='contAcaoNovoCliente'>
                            <button id='bttCancelar' onClick={handleCancelar}>Cancelar</button>
                            <button id='bttSalvar' onClick={handleCriarCliente}>Salvar</button>
                        </div>
                    </div>
                </div>
        }
        </div>
    )
}

export default Clientes