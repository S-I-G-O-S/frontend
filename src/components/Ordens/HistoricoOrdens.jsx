import { useEffect, useState } from "react"
import Header from "../public/Header"
import Nav from "../public/Nav"
import  "../../styles/ordens/historicoOrdens.css";

import { getPageOrdens } from "../../services/backend/ordemAPI"
import { Pagination } from "antd"
import { getCookie } from "../../services/cookies"
import { useLocation } from "react-router-dom";
import Loading from "../public/Loading";

function HistoricoOrdens() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let situacaoParam = searchParams?.get('situacao') ?? 'default'
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const [ordens, setOrdens] = useState(null)
    const [reqstOrdens, setReqstOrdens] = useState(null)
    const [filtros, setFiltros] = useState({
        situacao: {
            value: '',
            is: false
        },
        funcionario: {
            value: '',
            is: false
        },
        servico: {
            value: '',
            is: false
        },
        qtd: 15
    })
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
    const handleChangeFilters = (value, field) => {
        setFiltros(prevState => ({
            ...prevState,
            [field]: {
                value,
                is: (value=='' || value=='default'? false : true)
            },
        }))
    }
    const handleChangeQTD = (value) => {
        setFiltros(prevState => ({
            ...prevState,
            qtd: value
        }))
        fetchFuncionarios(0)
    }
    const changePage = (current, pageSize) => {
        fetchOrdens(current - 1)
    }
    const fetchOrdens = async (pagina) => {
        try {
            const result = await getPageOrdens(pagina, filtros)
            setReqstOrdens(result)
            setOrdens(result.data.content)
            console.warn(result)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        console.clear()
        console.log('Situacao: ' + situacaoParam)
    handleChangeFilters(situacaoParam, 'situacao')
        fetchOrdens(0)
    }, [])
    return(
        <div id="pageHistOrdens" className="paginas">
        <Header titulo={"Historico de ordens"} usuario={usuario}></Header>
            <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainHistoricoOrdens">
            <section id="secHistOrdens">
            <div>

            </div>
            <table id="tableHistOrdens">
                <thead id="titleList">
                <tr>
                    <th>id</th>
                    <th>data abertura</th>
                    <th>cliente</th>
                    <th>funcionário</th>
                    <th>situação</th>
                </tr>
                </thead>
                <tbody id="listOrdens">
                    {
                        !ordens ? 
                        <tr>
                            <td colSpan='6'>
                            <Loading/>
                            </td>
                        </tr> :
                        ordens?.map(ordem => (
                            <tr id={`ordem${ordem.id}`}
                                className="ordem"
                                key={ordem.id}
                            >
                                <td>{ordem.id}</td>
                                <td>{converterDtHr(ordem.dtAbertura)}</td>
                                <td>{ordem.cliente}</td>
                                <td>{ordem.funcionario || 'nenhum'}</td>
                                <td>{ordem.situacao}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='paginacao'>
                {
                    !reqstOrdens ? '' :
                    // renderPaginas()
                    <Pagination 
                        defaultCurrent={1} 
                        total={reqstOrdens.data.totalPages}
                        disabled={reqstOrdens.data.totalPages == 1}
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
        </div>
    )
}
export default HistoricoOrdens