import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"
import { Link } from "react-router-dom"

function OrdensEmAtendimento() {
    const [ordensEmAtendimento, setOrdensEmAtendimento] = useState(null)
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
    useEffect(() => {
        setOrdensEmAtendimento([
            {
                id: 1,
                dtAbertura: "21/11/2024",
                cliente: "Cliente 1",
                servico: 'Configuração de Redes',
                endereco: "R. XV de novembro, 16 - Santos-SP",
                tecnico: "Jusenir Almeida"
            }
        ])
    }, [])
    return !ordensEmAtendimento ? /*(<Loading />)*/ ''  : (
        ordensEmAtendimento === 'vazio' ? '' : (
            <>
            {/* <Card
                title="Ordens em atendimento (exemplo)"
                bordered={false}
                id="secOrdensSendoAtendidas"
            >
                {ordensEmAtendimento.map(ordem => (
                    <div id={`ordenSendoAtendida1${ordem.id}`} className="ordensSendoAtendidas ordens" key={ordem.id}>
                        <div className="nomeCliente">{ordem.cliente.nome}</div>
                        <div className="dataHora">{ordem.data}</div>
                        <div className="local">{ordem.cliente.endereco}</div>
                        <div className="tecnico">{ordem.tecnico.nome}</div>
                    </div>
                ))}
            </Card> */}
            <div id="contOrdensEmAtendimento" className="contsOrdens">
                <div className="headContsOrdens">
                    <div className="titulo">Ordens Pendentes</div>
                    {
                        (6 - 5 ) > 0 &&
                        (<Link className="link" to={'/ordens?situacao=EM_EXECUCAO'}>
                            mais {6 - 5}
                        </Link>)
                    }
                </div>
                <div className="bodyContsOrdens">
                    {ordensEmAtendimento.map(ordem => (
                        <div className="ordensEmAtendimento ordens" key={ordem.id}>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className="serviço">{ordem.servico}</div>
                            <div className="dtAbertura">16/11/2024, 06:02</div>
                        </div>
                    ))}
                </div>
            </div>
            </>
        )
    )
}
export default OrdensEmAtendimento