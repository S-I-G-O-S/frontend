
import {getClientePorID, postCliente, putCliente, deleteCliente} from '../../services/clientesAPI.js'

import Nav from '../public/Nav'
import '../../styles/cliente.css'
import Header from '../public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cepAPI } from '../../services/cepAPI.js'

// TODO POST Cliente e Contatos tudo junto. PUT Cliente enviar PUT Contatos separados
function Cliente() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idCliente = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [reqstCliente, setReqstCliente] = useState()
    const [cliente, setCliente] = useState()
    const [msgCEP, setMsgCEP] = useState()
    const [viewNovoContato, setViewNovoContato] = useState(false)
    const [contato, setContato] = useState(null)

    
    const formatarCNPJ = (cnpj) => {
        if(cnpj == '') {return}
        const cnpjLimpo = cnpj.replace(/\D/g, '')
        handleEditDado(cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"), 'cnpj')
    }
    const handleCEP = (value) => {
        const cep = value.replace(/\D/g, '');
        if (cep.length <= 8) {
            setCliente(prevState => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: cep,
                }
            }))
        }
    }
    const fetchCEP = async () => {
        const cep = cliente.endereco.cep.replace(/\D/g, '')
        if (cep.length === 8) {
            try {
                const response = await cepAPI(cep)
                console.warn(response)
                const { street, neighborhood, city, state } = response.data
                setCliente(prevState => ({
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
                console.error("Erro ao buscar CEP:", error)
                setMsgCEP("CEP não encontrado ou inválido.")
                setTimeout(() => {
                    setMsgCEP('')
                }, 5000)
                // alert("CEP não encontrado ou inválido.");
            }
        } else {
            console.error("São necessários 8 digitos.")
            setMsgCEP("São necessários 8 digitos.")
                setTimeout(() => {
                    setMsgCEP('')
                }, 5000)
        }
    }
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
    const handleEditDado = (valor, field) => {
        setCliente(prevState => ({
            ...prevState,
            [field]: valor,
        }))
    }
    const handleEditEndereco = (valor, field) => {
        setCliente(prevState => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                [field]: valor,
            }
        }))
    }
    const handleEditContato = () => {

    }
    const changeNovoCliente = () => {
        if(viewNovoContato) {
            setViewNovoContato(false)
        } else {
            setContato({
                nome: "",
                //  TODO Em caso de novo contato, como vai colocar o id dele aqui?
                cliente: (!idCliente ? null : cliente.id), 
                descricao: "",
                telefone: "",
                email: ""
            })
            setViewNovoContato(true)
        }
    }
    const novoCliente = () => {
        setCliente({
            nome: "novo cliente",
            cnpj: "",
            contatos: [
                // {
                // nome: "",
                // cliente: 0,
                // descricao: "",
                // telefone: "",
                // email: ""
                // }
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
        // formatarCNPJ(cliente?.cnpj)
    }
    const handleDelete = async () =>  {
        if(!window.confirm("Deseja APAGAR o cliente " + cliente.nome + "?")) {
            return
        }
        //  TODO Retornando erro 504
        const result = await deleteCliente(cliente.id);
        if (result.success) {
            window.alert("Cliente excluído com sucesso")
        } else {
            console.error(result.error)
        }
        // navigate(`/clientes`)
    }
    const handleVoltar = () => {
        navigate(`/clientes`)
    }
    const fetchCliente = async (id) => {
        try {
            const response = await getClientePorID(id)
            setReqstCliente(response)
            setCliente(response.data)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        if (idCliente) {
            try {
                fetchCliente(idCliente)
            } catch (error) {
                console.error(error.message)
            }
        } else {
            novoCliente()
        }
    }, [])
    return(
        <div id="pageCliente">
            <Header titulo={
                idCliente !== null
                ? ( !cliente ? 
                    `Editando cliente` :
                    `Editando cliente "${cliente.nome}"`
                )
                : 'Novo cliente'
            }></Header>
            <Nav></Nav>
            <main id='mainCliente'>
                {
                !cliente ? 
                <section id='secInfos'>
                    <h2>Carregando...</h2>
                </section> :
                <section id='secInfos'>
                    <h2>Informações do cliente</h2>
                    <div id='geral'>
                        <div id='nome'>
                            <label>Nome:</label>
                            <input type="text" value={cliente.nome || ""}
                            onChange={(e) => handleEditDado(e.target.value, "nome")}
                            />
                        </div>
                        <div id='cnpj'>
                            <label>CNPJ:</label>
                            <input type="text" value={cliente.cnpj || ""}
                            onChange={(e) => handleEditDado(e.target.value, 'cnpj')}
                            />
                        </div>
                    </div>
                    <div id='endereco'>
                        <div id='cep'>
                            <label>CEP:</label>
                            <input type="text" 
                            value={cliente.endereco.cep || ""}
                            onChange={(e) => handleCEP(e.target.value)}
                            />
                            <button onClick={fetchCEP}>Pesquisar CEP</button>
                            <p>{msgCEP}</p>
                        </div>
                        <div id='rua'>
                            <label>Rua/Logradouro:</label>
                            <input type="text" value={cliente.endereco.logradouro || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "logradouro")}
                            />
                        </div>
                        <div id='num'>
                            <label>Nº:</label>
                            <input type="text" value={cliente.endereco.numero || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "numero")}
                            />
                        </div>
                        <div id='complemento'>
                            <label>Complemento:</label>
                            <input type="text" value={cliente.endereco.complemento || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "complemento")}
                            />
                        </div>
                        <div id='bairro'>
                            <label>Bairro:</label>
                            <input type="text" value={cliente.endereco.bairro || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "bairro")}
                            />
                        </div>
                        <div id='cidade'>
                            <label>Cidade:</label>
                            <input type="text" value={cliente.endereco.cidade || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "cidade")}
                            />
                        </div>
                        <div id='uf'>
                            <label>UF:</label>
                            <input type="text" value={cliente.endereco.uf || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "uf")}
                            />
                        </div>
                    </div>
                    <div id='fimAcao'>
                        <button id='bttCancelar' onClick={handleVoltar}>Cancelar</button>
                        <button id='bttSalvar'>Salvar</button>
                        <button id='bttExcluir' onClick={handleDelete}>Excluir</button>
                    </div>
                </section>
                }
                <section id='secContatos'>
                    <div id='containerH2Novo'>
                        <h2>Contatos</h2>
                        <button id='bttNovoCtt' onClick={changeNovoCliente}>novo</button>
                    </div>
                    <div id='listContatos'>
                    {
                        !cliente ? '' :
                        cliente.contatos.map(contato => (
                        <div id={`contato${contato.id}`} className='contato fechado' key={contato.id}>
                            <button className='contatoHeader'
                            onClick={() => {verContato(contato.id)}}>
                                <img id={`img${contato.id}`} src={Down} alt="abrir"/>
                                <div className='nome'>{contato.nome}</div>
                                <div className='contatoDescricao'>{contato.descricao}</div>
                            </button>
                            <div className='contatoBody'>
                                <div className='contatoTelefone'>
                                    {contato.telefone}
                                    
                                </div>
                                <div className='contatoEmail'>
                                    {contato.email}
                                </div>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </section>
                <section id='secHistorico'>
                    <h2>Histórico de ordens</h2>
                </section>
            </main>
            {
                !viewNovoContato ? '' :
                <div id='shadowBG'>
                    <section id='secNovoCliente'>
                        <h2>{`Novo Contato`}</h2>
                        {/* nome: "",
                        cliente: 0,
                        descricao: "",
                        telefone: "",
                        email: "" */}
                        <div id='nomeInfoNovoContato'>
                            <label>Nome:</label>
                            <input type="text" value={contato.nome || ""}
                            onChange={(e) => handleEditContato(e.target.value, "nome")}/>
                        </div>
                        <div id='descricaoInfoNovoContato'>
                            <label>Descrição:</label>
                            <input type="text" value={contato.descricao || ""}
                            onChange={(e) => handleEditContato(e.target.value, "descricao")}/>
                        </div>
                        <div id='emailInfoNovoContato'>
                            <label>Email:</label>
                            <input type="text" value={contato.email || ""}
                            onChange={(e) => handleEditContato(e.target.value, "email")}/>
                        </div>
                        <div id='telefoneInfoNovoContato'>
                            <label>Telefone:</label>
                            <input type="text" value={contato.telefone || ""}
                            onChange={(e) => handleEditContato(e.target.value, "telefone")}/>
                        </div>
                        <div>
                            <button onClick={changeNovoCliente}>cancelar</button>
                        </div>
                    </section>
                </div>
            }
        </div>
    )
}

export default Cliente