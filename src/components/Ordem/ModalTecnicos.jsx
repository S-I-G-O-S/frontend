import { useEffect, useState } from "react"
import { getTecnicosPorServico } from "../../services/backend/funcionariosAPI"
import "@styles/ordem/modalTecnicos.css"
import { notification } from "antd"
import { putDesignarTecnico } from "../../services/backend/ordemAPI"
import Loading from "../public/Loading"
import { ConsoleView } from "react-device-detect"
//  TODO Fazer a validação de props: https://dev.to/vinod3d/props-validation-in-react-4ga0
export default function ModalTecnicos ({ordem, changeModal, setOrdem}) {
    const [tecnicos, setTecnicos] = useState([])
    const [tecnico, setTecnico] = useState(null)
    const [loading, setLoading] = useState(true)
    const handleSelectTecnico = (id) => {
        const tecnicoToAdd = tecnicos.find(tecnico => tecnico.id === id)
        
        if(!tecnicoToAdd) {
            console.error("Tecnico não encontrado")
            return
        }
        setTecnico(tecnicoToAdd)
    }
    const handleConfirmTecnico = async () => {
        const result = await putDesignarTecnico(ordem, tecnico.id)
        if (!result.success) { 
            console.error(result.error)
            notification.error({
                message: "Erro ao designar técnico.",
                placement: "bottomLeft"
            })
            return
        }
        console.warn(result.response)
        setOrdem(result.response.data)
        changeModal("modalTecnicos", false)
        notification.success({
            message: "Um técnico designado para esta ordem.",
            placement: "bottomLeft"
        })
    }
    const fetchTecnicos = async () => {
        setLoading(true)
        const result = await  getTecnicosPorServico(ordem.servico.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setLoading(false)
        setTecnicos(result.response.data.content)
        console.warn(result.response)
    }
    useEffect(() => {
        fetchTecnicos()
    }, [])
    return (
        <section id="modalTecnicos">
            <h2>Técnicos apitos para este serviço</h2>
            <ul id="listTecnicos">
                {loading ? (<Loading />) : (
                    !tecnicos || tecnicos.length === 0 ? (
                        <div>Sem técnicos competentes</div>
                    ) : (
                        tecnicos.map(tecnico => (
                            <li 
                                key={`tecnico${tecnico.id}`} 
                                className="itemTecnicoApto" 
                                onClick={() => handleSelectTecnico(tecnico.id)}
                            >
                                {tecnico.primeiro} {tecnico.ultimo}
                            </li>
                        ))
                    )
                )}
            </ul>
            {tecnico && (
                <div id="infosTecnico">
                    <div> <strong>id:</strong> {tecnico.id}</div>
                    <div><strong>nome:</strong> {tecnico.primeiro} {tecnico.ultimo}</div>
                    <div >{!tecnico.disponivel && 'não '}disponível no momento</div>
                </div>
            )}
            <div id="contAcoesSelectTecnico">
                <button id="bttCancelSelectTecnico" onClick={() => changeModal("modalTecnicos", false)}>fechar</button>
                {tecnico && (
                    <button id="bttConfirmTecnico" onClick={handleConfirmTecnico}>confirmar</button>
                )}
            </div>
        </section>
    )
}