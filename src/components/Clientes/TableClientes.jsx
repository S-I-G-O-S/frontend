import { useEffect, useState } from "react"
import Paginacao from "@components/public/Paginacao.jsx"
import Loading from "@components/public/Loading.jsx"
import { getPageClientes } from '@backend/clientesAPI.js'
import ListClientes from '@components/Clientes/ListClientes.jsx';

const TableClientes = (props) => {
    const [reqstClientes, setReqstClientes] = useState()
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const filtros = props?.filtros ||  {
		nome: null,
		cnpj: null,
		ativo: null
    }

    const changePage = (current, pageSize) => {
        fetchClientes((current - 1))
    }
    const fetchClientes = async (pagina) => {
        setLoading(true)
        const result = await getPageClientes(pagina, filtros)
        if (!result.success) {
            console.error(result.error)
        }
        setReqstClientes(result.response)
        setClientes(result.response.data.content)
        console.warn(result.response)
        setLoading(false)
    }
    useEffect(() => {
        fetchClientes(0)
    }, [])
    return loading ? (<Loading/>) : (
        <>
        <div id='contListClientes'>
            <table id='tabelaClientes'>
                <thead>
                    <tr id='cabecalho'>
                        <th id='cNome'>nome</th>
                        <th id='cCNPJ'>CNPJ</th>
                        <th id='cEndereco'>endereço</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id='listClientes'>
                    {!clientes ? (
                        <tr>
                            < td colSpan='6'>
                                <Loading />
                            </td>
                        </tr>
                    ) : (
                        <ListClientes
                            clientes={clientes}
                        />
                    )}
                </tbody>
            </table>
        </div>
        {clientes &&
            <Paginacao
                totalPages={reqstClientes.data.totalPages}
                changePage={changePage}
            />
            }
        </>
    )
}
export default TableClientes