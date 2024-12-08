import {getPageClientes, postCliente} from '../services/backend/clientesAPI.js'
import { getCookie } from '../services/cookies.js'

import Nav from './public/Nav'
import Loading from './public/Loading.jsx'
import '../styles/clientes.css'
import Header from './public/Header'
import Edit from '../assets/edit-text.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { notification, Pagination } from 'antd'
import { HomeFilled, EditFilled, CloseOutlined }  from '@ant-design/icons'


function Clientes() {
    const navigate = useNavigate();
    const [reqstClientes, setReqstClientes] = useState()
    const [clientes, setClientes] = useState()
    const [novoCliente, setNovoCliente] = useState(null)
    const [showNovoCliente, setShowNovoCliente] = useState(null)
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const [filtros, setFiltros] = useState({
        nome: null,
        cnpj: null,
        ativo: null
    })
    const handleCancelar = () => {
        setShowNovoCliente(null)
        setNovoCliente(null)
    }
    const handleCriarCliente = async () => {
        if (novoCliente.nome == '' ) {
            // setMensagem('O nome do cliente é obrigatório.')
            // setTimeout(() => {
            //     setMensagem(null)
            // }, 5000)
            notification.error({
                message: 'O nome do cliente é obrigatório.',
                description: '',
                placement: 'bottomLeft',
            })
            return 
        }
        if ( novoCliente.cnpj.length != 14) {
            // TODO dá pra adicionar uma verificação de CNPJ por api
            // setMensagem('CNPJ inválido')
            // setTimeout(() => {
            //     setMensagem(null)
            // }, 5000)
            notification.error({
                message: 'CNPJ inválido',
                description: '',
                placement: 'bottomLeft',
            })
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
    const fetchClientes = async (pagina) => {
        try {
            const response = await getPageClientes(pagina, filtros)
            ///setReqstFuncionarios(data)
            setReqstClientes(response)
            setClientes(response.data.content)
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    const changePage = (current, pageSize) => {
        fetchClientes((current - 1))
    }
    useEffect(() => {
        console.clear()
        fetchClientes(0)
    }, [])
    return (
        <div id='pageClientes' className='paginas'>
        <Header titulo={"Clientes"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id='mainClientes'>
            {/* Listagem */}
            <section id='secListClientes'>
                {
                    usuario.cargo == 'ADM' || usuario.cargo == 'DEV' ?
                    <div id='containerH2Novo'>
                        <button onClick={() => handleShowNovoCliente()}>Novo cliente</button>
                    </div> : ''
                }
                <table id='tabelaClientes'>
                    <thead>
                    <tr id='cabecalho'>
                        <th id='cNome'>nome</th>
                        <th id='cCNPJ'>CNPJ</th>
                        <th id='cEndereco'>endereço</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody id='listClientes'>
                    {
                        !clientes ? 
                        <Loading></Loading> :
                        clientes.map(cliente => (
                            <tr key={cliente.id} className='clientes'>
                                <td className='nome'>{cliente.nome}</td>
                                <td className='cnpj'>
                                    { 
                                        cliente.cnpj ? 
                                        formatCNPJ(cliente.cnpj) :
                                        'CNPJ não registrado'
                                    }
                                </td>
                                <td className='endereco'>
                                {
                                    cliente.endereco.logradouro!='' ?
                                    (
                                        <>
                                        {cliente.endereco.logradouro}
                                        {   
                                            cliente.endereco.numero!='' &&
                                            (
                                                <>
                                                , {cliente.endereco.numero}
                                                </>
                                            )
                                        }
                                        {   
                                            cliente.endereco.complemento!='' &&
                                            (
                                                <>
                                                , {cliente.endereco.complemento}
                                                </>
                                            )
                                        }
                                        </>
                                    ) :
                                    'Endereço não registrado'
                                }
                                </td>
                                <td className='options' onClick={() => handleEditCliente(cliente.id)}>
                                    {/* <img src={Edit} alt="" /> */}
                                    <EditFilled />
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className='paginacao'>
                    {
                        !reqstClientes ? '' :
                        // renderPaginas()
                        <Pagination 
                            defaultCurrent={1} 
                            total={reqstClientes.data.totalPages}
                            disabled={reqstClientes.data.totalPages == 1}
                            pageSize={1}
                            responsive
                            showSizeChanger={false}
                            onChange={changePage}
                            theme={{
                                token: {

                                }
                            }}
                            />
                    }
                </div>
            </section>
        </main>
        {
            !showNovoCliente ? '' :
                <div id='shadowBG'>
                    <div id='contNovoCliente'>
                        <div id='contHeadNovoCliente'>
                            <h2>Criando um novo cliente</h2>
                            <div id='closeModel' onClick={handleCancelar}>
                                <CloseOutlined />
                            </div>
                        </div>
                        <div id="contInfosNovoCliente">
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
                        </div>
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