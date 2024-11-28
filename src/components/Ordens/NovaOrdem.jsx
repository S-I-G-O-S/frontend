import { useEffect, useState } from "react"
import { getCookie } from "../../services/cookies"
import Header from "../public/Header"
import Nav from "../public/Nav"
import { useNavigate } from "react-router-dom"
import { getClientes } from "../../services/backend/clientesAPI"
import { getFuncionarioPorID, getTecnicos } from "../../services/backend/funcionariosAPI"
import '../../styles/ordens/novaOrdem.css'
import { getServicos } from "../../services/backend/servicosAPI"
import { notification, Popconfirm } from "antd"
import TextArea from "antd/es/input/TextArea"
import { postNovaOrdem } from "../../services/backend/ordemAPI"
function NovaOrdem() {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState({})
    const [servicos, setServicos] = useState([])
    const [servico, setServico] = useState({})
    const [formNovaOrdem, setFormNovaOrdem] = useState({
        clienteID: '',
        cliente: '',
        servicoID: '',
        servico: '',
        descricao: ''
    })
    const [showComponents, setShowComponents] = useState({
        bttConfirmCliente: false,
        infosCliente: false,
        contServico: false,
        bttConfirmServico: false,
        contFinalizar: false
    }) 
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const handleChangeNovaOrdem = (value, field) => {
        setFormNovaOrdem(prevState => ({
            ...prevState,
            [field]: value
        }))
        setTimeout(() => {
            if (field!= 'criadoPor' &&
                field!='cliente' && 
                field!='tecnico' && 
                field!='servico') {
                console.log('ALTERANDO FORMULARIO')
                console.table(formNovaOrdem)
            }
        }, 1000)
    }
    const changeShowComponents = (value, field) => {
        setShowComponents(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    useEffect(() => {
        if (formNovaOrdem.cliente=='') {
            changeShowComponents(false, 'bttConfirmCliente')
        } else {
            changeShowComponents(true, 'bttConfirmCliente')
        }        
    }, [formNovaOrdem.cliente])
    useEffect(() => {
        if (formNovaOrdem.servico=='') {
            changeShowComponents(false, 'bttConfirmServico')
        } else {
            changeShowComponents(true, 'bttConfirmServico')
        }        
    }, [formNovaOrdem.servico])
    const confirmCliente = () => {
        const clienteToAdd = clientes.find(cliente => cliente.nome.toLowerCase() === formNovaOrdem.cliente.toLowerCase())
        //  Se o cliente inserido não existir
        if(!clienteToAdd) {
            console.error("Cliente não encontrado")
            handleChangeNovaOrdem('', 'cliente')
            showNotif('Cliente não encontrado.')
            return
        }
        console.warn(clienteToAdd)
        handleChangeNovaOrdem(clienteToAdd.id, 'clienteID')
        setCliente(clienteToAdd)
        fetchServicos()
        changeShowComponents(true, 'contServico')
    }
    const confirmServico = () => {
        const servicoToAdd = servicos.find(servico => servico.nome.toLowerCase() === formNovaOrdem.servico.toLowerCase())
        //  Se o serviço inserido não existir
        if(!servicoToAdd) {
            console.error("Serviço não encontrado.")
            handleChangeNovaOrdem('', 'servico')
            showNotif('Serviço não encontrado.')
            return
        }
        console.warn(servicoToAdd)
        handleChangeNovaOrdem(servicoToAdd.id, 'servicoID')
        setServico(servicoToAdd)
        changeShowComponents(true, 'contFinalizar')
    }
    const handleGerarOrdem = async () => {
        try {
            const result = await postNovaOrdem(formNovaOrdem)
            console.warn(result?.response)
        } catch (error) {
            console.error(error?.message)
            showNotif('Erro ao gerar ordem')
        }
        notification.success({
            message: 'Ordem gerada com sucesso.',
            // description: 'Reconecte-se a internet',
            placement: 'bottomLeft',
        })
        setTimeout(() => {
            goToOrdens()
        }, 1000)
    }
    const handleCancel = () => {
        goToOrdens()
    }
    const showNotif = (message) => {
        notification.error({
            message ,
            // description: 'Reconecte-se a internet',
            placement: 'bottomLeft',
        })
    }
    const goToOrdens = () => {
        navigate(`/ordens`)
    }
    const fetchServicos = async () => {
        try {
            const response = await getServicos()
            console.warn(response)
            setServicos(response.content)
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchClientes = async () => {
        try {
            const response = await getClientes()
            setClientes(response.data.content)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        console.clear()
        setTimeout(() => {
            fetchClientes()
        }, 100)
    }, [])
    return (
        <div id="pageNovaOrdem" className="paginas">
        <Header titulo={"Nova ordem de serviço"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainNovaOrdem">
            <section id="sec1">
                <div id="contCliente">
                    <label>Cliente: </label>
                    <input type="text"  
                        list='dtListClientes' 
                        value={formNovaOrdem.cliente}
                        onChange={(e) => handleChangeNovaOrdem(e.target.value, 'cliente')}
                        />
                    <datalist id="dtListClientes">
                        {
                            clientes && [
                                clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.nome}>{cliente.nome}</option>
                                ))
                            ]
                        }
                    </datalist>
                    {
                        showComponents.bttConfirmCliente &&
                        <button onClick={confirmCliente}>Confirmar</button>
                    }
                </div>
                {
                    showComponents.contServico &&
                    cliente && 
                    <>
                    <div id="contInfosCliente">
                        <div id="sub1ContInfosCliente">
                            <div>Nome: {cliente.nome}</div>
                            <div>CNPJ: {cliente.cnpj}</div>
                        </div>
                        <div id="sub2ContInfosCliente">
                            <div>Endereço: {cliente.endereco.logradouro}, {cliente.endereco.numero}, {cliente.endereco.complemento} - {cliente.endereco.bairro}, {cliente.endereco.cidade}-{cliente.endereco.uf} CEP: {cliente.endereco.cep}</div>
                        </div>
                    </div>
                    <div id="contServico">
                        <label>Serviço: </label>
                        <input type="text"  
                            list='dtListServicos' 
                            value={formNovaOrdem.servico}
                            onChange={(e) => handleChangeNovaOrdem(e.target.value, 'servico')}
                            />
                        <datalist id="dtListServicos">
                            {
                                servicos && 
                                servicos.map(servico => (
                                    <option key={servico.id} value={servico.nome}>{servico.nome}</option>
                                ))
                            }
                        </datalist>
                        {
                            showComponents.bttConfirmServico &&
                            <button onClick={confirmServico}>Confirmar</button>
                        }
                    </div>
                    {
                        showComponents.contFinalizar &&
                        servico &&
                        <>
                        <div id="contInfosServico">
                            <div id='nomeServico'>{servico.nome}</div>
                            <div id="descricaoServico">{servico.descricao}</div>
                        </div>
                        <div id="contDescricao">
                            <label>Descrição: </label>
                            <TextArea
                                id="txtDescricao"
                                value={formNovaOrdem.descricao}
                                onChange={(e) => handleChangeNovaOrdem(e.target.value, 'descricao')}
                                placeholder="Opcional"
                                maxLength={250}
                                autoSize={{
                                minRows: 2,
                                maxRows: 6,
                                }}
                                style={{
                                    resize: 'none'
                                }}
                            />
                        </div>
                        <div id="contFinalizar">
                            <button id="bttCancelar" onClick={handleCancel}>cancelar</button>
                            <Popconfirm
                                title=""
                                description={`Confirma os dados inseridos?`}
                                onConfirm={handleGerarOrdem}
                                onCancel={null}
                                okText="sim"
                                cancelText="não">     
                                <button id='bttGerarOrdem'>Gerar Ordem</button>
                            </Popconfirm>
                        </div>
                        </>
                    }
                    </>
                }
            </section>
        </main>
        </div>
    )
}
export default NovaOrdem