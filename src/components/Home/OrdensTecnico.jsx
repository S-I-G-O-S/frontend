import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { getOrdensForHome } from "../../services/backend/ordemAPI"

function OrdensTecnico({idTecnico}) {
    const navigate = useNavigate()
    const [ordens, setOrdens] = useState(null)
    const [reqstOrdens, setReqstOrdens] = useState(null)
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
        try {
            const result = await getOrdensPorTecnicoForHome(idTecnico)
            setReqstOrdensEmExecucao(result.response)
            setOrdensEmExecucao(result.response.data.content)
            console.warn(result.response)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchOrdens()
    }, [])
    return !ordens ? <Loading />  : (
        ordens.length==0 ? 
        // TODO Mostrar ao tecnico que ele não tem ordens abertas
        '' 
        : (
            <div id="contOrdensTecnico" className="contsOrdens">
                <div className="headContsOrdens">
                    <div className="titulo">Ordens em execução</div>
                    {
                        (reqstOrdens.data.totalElements - 5 ) > 0 &&
                        (<Link className="link" to={'/atendimentos'}>
                            mais {reqstOrdens.data.totalElements - 5}
                        </Link>)
                    }
                </div>
                <div className="bodyContsOrdens">
                    {ordens.map(ordem => (
                        <div key={ordem.id} on
                            className="ordens"
                            onClick={() => handleAbrirOrdem(ordem.id)}>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className="serviço">{ordem.servico}</div>
                            <div className="dtAbertura">16/11/2024, 06:02</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
export default OrdensTecnico