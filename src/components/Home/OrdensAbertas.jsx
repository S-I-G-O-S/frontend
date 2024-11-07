import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"

function OrdensAbertas() {
    const [ordensAbertas, SetOrdensAbertas] = useState(null)
    useEffect(() => {
        SetOrdensAbertas([
            {
                id: 1,
                abertura: "21/11/2024",
                cliente: {
                    nome: "Cliente 1",
                    endereco: "R. XV de novembro, 16 - Santos-SP"
                }
            }
        ])
    }, [])
    return !ordensAbertas ? (<Loading />) : (
        ordensAbertas === 'vazio' ? '' : (
            <Card
                id="contOrdensAbertas"
                title="Ordens Abertas"
                bordered={false}
            >
                {ordensAbertas.map(ordem => (
                    <div id={`ordemAberta${ordem.id}`} className="ordensAbertas ordens" key={ordem.id}>
                        <div className="nomeCliente">{ordem.cliente.nome}</div>
                        <div className="dataHora">{ordem.abertura}</div>
                        <div className="local">{ordem.cliente.endereco}</div>
                    </div>
                ))}
            </Card>
        )
    )
}
export default OrdensAbertas