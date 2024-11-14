import { useEffect, useState } from "react"
import { getCookie } from "../../services/cookies"
import Header from "../public/Header"
import Nav from "../public/Nav"
import { useNavigate } from "react-router-dom"
import { getClientePorID, getClientes } from "../../services/clientesAPI"
import { getTecnicos } from "../../services/funcionariosAPI"
import '../../styles/ordens/novaOrdem.css'
import { getServicos } from "../../services/servicosAPi"
//  TODO Listar funcionarios de acordo com os serviços requisitados
function NovaOrdem() {
    const [clientes, setClientes] = useState()
    const [cliente, setCliente] = useState()
    const [tecnicos, setTecnicos] = useState()
    const [servico, setServico] = useState()    // TODO ? O cliente pode pedir mais de 1 serviço junto?
    const [servicos, setServicos] = useState()
    const [formNovaOrdem, setFormNovaOrdem] = useState({
        criadoPor: '',
        clienteID: '',
        cliente: '',
        servicoID: '',
        servico: '',
        tecnicoID: '',
        tecnico: '',
        descricao: ''
    })
    const [showComponents, setShowComponents] = useState({
        bttConfirmCliente: false,
        infosCliente: false,
        contServico: false,
        bttConfirmServico: false,
        contTecnico: false,
        bttConfirmTecnico: false
    }) 
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const handleChangeNovaOrdem = (value, field) => {
        if (field!='cliente' && 
            field!='tecnico' && 
            field!='servico') {
            console.log('ALTERANDO FORMULARIO')
            console.table(formNovaOrdem)
        }
        setFormNovaOrdem(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    const changeShowComponents = (value, field) => {
        setShowComponents(prevState => ({
            ...prevState,
            [field]: value
        }))
        /*setTimeout(() => {
            console.log('DEBBUG ')
            console.table(showComponents)
        }, 1000)*/
    }
    useEffect(() => {
        // criadoPor
        // cliente
        if (formNovaOrdem.cliente=='') {
            changeShowComponents(false, 'bttConfirmCliente')
        } else {
            changeShowComponents(true, 'bttConfirmCliente')
        }        
        // servico
        // descricao
    }, [formNovaOrdem.cliente])
    useEffect(() => {
        // criadoPor
        // cliente
        if (formNovaOrdem.servico=='') {
            changeShowComponents(false, 'bttConfirmServico')
        } else {
            changeShowComponents(true, 'bttConfirmServico')
        }        
        // servico
        // descricao
    }, [formNovaOrdem.servico])
    const confirmCliente = () => {
        const clienteToAdd = clientes.find(cliente => cliente.nome.toLowerCase() === formNovaOrdem.cliente.toLowerCase())
        //  Se o cliente inserido não existir
        if(!clienteToAdd) {
            console.error("Cliente não encontrado")
            handleChangeNovaOrdem('', 'cliente')
            return
        }
        console.warn(clienteToAdd)
        handleChangeNovaOrdem(clienteToAdd.id, 'clienteID')
        setCliente(clienteToAdd)
        fetchServicos()
    }
    const confirmServico = () => {
        const servicoToAdd = servicos.find(servico => servico.nome.toLowerCase() === formNovaOrdem.servico.toLowerCase())
        //  Se o cliente inserido não existir
        if(!servicoToAdd) {
            console.error("Serviço não encontrado")
            handleChangeNovaOrdem('', 'servico')
            return
        }
        console.warn(servicoToAdd)
        handleChangeNovaOrdem(servicoToAdd.id, 'servicoID')
        setServico(servicoToAdd)
        // TODO Ajustar para procurar os tecnicos que possuam ao menos uma das especialidades do Serviço
        fetchTecnicos()
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
    const fetchTecnicos = async () => {
        try {
            const response = await getTecnicos()
            setTecnicos(response.data.content)
        } catch (error) {
            console.error(error.message)
        }
    }
    //  TODO Usar caso precise de mais info do Cliente
    const fetchCliente = async (id) => {
        try {
            const response = await getClientePorID(id)
            setCliente(response.data.content)
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchClientes = async () => {
        try {
            const response = await getClientes()
            ///setReqstFuncionarios(data)
            setClientes(response.data.content)
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            fetchClientes()
        }
        fetchData()
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
                    // showComponents.infosCliente &&
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
                        // showComponents.contTecnico &&
                        servico &&
                        <>
                        <div id="contInfosServico">
                            <div id='nomeServico'>{servico.nome}</div>
                            <div id="descricaoServico">{servico.descricao}</div>
                        </div>
                        <div id="contTecnico">
                            <label>Funcionário: </label>
                            <input type="text"  
                                list='dtListTecnicos' 
                                value={formNovaOrdem.tecnico}
                                onChange={(e) => handleChangeNovaOrdem(e.target.value, 'tecnico')}
                                />
                            <datalist id="dtListTecnicos">
                                {
                                    tecnicos && 
                                    tecnicos.map(tecnico => (
                                        <option key={tecnico.id} value={tecnico.nome}>{tecnico.nome}</option>
                                    ))
                                }
                            </datalist>
                            {
                                showComponents.bttConfirmServico &&
                                <button onClick={confirmServico}>Confirmar</button>
                            }
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