
import {getClientePorID, postCliente, putCliente, deleteCliente, putContato, postContato, deleteContato, getContatosPorID} from '../../services/backend/clientesAPI.js'

import Nav from '../public/Nav'
import '../../styles/cliente.css'
import Header from '../public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cepAPI } from '../../services/cepAPI.js'
import Loading from '../public/Loading.jsx'
import { getCookie } from '../../services/cookies.js'
import { getOrdens, getOrdensPorCliente } from '../../services/backend/ordemAPI.js'
import { Pagination } from 'antd'

function Cliente() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idCliente = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [reqstCliente, setReqstCliente] = useState()
    const [cliente, setCliente] = useState()
    const [msgCEP, setMsgCEP] = useState()
    
    const [historico, setHistorico] = useState(null)
    const [reqstHistorico, setReqstHistorico] = useState(null)

    const [viewContContato, setViewContContato] = useState(false)
    const [contato, setContato] = useState(null)
    const [countContatos, setCountContatos] = useState(0)
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    // CONTATOS
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
    const handleEditContato = (valor, field) => {
        setContato(prevState => ({
            ...prevState,
            [field]: valor,
        }))
    }
    const handleDeletarContato = async (idContato) => {
        if (cliente.contatos.length <= 1) {
            window.alert("O cliente DEVE conter ao menos 1 contato.")
            return
        }
        if (window.confirm("Deseja APAGAR este contato de "+ cliente.nome +"?")){
            let result
            try {
                result = await deleteContato(idContato)
                console.warn(result.response)
            } catch (err) {
                console.error(err)
            }
            if (result.success) {
                setCliente(prevCliente => ({
                    ...prevCliente,
                    contatos: prevCliente.contatos.filter(c => c.id !== idContato)
                }))
            } else {
                console.error(result.error)
            }
        }
    }
    const handleAddContato = async () => {
        if (contato.nome == '') {
            return
        }
        let result
        console.log('salvando contato:')
        console.log(contato)
        try {
            if ('id' in contato) {
                result = await putContato(contato)
            } else {
                result = await postContato(contato)
            }
            console.warn(result.response)
        } catch (err) {
            console.error(err)
        }
        if (result.success) {
            console.warn(result.response.data)
            // if ('id' in contato) {
            //     fetchContatos()
            // } else {
            // }
            const novoContato = result.response.data
            setCliente(prevCliente => ({
                ...prevCliente,
                contatos: prevCliente.contatos.some(c => c.id === novoContato.id)
                    ? prevCliente.contatos.map(c => c.id === novoContato.id ? novoContato : c)  // Atualiza o contato se ele já existir
                    : [...prevCliente.contatos, novoContato]  // Adiciona um novo contato se ele não existir
            }))
            handleViewContContato(null)
        } else {
            window.alert("Erro ao salvar este contato")
        }
    }
    const handleViewContContato = (idContato) => {   // Alterna o estado da janela de edição do cliente
        if(viewContContato) {
            // Se tiver aberto, será fechado
            setContato(null)
            setViewContContato(false)
        } else {
            // Se tiver fechado, será carregado um novo objeto p/ o contato
            if (idContato == 'novo') {
                setContato({
                    nome: "",
                    cliente: cliente.id,
                    descricao: "",
                    telefone: "",
                    email: ""
                })
            } else {
                let contatoSelecionado = cliente.contatos.find(contato => contato.id === idContato)
                setContato(contatoSelecionado)
            }
            setViewContContato(true)
        }
    }
    // INFOS
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
        // formatarCNPJ(cliente?.cnpj)
    }
    const handleDelete = async () =>  {
        if(!window.confirm("Deseja APAGAR o cliente " + cliente.nome + "?")) {
            return
        }
        const result = await deleteCliente(cliente.id);
        console.warn(result.response)
        if (result.success) {
            window.alert("Cliente excluído com sucesso")
        } else {
            console.error(result.error)
        }
        handleVoltar()
    }
    const handleVoltar = () => {
        navigate(`/clientes`)
    }
    const handleSalvar = async () => {
        if (cliente.contatos.length < 1) {
            window.alert("Cliente não enviado por falta de contato.")
            return
        }
        if (cliente.nome == '' || cliente.cnpj.length < 14) {
            window.alert("O nome e o CNPJ do cliente são obrigatórios!")
            return
        }
        if (idCliente != null) {
            let response
            if (window.confirm("Deseja sobreescrever o cliente "+ cliente.nome +"?" )) {
                try {
                    response = await putCliente(cliente)
                    console.warn(response)
                    window.alert("Cliente atualizado com sucesso!")
                } catch (err) {
                    console.error(err.message)
                    return
                }
            } else {
                try {
                    response = await postCliente(cliente)
                    console.warn(response)
                    window.alert("Cliente criado com sucesso!")
                } catch (err) {
                    console.error(err.message)
                    return
                }
            }
            handleVoltar()
        }
    }

    // HISTORICO DE ORDENS
    const converterDtHr = (dataHora) => {
        const [dia, mes, anoHora] = dataHora.split('-')
        const [ano, hora] = anoHora.split(' ')
        const dataISO = `${ano}-${mes}-${dia}T${hora}`

        const data = new Date(dataISO);
        if (isNaN(data.getTime())) return "Data Inválida"
            return data.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }
    // REQUISIÇÕES
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
    const fetchContatos = async () => {
        let response
        try {
            response = await getContatosPorID(cliente.id)
            setReqstCliente(response)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
            return
        }
        setContato(prevState => ({
            ...prevState,
            contatos: response.data,
        }))
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
    
    const fecthHistOrdens = async (page) => {
        try {
            const result = await getOrdensPorCliente(page, cliente.id)
            console.warn(result.data.content)
            setReqstHistorico(result)
            setHistorico(result.data.content)
        } catch (error) {
            console.error(error)
        }
    }
    const changePage = (current, pageSize) => {
        fecthHistOrdens(current - 1)
    }
    useEffect(() => {
        if (!cliente) {
            return
        }
        fecthHistOrdens(0)
    }, cliente)
    useEffect(() => {
        console.clear()
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
        <div id="pageCliente" className='paginas'>
            <Header titulo={
                idCliente !== null
                ? ( !cliente ? 
                    `Editando cliente` :
                    `Editando cliente "${cliente.nome}"`
                )
                : 'Novo cliente'
            }
            usuario={usuario}
            ></Header>
            <Nav cargo={usuario?.cargo || ''}></Nav>
            <main id='mainCliente'>        
                <section id='secInfos'>
                    <h2>Informações do cliente</h2>
                    {
                    !cliente ? 
                    <Loading></Loading> :
                    <>
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
                    </>
                    }   
                    <div id='fimAcao'>
                        <button id='bttCancelar' onClick={handleVoltar}>Cancelar</button>
                        <button id='bttSalvar' onClick={handleSalvar}>Salvar</button>
                        <button id='bttExcluir' onClick={handleDelete}>Excluir</button>
                    </div>
                </section>
                <section id='secContatos'>
                    <div id='containerH2Novo'>
                        <h2>Contatos</h2>
                        <button id='bttNovoCtt' onClick={() => { handleViewContContato('novo')}}>novo</button>
                    </div>
                    <div id='listContatos'>
                    {
                        !cliente ? '' :
                        cliente.contatos.map(contato => (

                            <div id={`contato${contato.id}`} className='contato fechado' key={contato.id}>
                                <div className='contatoHeader'
                                >
                                    <div className='divLeftContato'>
                                        <img 
                                            id={`img${contato.id}`} 
                                            src={Down} alt="abrir"
                                            onClick={() => {verContato(contato.id)}}/>
                                        <div className='nome'>{contato.nome}</div>
                                    </div>
                                    <div className='bttsContato'>
                                        <button className='contatoEdit'
                                        onClick={() => {handleViewContContato(contato.id)}}>
                                            Editar
                                        </button>
                                        <button className='contatoExcluir'
                                        onClick={() => {
                                            handleDeletarContato(contato.id)
                                        }}>
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                                <div className='contatoBody'>
                                    <div className='contatoDescricao'>{contato.descricao}</div>
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
                    <table id='contListHistoricos'>
                    <thead>
                        <tr>
                            <th>cód.</th>
                            <th>serviço</th>
                            <th>tecnico</th>
                            <th>abertura</th>
                            <th>situação</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !historico || historico.length==0 ? 
                        <Loading></Loading> :(
                        historico.map(ordem => (
                            <tr key={ordem.id}>
                                <td>{ordem.id}</td>
                                <td>{ordem.servico}</td>
                                <td>{ordem.tecnico || 'nenhum'}</td>
                                <td>{converterDtHr(ordem.dtAbertura)}</td>
                                <td>{ordem.situacao}</td>
                            </tr>
                        ))
                        )
                    }
                    </tbody>
                    </table>
                    <div className='paginacao'>
                    {
                        historico &&
                        // renderPaginas()
                        <Pagination 
                            defaultCurrent={1} 
                            total={reqstHistorico.data.totalPages}
                            disabled={reqstHistorico.data.totalPages == 1}
                            pageSize={1}
                            responsive
                            showSizeChanger={false}
                            onChange={changePage}
                            showTitle={false}
                            />
                    }
                    </div>
                </section>
            </main>
            {
                !viewContContato ? '' :
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
                            <input type='email' value={contato.email || ""}
                            onChange={(e) => handleEditContato(e.target.value, "email")}/>
                        </div>
                        <div id='telefoneInfoNovoContato'>
                            <label>Telefone:</label>
                            <input type="text" value={contato.telefone || ""}
                            onChange={(e) => handleEditContato(e.target.value, "telefone")}/>
                        </div>
                        <div>
                            <button onClick={handleViewContContato}>cancelar</button>
                            <button onClick={handleAddContato}>Adicionar contato</button>
                        </div>
                    </section>
                </div>
            }
        </div>
    )
}

export default Cliente