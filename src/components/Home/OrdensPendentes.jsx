import { useEffect, useState } from "react"
import Loading from "../public/Loading"
import { Card } from "antd"
import { getOrdensForHome } from "../../services/backend/ordemAPI"

function OrdensPendentes() {
    const [ordensPendentes, SetOrdensPendentes] = useState(null)
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
    const fetchOrdens = async () => {
        try {
            const result = await getOrdensForHome('PENDENTE')
            SetOrdensPendentes(result.data.content)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchOrdens()
    }, [])
    return !ordensPendentes ? (<Loading />) : (
        ordensPendentes === 'vazio' ? '' : (
            <Card
                id="contOrdensAbertas"
                title="Ordens Pendentes"
                bordered={false}
            >
                {ordensPendentes.map(ordem => (
                    <div className="ordensAbertas ordens" key={ordem.id}>
                        <div className="nomeCliente">{ordem.cliente}</div>
                        <div className="serviço">{ordem.servico}</div>
                        <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                    </div>
                ))}
            </Card>
        )
    )
}
export default OrdensPendentes