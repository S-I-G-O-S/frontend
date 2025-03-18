import { useEffect, useState } from "react"
import { getCookie } from "@services/cookies.js"
import Nav from "@components/public/Nav.jsx"
import { getClientes } from '@backend/clientesAPI.js'
import '@styles/novaOrdem.css'
import { getServicos } from "@backend/servicosAPI"
import { postNovaOrdem } from "@backend/ordemAPI"
import { notification, Popconfirm, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"
import { getUsuarioContext } from "../context/UsuarioContext"
function NovaOrdem() {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState(null)
    const [servicos, setServicos] = useState([])
    const [servico, setServico] = useState(null)
    const [formNovaOrdem, setFormNovaOrdem] = useState({
        clienteID: null,
        cliente: '',
        servicoID: null,
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
    const {usuario} = getUsuarioContext()
    const [ordemId, setOrdemID] = useState(0)
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
        }, 2000)
    }
    const changeShowComponents = (value, field) => {
        setShowComponents(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    useEffect(() => {
        if (formNovaOrdem.clienteID==null) {
            changeShowComponents(false, 'bttConfirmCliente')
        } else {
            changeShowComponents(true, 'bttConfirmCliente')
        }        
    }, [formNovaOrdem.clienteID])
    useEffect(() => {
        if (formNovaOrdem.servicoID==null) {
            changeShowComponents(false, 'bttConfirmServico')
        } else {
            changeShowComponents(true, 'bttConfirmServico')
        }        
    }, [formNovaOrdem.servicoID])
    useEffect(() => {
        if (formNovaOrdem.tecnicoID==null) {
            changeShowComponents(false, 'bttConfirmTecnico')
        } else {
            changeShowComponents(true, 'bttConfirmTecnico')
        }        
    }, [formNovaOrdem.tecnicoID])
    const confirmCliente = () => {
        const clienteToAdd = clientes.find(cliente => cliente.id === formNovaOrdem.clienteID)
        //  Se o cliente inserido não existir
        if(!clienteToAdd) {
            console.error("Cliente não encontrado")
            handleChangeNovaOrdem('', 'cliente')
            showNotif('Cliente não encontrado.')
            return
        }
        console.warn(clienteToAdd)
        // handleChangeNovaOrdem(clienteToAdd.id, 'clienteID')
        setCliente(clienteToAdd)
        handleChangeNovaOrdem(null, 'tecnicoID')
        handleChangeNovaOrdem(null, 'servicoID')
        changeShowComponents(true, 'contServico')
    }
    const confirmServico = () => {
        const servicoToAdd = servicos.find(servico => 
            servico.id === formNovaOrdem.servicoID
        )
        //  Se o serviço inserido não existir
        if (!servicoToAdd) {
            console.error("Serviço não encontrado.")
            handleChangeNovaOrdem('', 'servico')
            showNotif('Serviço não encontrado.')
            return
        }
        console.warn(servicoToAdd)
        // handleChangeNovaOrdem(servicoToAdd.id, 'servicoID')
        handleChangeNovaOrdem(null, 'tecnicoID')
        setServico(servicoToAdd)
        changeShowComponents(true, 'contFinalizar')
    }
    const handleGerarOrdem = async () => {
        const result = await postNovaOrdem(formNovaOrdem)
        if (!result.success) {
            console.error(result.error)
            showNotif('Erro ao gerar ordem')
            return
        }
        console.warn(result?.response)
        notification.success({
            message: 'Ordem gerada com sucesso.',
            // description: 'Reconecte-se a internet',
            placement: 'bottomLeft',
        })
        setTimeout(() => {
            navigate(`/ordem?id=${result.response.data.id}`)
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
        const result = await getServicos()
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.info('SERVIÇOS')
        console.warn(result.response)
        setServicos(result.response.data.content)
    }
    const fetchClientes = async () => {
        const result = await getClientes()
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.info('CLIENTES')
        console.warn(result.response)
        setClientes(result.response.data.content)
    }
    useEffect(() => {
        console.clear()
        fetchClientes()
        fetchServicos()
    }, [])
    return (
        <div id="pageNovaOrdem" className="paginas">
        {/* <Header titulo={"Nova ordem de serviço"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainNovaOrdem">
            <section id="sec1">
                <div id="contCliente">
                    <label>Cliente: </label>
                    {/* <input type="text"  
                        list='dtListClientes' 
                        value={formNovaOrdem.cliente}
                        onChange={(e) => handleChangeNovaOrdem(e.target.value, 'cliente')}
                        />
                    <datalist id="dtListClientes">
                        {(clientes && clientes.length>0) && (
                            clientes.map(cliente => (
                                <option key={`cliente${cliente.id}`} value={cliente.nome}>{cliente.nome}</option>
                            ))
                        )}
                    </datalist> */}
                    <Select
                        className="selectNovaOrdem"
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={formNovaOrdem.clienteID}
                        // onSelect={(value) => console.log('cliente selecionado: ' + value)}
                        onSelect={(value) =>( 
                            handleChangeNovaOrdem(value, 'clienteID'),
                            console.log('valor atual do cliente: ' + value)
                        )}
                        options={clientes.map(cliente => (
                            {
                                value: cliente.id,
                                label: `${cliente.nome}`
                            }
                        ))}
                        style={{
                            width: '100%',
                        }}
                    />
                    {showComponents.bttConfirmCliente && (
                        <button onClick={confirmCliente}>Confirmar</button>
                    )}
                </div>
                {(showComponents.contServico &&
                    cliente) && (
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
                        {/* <input type="text"  
                            list='dtListServicos' 
                            value={formNovaOrdem.servico}
                            onChange={(e) => handleChangeNovaOrdem(e.target.value, 'servico')}
                            />
                        <datalist id="dtListServicos">
                            {(servicos && servicos.length>0) && (
                                servicos.map(servico => (
                                    <option key={`servico${servico.id}`} value={servico.nome}>{servico.nome}</option>
                                ))
                            )}
                        </datalist> */}
                        <Select
                        className="selectNovaOrdem"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={formNovaOrdem.servicoID}
                            onSelect={(value) => 
                                console.log('servico selecionado: ' + value)
                            }
                            onChange={(value) =>( 
                                handleChangeNovaOrdem(value, 'servicoID'),
                                console.log('valor atual do servico: ' + value)
                            )}
                            options={servicos.map(servico => (
                                {
                                    value: servico.id,
                                    label: `${servico.nome}`
                                }
                            ))}
                            style={{
                                width: '100%',
                            }}
                        />
                        {showComponents.bttConfirmServico && (
                            <button onClick={confirmServico}>Confirmar</button>
                        )}
                    </div>
                    {(showComponents.contFinalizar && servico) && (
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
                    )}
                    </>
                )}
            </section>
        </main>
        </div>
    )
}
export default NovaOrdem