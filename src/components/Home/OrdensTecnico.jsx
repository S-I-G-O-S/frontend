import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Link, useNavigate } from "react-router-dom"
import { getOrdensForHome, getOrdensPorTecnicoForHome } from "../../services/backend/ordemAPI"
import {converterDtHr} from "@services/utils.jsx"
import { converterSituacao } from "@services/utils"
function OrdensTecnico({idTecnico}) {
    const navigate = useNavigate()
    const [ordens, setOrdens] = useState(null)
    const [reqstOrdens, setReqstOrdens] = useState(null)
    /*
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
    */
    const handleAbrirOrdem = (idOrdem) => {
        navigate(`/ordem?id=${idOrdem}`)
    }
    /*
    const fetchOrdens = async () => {
        let ordens = new Map()
        for (let situacao of situacoes) {
            const result = await getOrdensPorTecnicoForHome(espec)
            if (!result.success) {
                console.error(result.error)
                continue
            }
            result.response.data.content.forEach(tecnico => {
                ordens.set(ordem.id, ordem)
            })
        }
        setOrdens(Array.from(ordens.values()))
    }
    */
    const fetchOrdens = async () => {
        const result = await getOrdensPorTecnicoForHome(idTecnico)
        if (!result.success) {
            console.error(result.error)
            return
        }
        const ordensAbertas = result.response.data.content.filter(ordem => (
            ordem.situacao === 'PENDENTE' || 
            ordem.situacao === 'EM_EXECUCAO' ||  
            ordem.situacao === 'RETORNO'
        ))
        // setReqstOrdens(result.response)
        setOrdens(ordensAbertas)
        console.warn(result.response)
    }
    useEffect(() => {
        fetchOrdens()
    }, [])
    return !ordens ? <Loading/>  : (
        ordens.length==0 ? 
        // TODO Mostrar ao tecnico que ele não tem ordens abertas
        <div className="constOrdens">
            <p>sem ordens abertas</p>
        </div> 
        : (
            <div id="contOrdensTecnico" className="contsOrdens">
                <div className="headContsOrdens">
                    <div className="titulo">Suas ordens abertas</div>
                    {(ordens.length > 5)  && (
                        <Link className="link" to={'/atendimentos'}>
                            mais {ordens.length - 5}
                        </Link>
                    )}
                </div>
                <div className="bodyContsOrdens">
                    {ordens.map(ordem => (
                        <div key={ordem.id}
                            className="ordens ordensTecnico"
                            onClick={() => handleAbrirOrdem(ordem.id)}>
                            <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className={`situacao situacao${ordem.situacao}`}>{converterSituacao(ordem.situacao)}</div>
                            <div className="serviço">{ordem.servico}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
export default OrdensTecnico