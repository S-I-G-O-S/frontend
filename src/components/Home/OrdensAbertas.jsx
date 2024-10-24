import { useEffect, useState } from "react"
import Loading from "../public/Loading"

function OrdensAbertas() {
    const [ordensAbertas, SetOrdensAbertas] = useState(null)
    useEffect(() => {
        SetOrdensAbertas('vazio')
    }, [])
    return !ordensAbertas ? (<Loading />) : (
        ordensAbertas === 'vazio' ? '' : (
            <div id="contOrdensAbertas">
                <h2>Ordens Abertas</h2>
                {ordensAbertas.map(ordem => (
                    <div id={`ordemAberta${ordem.id}`} className="ordensAbertas ordens" key={ordem.id}>
                        <div className="nomeCliente">{ordem.cliente.nome}</div>
                        <div className="dataHora">{ordem.abertura}</div>
                        <div className="local">{ordem.cliente.endereco}</div>
                    </div>
                ))}
            </div>
        )
    )
}
export default OrdensAbertas