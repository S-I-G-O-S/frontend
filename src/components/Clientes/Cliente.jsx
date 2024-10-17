
import {getClientePorID, postCliente, putCliente, deleteCliente} from '../../services/clientesAPI.js'

import Nav from '../public/Nav'
import '../../styles/cliente.css'
import Header from '../public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// TODO POST Cliente e Contatos tudo junto. PUT Cliente enviar PUT Contatos separados
function Cliente() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idCliente = searchParams?.get('id') ?? null
    const navigate = useNavigate();
    const [reqstCliente, setReqstCliente] = useState()
    const [cliente, setCliente] = useState()


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
    const novoCliente = () => {
        setCliente({
            nome: "novo cliente",
            cnpj: "",
            contatos: [
                {
                nome: "",
                cliente: 0,
                descricao: "",
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
    }
    const handleVoltar = () => {
        navigate(`/clientes`)
    }
    const fetchCliente = async (id) => {
        try {
            const response = await getClientePorID(id)
            setReqstCliente(response)
            setCliente(response.data)
            console.warn(reqstCliente)
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
                !cliente ? "Carregando" :
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
                            onChange={(e) => handleEditDado(e.target.value, "cnpj")}
                            />
                        </div>
                    </div>
                    <div id='endereco'>
                        <div id='cep'>
                            <label>CEP:</label>
                            <input type="text" 
                            value={cliente.endereco.cep || ""}
                            onChange={(e) => handleEditEndereco(e.target.value, "cep")}
                            />
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
                        <button id='bttExcluir'>Excluir</button>
                    </div>
                </section>
                }
                <section id='secContatos'>
                    <div id='containerH2Novo'>
                        <h2>Contatos</h2>
                        <button id='bttNovoCtt'>novo</button>
                    </div>
                    <div id='listContatos'>
                        <div id='contato1' className='contato fechado'>
                            <button className='contatoHeader'
                            onClick={() => {verContato(1)}}>
                                <img id='img1' src={Down} alt="abrir"/>
                                <div className='nome'>Fabricio</div>
                            </button>
                            <div className='contatoBody'>
                                <div className='contatoTelefone'>
                                    tel/cel: <span>(13) 99932-5555</span>
                                    
                                </div>
                                <div className='contatoEmail'>
                                    email: <span>emaildaora@outlook.com</span>
                                </div>
                                <div className='contatoDescricao'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quibusdam maiores et numquam, dignissimos quod assumenda nostrum.</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='secHistorico'>
                    <h2>Histórico de ordens</h2>
                </section>
            </main>
        </div>
    )
}

export default Cliente