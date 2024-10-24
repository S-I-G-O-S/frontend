import { useEffect, useState } from "react"
import Loading from "../public/Loading"

function OrdensEmAtendimento() {
    const [ordensEmAtendimento, setOrdensEmAtendimento] = useState(null)
    useEffect(() => {
        setOrdensEmAtendimento('vazio')
    }, [])
    return !ordensEmAtendimento ? (<Loading />) : (
        ordensEmAtendimento === 'vazio' ? '' : (
            <div id="secOrdensSendoAtendidas">
                <h2>Ordens em atendimento</h2>
                {ordensEmAtendimento.map(ordem => (
                    <div id={`ordenSendoAtendida1${ordem.id}`} className="ordensSendoAtendidas ordens" key={ordem.id}>
                        <div className="nomeCliente">{ordem.nome}</div>
                        <div className="dataHora">{ordem.data}</div>
                        <div className="local">{ordem.endereco}</div>
                        <div className="tecnico">{ordem.tecnico}</div>
                    </div>
                ))}
            </div>
        )
    )
}
export default OrdensEmAtendimento