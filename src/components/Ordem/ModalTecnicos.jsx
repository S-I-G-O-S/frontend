import { useEffect, useState } from "react"
import { getTecnicosPorServico } from "../../services/backend/funcionariosAPI"
import "@styles/ordem/modalTecnicos.css"
import { notification } from "antd"
import { putDesignarTecnico } from "../../services/backend/ordemAPI"
//  TODO Fazer a validação de props: https://dev.to/vinod3d/props-validation-in-react-4ga0
export default function ModalTecnicos ({ordem, especialidades, changeModal}) {
    const [tecnicos, setTecnicos] = useState([])
    const [tecnico, setTecnico] = useState(null)
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
        changeModal(false)
        notification.success({
            message: "Um técnico designado para esta ordem.",
            placement: "bottomLeft"
        })
    }
    const fetchTecnicos = async () => {
        /*
        let tecnicosUnicos = new Map()

        for (let espec of especialidades) {
            const result = await getTecnicosPorEspecialidade(espec)
            if (!result.success) {
                console.error(result.error)
                continue
            }
            console.warn(result.response)

            result.response.data.content.forEach(tecnico => {
                tecnicosUnicos.set(tecnico.id, tecnico)
            })
        }
        setTecnicos(Array.from(tecnicosUnicos.values()))
        */
        const result = await  getTecnicosPorServico(ordem.servico)
        if (!result.success) {
            console.error(result.error)
            return
        }
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
            {!tecnicos ? 
                <div>sem tecnicos competentes</div> :
                tecnicos.map(tecnico => (
                    <li key={`tecnico${tecnico.id}`} className="itemTecnicoApto" onClick={() => handleSelectTecnico(tecnico.id)}>
                        {tecnico.primeiro} {tecnico.ultimo}
                    </li>
                )
            )}
            </ul>
            {/* 
                {
                    "id": 5,
                    "primeiro": "Julio",
                    "ultimo": "Gomes",
                    "celular": "(12) 34567-8912",
                    "cargo": "TECNICO",
                    "ativo": true,
                    "disponivel": false,
                    "ultimaAtividade": "02-03-2025 16:39:52",
                    "especialidades": [
                        1
                    ]
                }
             */}
            {tecnico && (
                <div id="infosTecnico">
                    <div> <strong>id:</strong> {tecnico.id}</div>
                    <div><strong>nome:</strong> {tecnico.primeiro} {tecnico.ultimo}</div>
                    <div >{!tecnico.disponivel && 'não '}disponível no momento</div>
                </div>
            )}
            <button onClick={() => changeModal(false)}>fechar</button>
            {tecnico && (
                <button onClick={handleConfirmTecnico}>confirmar</button>
            )}
        </section>
    )
}