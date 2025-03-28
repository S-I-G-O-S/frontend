import { useNavigate } from "react-router-dom"
import { formatCNPJ } from "../../services/utils"
import { EditFilled }  from '@ant-design/icons'

function ListClientes({ clientes }) {
    if (!clientes) {
        return (
            <tr>
                <td colSpan='6'>
                    sem clientes
                </td>
            </tr>
        )
    }
    const navigate = useNavigate()
    const handleEditCliente = (idCliente) => {
        navigate(`/cliente?id=${idCliente}`)
    }
    return clientes.map(cliente => (
        <tr key={cliente.id} className='clientes'>
            <td className='nome'>{cliente.nome}</td>
            <td className='cnpj'>
                {formatCNPJ(cliente.cnpj)}
            </td>
            <td className='endereco'>
            {cliente.endereco.logradouro!='' ? (
                <>
                {cliente.endereco.logradouro}
                {cliente.endereco.numero!='' && (
                    <>
                    , {cliente.endereco.numero}
                    </>
                )}
                {cliente.endereco.complemento!='' && (
                    <>
                    , {cliente.endereco.complemento}
                    </>
                )}
                </>
                ) : ('Endereço não registrado'
            )}
            </td>
            <td className='options' onClick={() => handleEditCliente(cliente.id)}>
                <EditFilled />
            </td>
        </tr>
    ))
}
export default ListClientes