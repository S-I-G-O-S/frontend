import { useEffect } from "react"
import { getAtendimentos } from "@services/backend/ordemAPI"
import { ExceptionOutlined } from '@ant-design/icons'
import "@styles/ordem/atendimentos.css"
import { converterDtHr } from "@services/utils"
const Atendimentos = ({idOrdem, atendimentos, setAtendimentos, setAtendimentoAtual}) => {
    useEffect(() => {
        if (atendimentos && atendimentos.length > 0) {
            setAtendimentoAtual(atendimentos[0].id)
            console.log("atendimento aberto: " + atendimentos[0].id)
            
            // const atendimentoAberto = clientes.find(cliente => cliente.id === formNovaOrdem.clienteID)
        }
    }, [atendimentos])
    const fetchAtendimentos = async () => {
        const result = await getAtendimentos(idOrdem)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setAtendimentos(result.response.data.content)
        console.warn(result.response)
    }  
    useEffect(() => {
        if (!idOrdem) {
            return
        }
        fetchAtendimentos()
    }, [idOrdem])
    return (
        <section id="secAtendimentos">
            <h2>Atendimentos</h2>
            {atendimentos && (
                atendimentos.length == 0 ? (
                    <div id="msgSemAtendimentos">
                        <p>sem atendimentos</p>
                        <ExceptionOutlined id="iconSemAtendimentos" />
                    </div>)
                    : (
                    <div id="contListAtendimentos">
                        {atendimentos.map(atendimento => (
                            <div
                                className="itemListAtendimento"
                                key={`atendimento${atendimento.id}`}
                            >
                                <div className="itemListAtendimentoNome">nome: {atendimento.funcionario}</div>
                                <div className="itemListAtendimentoData">data do atendimento: {converterDtHr(atendimento.dtAtendimento)}</div>
                                <div className="itemListAtendimentoDscr">descrição do atendimento: {atendimento.dsAtendimento || "sem descrição"}</div>
                            </div>
                        ))}
                    </div>)
            )}
        </section>
    )
}
export default Atendimentos;