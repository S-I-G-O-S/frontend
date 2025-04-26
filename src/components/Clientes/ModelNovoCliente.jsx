import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCliente } from '@backend/clientesAPI.js'
import { notification } from "antd";
import HeaderModal from "@components/public/HeaderModal"
import Loading from "@components/public/Loading";

const ModelNovoCliente = (props) => {
    const navigate = useNavigate()
    const [msgCNPJ, setMsgCNPJ] = useState({
        show: false,
        msg: ""
    })
    const [novoCliente, setNovoCliente] = useState({
        nome: "novo cliente",
        cnpj: "",
        contatos: [
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
    const handleCancelar = () => {
        props.changeModal(false)
        setNovoCliente(null)
    }
    const handleCriarCliente = async () => {
        if (novoCliente.nome == '') {
            notification.error({
                message: 'O nome do cliente é obrigatório.',
                description: '',
                placement: 'bottomLeft',
            })
            return
        }
        if (novoCliente.cnpj.length != 14) {
            // TODO dá pra adicionar uma verificação de CNPJ por api
            notification.error({
                message: 'CNPJ inválido',
                description: '',
                placement: 'bottomLeft',
            })
            return
        }
        const result = await postCliente(novoCliente)
        if (!result.success) {
            notification.error({
                message: 'Erro ao criar novo cliente!',
                description: '',
                placement: 'bottomLeft',
            })
            console.log(result.error)
        }
        console.warn(result)
        navigate(`/cliente?id=${result.response.data.id}`)
    }
    const handleEditDado = (valor, field) => {
        setNovoCliente(prevState => ({
            ...prevState,
            [field]: valor,
        }))
    }
    return !novoCliente ? <Loading/> : (
        <div id='contNovoCliente' className="modal">
            <HeaderModal
                title={"Criando novo cliente"}
                hasCloseBtt={true}
                closeModal={handleCancelar}/>

            <div id="contInfosNovoCliente">
                <div id='nome'>
                    <label>Nome:</label>
                    <input type="text" className={"textInput"} value={novoCliente.nome || ""}
                        onChange={(e) => handleEditDado(e.target.value, "nome")}
                    />
                </div>
                <div id='cnpj'>
                    <label>CNPJ:</label>
                    <input type="text" className={"textInput"} value={novoCliente.cnpj || ""}
                        onChange={(e) => handleEditDado(e.target.value, 'cnpj')}
                    />
                </div>
            </div>
            <div id='contAcaoNovoCliente'>
                <button id='bttCancelar' onClick={handleCancelar}>Cancelar</button>
                <button id='bttSalvar' onClick={handleCriarCliente}>Salvar</button>
            </div>
        </div>
    )
}
export default ModelNovoCliente