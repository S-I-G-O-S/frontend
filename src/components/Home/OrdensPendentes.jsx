import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"
import { getOrdensForHome } from "../../services/backend/ordemAPI"
import { Link, useNavigate } from "react-router-dom"
import { checkAuthError } from "../../router/checkAuthError"

function OrdensPendentes() {
    const navigate = useNavigate()
    const [ordensPendentes, setOrdensPendentes] = useState(null)
    const [reqstOrdensPendentes, setReqstOrdensPendentes] = useState(null)
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
    const handleAbrirOrdem = (idOrdem) => {
        navigate(`/ordem?id=${idOrdem}`)
    }
    const fetchOrdens = async () => {
        const result = await getOrdensForHome('PENDENTE')
        if (!result.success) {
            checkAuthError(result.error)
            console.error(result.error)
            return
        }
        setReqstOrdensPendentes(result.response)
        setOrdensPendentes(result.response.data.content)
        console.warn(result.response)
    }
    useEffect(() => {
        fetchOrdens()
    }, [])
    return !ordensPendentes ? <Loading /> : (
        ordensPendentes.length==0 ? '' : (
            <div id="contOrdensPendentes" className="contsOrdens">
                <div className="headContsOrdens">
                    <div className="titulo">Ordens Pendentes</div>
                    {
                        (reqstOrdensPendentes.data.totalElements - 5 ) > 0 &&
                        (<Link className="link" to={'/ordens?situacao=PENDENTES'}>
                            mais {reqstOrdensPendentes.data.totalElements - 5}
                        </Link>)
                    }
                </div>
                <div className="bodyContsOrdens">
                    {ordensPendentes.map(ordem => (
                        <div key={ordem.id}
                            className="ordensPendentes ordens" 
                            onClick={() => handleAbrirOrdem(ordem.id)}>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className="serviço">{ordem.servico}</div>
                            <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
export default OrdensPendentes