import "@styles/ordem/modalAtendimento.css"
import { useState } from "react"
import { putConcluirAtendimento } from "../../services/backend/ordemAPI"
import UploadFiles from "./UploadFiles"
import TextArea from "antd/es/input/TextArea"

export default function ModalAtendimento({ changeModal, atendimento }) {
    const [renderFimAtendimento, setRenderFimAtendimento] = useState(false)
    const [formAtendimento, setFormAtendimento] = useState({
        idAtendimento: atendimento || 0,
        descricao: ""
    })
    const handleDescricao = (value) => {
        setFormAtendimento(prevState => ({
            ...prevState,
            descricao: value
        }))
    }
    const finalizarAtendimento = async (situacao) => {
        const result = await putConcluirAtendimento(formAtendimento, situacao)

        if (!result.success) {
            console.error(result.error)
            return
        }
        console.warn(result.response)
        console.log("Atendimento finalizado")
        changeModal(false)
    }
    return (
        <section id="secRegisAtendimento">
            <h2>Registrando atendimento</h2>
            <div id="contDscrAtendimento">
                <label>Descrição do atendimento: </label>
                <TextArea
                    id="txtDescricao"
                    value={formAtendimento.descricao}
                    onChange={(e) => handleDescricao(e.target.value)}
                    placeholder="Opcional"
                    maxLength={250}
                    autoSize={{
                        minRows: 2,
                        maxRows: 6,
                    }}
                />
            </div>
            <UploadFiles/>
            <div id="contAcoesAtendimento">
                <button id="bttCancelar" onClick={() => changeModal(false)}>cancelar</button>
                <button
                    id="bttFinalizar"
                    disabled={renderFimAtendimento}
                    onClick={() => setRenderFimAtendimento(true)}
                >finalizar</button>
            </div>
            {renderFimAtendimento && (
                <>
                <p id="perguntaAtendimento">O atendimento foi concluído?</p>
                <div id="contFinalizarAtendimento">
                    <button id="bttNaoConcluido" onClick={() => finalizarAtendimento("RETORNO")}>não concluído</button>
                    <button id="bttConcluido" onClick={() => finalizarAtendimento("FINALIZADA")}>concluído com sucesso</button>
                </div>
                </>
            )}
        </section>
    )
}