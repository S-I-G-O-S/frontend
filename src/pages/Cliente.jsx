import {getClientePorID, postCliente, putCliente, deleteCliente, putContato, postContato, deleteContato, getContatosPorID} from '@backend/clientesAPI.js'
import Nav from '@components/public/Nav.jsx'
import '@styles/cliente.css'
import { cepAPI } from '@services/cepAPI.js'
import Loading from '@components/public/Loading.jsx'
import { getCookie } from '@services/cookies.js'
import { getOrdensPorCliente } from '@services/backend/ordemAPI.js'
import { usePreferencias } from '@context/PreferenciasContext.jsx'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dropdown, notification, Pagination } from 'antd'
import { CloseOutlined, CommentOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons'
import { getUsuarioContext } from '../context/UsuarioContext'


function Cliente() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idCliente = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [cliente, setCliente] = useState()
    const [historico, setHistorico] = useState(null)
    const [reqstHistorico, setReqstHistorico] = useState(null)
    const [viewContContato, setViewContContato] = useState(false)
    const [contato, setContato] = useState(null)
    const { usuario } = getUsuarioContext()
    const { sessPreferencias } = usePreferencias()
    const [themeCores, setThemeCores] = useState(
        {menu: {
            bgColor: '#f7cba4',
            txtColor: '#26110D'
        }}
    )
    // CONTATOS
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
            let result = await deleteContato(idContato)
            if (!result.success) {
                console.error(result.error)
                return
            }
            console.warn(result.response)
            setCliente(prevCliente => ({
                ...prevCliente,
                contatos: prevCliente.contatos.filter(c => c.id !== idContato)
            }))
        }
    }
    const handleAddContato = async () => {
        if (contato.nome == '') {
            return
        }
        let result
        console.log('salvando contato:')
        console.log(contato)
        if ('id' in contato) {
            result = await putContato(contato)
        } else {
            result = await postContato(contato)
        }
        if (!result.success) {
            console.error(result.error)
            window.alert("Erro ao salvar este contato")
            return
        }
        console.warn(result.response)
        console.warn(result.response.data)
        const novoContato = result.response.data
        setCliente(prevCliente => ({
            ...prevCliente,
            contatos: prevCliente.contatos.some(c => c.id === novoContato.id)
                ? prevCliente.contatos.map(c => c.id === novoContato.id ? novoContato : c)  // Atualiza o contato se ele já existir
                : [...prevCliente.contatos, novoContato]  // Adiciona um novo contato se ele não existir
        }))
        handleViewContContato(null)
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
    /*
    const formatarCNPJ = (cnpj) => {
        if(cnpj == '') {return}
        const cnpjLimpo = cnpj.replace(/\D/g, '')
        handleEditDado(cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"), 'cnpj')
    }
    */
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
        if (field=='cnpj') {
            if (valor.length==14) {
                return
            }
        }
        setCliente(prevState => ({
            ...prevState,
            [field]: valor,
        }))
    }
    const formatarCNPJ = (cnpj) => {
        const cnpjLimpo = cnpj.replace(/\D/g, '');
        
        if (cnpjLimpo.length > 14) {return}

        if (cnpjLimpo.length === 0) {
            setFuncionario(prevState => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: '',
                }
            }));
            return;
        }
        let formatted = cnpjLimpo;
        //  00.623.904 /  0001-73
        //  0123456789 0  1234567
        if (cnpjLimpo.length>2) {
            formatted = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2)}`;
        }
        if (cnpjLimpo.length>6) {
            formatted = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}`;
        }
        if (cnpjLimpo.length>2) {
            formatted = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice()}`;
        }
        if (cnpjLimpo.length>2) {
            formatted = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(3)}`;
        }
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
        if (!result.success) {
            console.error(result.error)
            return
        } 
        console.warn(result.response)
        notification.success({
            message: `Cliente excluído com sucesso.`,
            // description: 'Reconecte-se a internet',
            placement: 'bottomLeft',
        })
        handleVoltar()
    }
    const handleVoltar = () => {
        navigate(`/clientes`)
    }
    const handleSalvar = async () => {
        if (cliente.contatos.length < 1) {
            window.alert("")
            notification.error({
                message: `Cliente não enviado por falta de contato.`,
                // description: 'Reconecte-se a internet',
                placement: 'bottomLeft',
            })
            return
        }
        if (cliente.nome == '' || cliente.cnpj.length < 14) {
            window.alert("")
            notification.error({
                message: `O nome e o CNPJ do cliente são obrigatórios!`,
                // description: 'Reconecte-se a internet',
                placement: 'bottomLeft',
            })
            return
        }
        if (idCliente != null) {
            if (window.confirm("Deseja sobreescrever o cliente "+ cliente.nome +"?" )) {
                const result = await putCliente(cliente)
                if (!result.success) {
                    console.error(result.error)
                    return
                }
                console.warn(result.response)
                notification.success({
                    message: `Cliente atualizado com sucesso.`,
                    // description: 'Reconecte-se a internet',
                    placement: 'bottomLeft',
                })
            } else { return }
        }
        else {
            const result = await postCliente(cliente)
            if (!result.success) {
                console.error(result.error)
                return
            }
            console.warn(result.response)
            notification.success({
                message: `Cliente criado com sucesso.`,
                // description: 'Reconecte-se a internet',
                placement: 'bottomLeft',
            })
        }
        handleVoltar()
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
            const result = await cepAPI(cep)
            if (!result.success) {
                console.error(result.error)
                notification.error({
                    message: `CEP inválido ou não encontrado`,
                    // description: 'Reconecte-se a internet',
                    placement: 'bottomLeft',
                })
                return
            }
            console.warn(result.response)
            const { street, neighborhood, city, state } = result.response.data
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
        } else {
            console.error("São necessários 8 digitos.")
            notification.error({
                message: `CEP inválido`,
                description: 'São necessários 8 digitos',
                placement: 'bottomLeft',
            })
        }
    }
    const fetchContatos = async () => {
        let response
        try {
            response = await getContatosPorID(cliente.id)
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
        const result = await getClientePorID(id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setCliente(result.response.data)
        console.warn(result.response)
        
    }
    const fecthHistOrdens = async (page) => {
        const result = await getOrdensPorCliente(page, cliente.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.warn(result.response.data.content)
        setReqstHistorico(result.response)
        setHistorico(result.response.data.content)
    }
    const changePage = (current, pageSize) => {
        fecthHistOrdens(current - 1)
    }
    useEffect(() => {
        if (!cliente) {
            return
        }
        fecthHistOrdens(0)
    }, [cliente])
    useEffect(() => {
        if (!sessPreferencias) {
            return
        }
        switch(sessPreferencias) {
            case 'salmaoLight': 
                setThemeCores({
                    menu: {
                        bgColor: '#fcd8b9',
                        txtColor: '#26110D',
                    }
                })
                break;
            default:
                console.error('Erro ao definir cor')
                break;
        }
    }, [sessPreferencias])
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
        {/* <Header titulo={
            idCliente !== null
            ? ( !cliente ? 
                `Editando cliente` :
                `Editando cliente "${cliente.nome}"`
            )
            : 'Novo cliente'
        }
        usuario={usuario}
        ></Header> */}
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
                    <button id='bttNovoCtt' onClick={() => { handleViewContContato('novo')}}>Novo</button>
                </div>
                <div id='listContatos'>
                {
                    !cliente ? '' :
                    cliente.contatos.map(contato => (
                        <>
                        {/* <div id={`contato${contato.id}`} className='contato fechado' key={contato.id}>
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
                        </div> */}
                        <div className='contato' key={`contato${contato.id}`}>
                            <div className='contContatoLeft'>
                                <h4>
                                {contato.nome}
                                </h4>
                                <p>{contato.descricao}</p>
                            </div>
                            <div className='contContatoRight'>
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
                                <Dropdown
                                    className='maisContato'
                                    trigger={'hover'}
                                    menu={{
                                        items: [
                                        // { 
                                        //     key: 1, 
                                        //     label: `${contato.descricao}`,
                                        // },
                                        { 
                                            key: 2,
                                            
                                            icon: <PhoneOutlined />,
                                            label: `${contato.telefone}`
                                        },
                                        { 
                                            key: 3, 

                                            icon: <CommentOutlined />,
                                            label: `${contato.email}`
                                        },
                                        ],
                                        style: {
                                            backgroundColor: (themeCores.menu.bgColor),
                                            color: (themeCores.menu.txtColor),
                                            borderColor: (themeCores.menu.txtColor)
                                        }
                                    }}
                                    overlayStyle={{ 
                                        border: `0.1rem solid ${themeCores.menu.txtColor}`,
                                        borderRadius: '0.3rem'
                                    }}
                                    arrow={false}
                                >
                                    <InfoCircleOutlined id='iconMaisContato'/>
                                </Dropdown>
                            </div>
                        </div>
                        </>
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
                    !historico ? (
                    <tr>
                        <td colSpan={6}>
                            <Loading></Loading> 
                        </td>
                    </tr>
                    ):(
                    historico.length==0 ? (
                        <tr>
                            <td colSpan={6}>sem ordens</td>
                        </tr>    
                        ) : (
                        historico.map(ordem => (
                            <tr key={`ordem${ordem.id}}` }>
                                <td className='cl1'>{ordem.id}</td>
                                <td className='cl2'>{ordem.servico}</td>
                                <td className='cl3'>{ordem.tecnico || 'nenhum'}</td>
                                <td className='cl4'>{converterDtHr(ordem.dtAbertura)}</td>
                                <td className='cl5'>{ordem.situacao}</td>
                            </tr>
                        ))
                    )
                    )
                }
                </tbody>
                </table>
                {(historico && reqstHistorico.data.totalPages>1) && (
                    // renderPaginas()
                    <div className='paginacao'>
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
                    </div>
                )}
            </section>
        </main>
        {
            !viewContContato ? '' :
            <div id='shadowBG'>
                <section id='secNovoContato'>
                    <div id='contHeadNovoContato'>
                        <h2>Novo Contato</h2>
                        <div 
                            id='closeModel'
                            onClick={handleViewContContato}>
                        <CloseOutlined />
                    </div>
                    </div>
                    <div id='contFormNovoContato'>
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
                            <input type='text' value={contato.email || ""}
                            onChange={(e) => handleEditContato(e.target.value, "email")}/>
                        </div>
                        <div id='telefoneInfoNovoContato'>
                            <label>Telefone:</label>
                            <input type="text" value={contato.telefone || ""}
                            onChange={(e) => handleEditContato(e.target.value, "telefone")}/>
                        </div>
                    </div>
                    <div id='contFooterNovoContato'>
                        <button id='bttCancelar' onClick={handleViewContContato}>cancelar</button>
                        <button id='bttAddContato' onClick={handleAddContato}>Adicionar contato</button>
                    </div>
                </section>
            </div>
        }
        </div>
    )
}

export default Cliente