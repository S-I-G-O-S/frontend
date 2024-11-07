import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"

function OrdensEmAtendimento() {
    const [ordensEmAtendimento, setOrdensEmAtendimento] = useState(null)
    useEffect(() => {
        setOrdensEmAtendimento([
            {
                id: 1,
                data: "21/11/2024",
                cliente: {
                    nome: "Cliente 1",
                    endereco: "R. XV de novembro, 16 - Santos-SP"
                },
                tecnico: {
                    nome: "Jusenir Almeida"
                }
            }
        ])
    }, [])
    return !ordensEmAtendimento ? (<Loading />) : (
        ordensEmAtendimento === 'vazio' ? '' : (
            <>
            <Card
                title="Ordens em atendimento"
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
            </Card>
            </>
        )
    )
}
export default OrdensEmAtendimento