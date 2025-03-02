import { useEffect, useState } from "react"
import { getTecnicosPorEspecialidade } from "../../services/backend/funcionariosAPI"

//  TODO Fazer a validação de props: https://dev.to/vinod3d/props-validation-in-react-4ga0
export default function ModalTecnicos ({handleDesignarTecnico, especialidades, changeModal}) {
    const [tecnicos, setTecnicos] = useState([])
    const [tecnico, setTecnico] = useState(null)
    const fetchTecnicos = async () => {
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
    }
    useEffect(() => {
        // if (tecnicos) {return}
        fetchTecnicos()
    }, [])
    return (
        <div id="modalTecnicos">
            <h2>Funcionarios aptos</h2>
            <ul id="listTecnicos">
            {
                !tecnicos ? 
                <div>sem tecnicos competentes</div> :
                tecnicos.map(tecnico => (
                    <li key={`tecnico${tecnico.id}`}>
                        {tecnico.primeiro}{tecnico.ultimo}
                    </li>
                )) 
            }
            </ul>
            <button onClick={() => changeModal(false)}>fechar</button>
        </div>
    )
}