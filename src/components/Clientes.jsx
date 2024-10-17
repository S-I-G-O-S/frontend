
import {getClientes} from '../services/clientesAPI.js'

import Nav from './public/Nav'
import '../styles/clientes.css'
import Header from './public/Header'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// TODO preenchimento campos para editar clientes
function Clientes() {
    const navigate = useNavigate();
    const [reqstClientes, setReqstClientes] = useState()
    const [clientes, setClientes] = useState()

    const handleCreateClick = () => {
        navigate(`/cliente`)
    }
    const handleEditClick = (idCliente) => {
        navigate(`/cliente?id=${idCliente}`)
    }
    const formatCNPJ = (cnpj) => {
        if (!cnpj) return ""
        const cnpjLimpo = cnpj.replace(/\D/g, '')
        return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
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
        <Header></Header>
        <Nav></Nav>
        <main id='mainClientes'>
            {/* Listagem */}
            <section id='secListClientes'>
                <div id='tabelaClientes'>
                    <div id='containerH2Novo'>
                        <h2>Clientes</h2>
                        <button onClick={() => handleCreateClick(null)}>Novo</button>
                    </div>
                    <div id='cabecalho'>
                        <div id='cNome'>nome</div>
                        <div id='cCNPJ'>CNPJ</div>
                        <div id='cEndereco'>endereço</div>
                        <div></div>
                    </div>
                    <div id='listClientes'>
                    {
                        !clientes ? "carregando..." :
                        clientes.map(cliente => (
                            <div key={cliente.id} className='clientes'>
                                <div className='nome'>{cliente.nome}</div>
                                <div className='cnpj'>
                                    { formatCNPJ(cliente.cnpj) }
                                </div>
                                <div className='endereco'>endereço talvez</div>
                                <div className='options' onClick={() => handleEditClick(cliente.id)}>
                                    editar
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </section>
        </main>
        </div>
    )
}

export default Clientes