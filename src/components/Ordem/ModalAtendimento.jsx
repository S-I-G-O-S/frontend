import "@styles/ordem/modalAtendimento.css"
import { useState } from "react"

export default function ModalAtendimento ({changeModal, atendimento, situacao}) {
    const [formAtendimento, setFormAtendimento] = useState({
        getAtendimentos: "",
    })
    return (
        <section id="secRegisAtendimento">
            <h2>Registrando atendimento</h2>
            <div id="contDscrAtendimento">
                <label>Descrição do atendimento: </label>
                <input id="inpDscrAtendimento" />
            </div>
            <div id="contAcoesAtendimento">
                <button onClick={() => changeModal(false)}>cancelar</button>
                <button>finalizar</button>
            </div>
        </section>
    )
}