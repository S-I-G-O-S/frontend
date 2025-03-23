import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { getOrdensForHome } from "../../services/backend/ordemAPI"

function OrdensEmAtendimento() {
    const navigate = useNavigate()
    const [ordensEmExecucao, setOrdensEmExecucao] = useState(null)
    const [reqstOrdensEmExecucao, setReqstOrdensEmExecucao] = useState(null)
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
        const result = await getOrdensForHome('EM_EXECUCAO')
        if (!result.success) {
            console.error(result.error)
            return
        }
        setReqstOrdensEmExecucao(result.response)
        setOrdensEmExecucao(result.response.data.content)
        console.warn(result.response)
    }
    useEffect(() => {
        fetchOrdens()
    }, [])
    return !ordensEmExecucao ? <Loading />  : (
        ordensEmExecucao.length==0 ? '' : (
            <div id="contOrdensEmAtendimento" className="contsOrdens">
                <div className="headContsOrdens">
                    <div className="titulo">Ordens em execução</div>
                    {
                        (reqstOrdensEmExecucao.data.totalElements - 5 ) > 0 &&
                        (<Link className="link" to={'/ordens?situacao=EM_EXECUCAO'}>
                            mais {reqstOrdensEmExecucao.data.totalElements - 5}
                        </Link>)
                    }
                </div>
                <div className="bodyContsOrdens">
                    {ordensEmExecucao.map(ordem => (
                        <div key={ordem.id}
                            className="ordensEmAtendimento ordens"
                            onClick={() => handleAbrirOrdem(ordem.id)}>
                            <div className="nomeCliente" title={ordem.cliente}>{ordem.cliente}</div>
                            <div className="serviço" title={ordem.servico}>{ordem.servico}</div>
                            <div className="tecnico" 
                                title={!ordem.funcionario ? '' : `${ordem.funcionario}`}>
                                {!ordem.funcionario ? 'sem técnico' : `${ordem.funcionario}`}
                            </div> 
                            <div className="dtAbertura" title={ordem.dtAbertura}>{converterDtHr(ordem.dtAbertura)}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
export default OrdensEmAtendimento