import { converterDtHr, converterSituacao } from "@services/utils"
import Loading from "../public/Loading"
import { getArquivos, getArquivoUnico } from "@services/backend/arquivosAPI"
import { useEffect, useState } from "react"

const ModalViewAtendimento = ({ closeModal, atendimento }) => {
    const [arquivos, setArquivos] = useState([])

    const addArquivo = (arquivoUrl) => {
        setArquivos((prev) => [...prev, arquivoUrl])
    }

    const arrayBufferToDataURL = (buffer, mime = 'image/jpeg') => {
        const binary = Array.from(new Uint8Array(buffer))
            .map((b) => String.fromCharCode(b))
            .join('')
        const base64 = window.btoa(binary)
        return `data:${mime};base64,${base64}`
    }

    const getFile = async (id) => {
        try {
            const result = await getArquivoUnico(id)
            if (!result.success) throw result.error

            const mime = result.response.headers['content-type'] || 'image/jpeg'
            const dataUrl = arrayBufferToDataURL(result.response.data, mime)
            addArquivo(dataUrl)
        } catch (error) {
            console.error('Erro ao puxar imagem', id, error)
        }
    }

    const getArrayFiles = async () => {
        const result = await getArquivos(atendimento.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setArquivos([])
        const lista = result.response.data
        if (!lista.length) {
            console.log('Sem fotos neste atendimento')
            return
        }
        lista.forEach(({ id }) => getFile(id))
    }

    useEffect(() => {
        if (atendimento?.id) getArrayFiles()
    }, [atendimento?.id])

    if (!atendimento) return <Loading />

    return (
        <section id="secViewAtendimento">
            <div><strong>id:</strong> {atendimento.id}</div>
            <div><strong>técnico:</strong> {atendimento.funcionario}</div>
            <div><strong>data início:</strong> {converterDtHr(atendimento.dtAtendimento)}</div>
            <div><strong>data finalização:</strong> {converterDtHr(atendimento.dtFinal)}</div>
            <div><strong>descrição:</strong> {atendimento.dsAtendimento}</div>
            <div><strong>situação final:</strong> {converterSituacao(atendimento.dsSituacao)}</div>

            <div id="listArquivos">
                {arquivos.map((src, idx) => (
                    <img
                        key={`imagem${idx}`}
                        src={src}
                        alt={`atendimento ${idx}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                ))}
            </div>

            <div id="acoesViewAtendimento">
                <button id="sair" onClick={closeModal}>sair</button>
            </div>
        </section>
    )
}

export default ModalViewAtendimento

// Ajuste em arquivosAPI:
// export const getArquivoUnico = async (idArquivo) => {
//   try {
//     const response = await axios.get(`${config.url}/api/fotos/${idArquivo}`, { responseType: 'arraybuffer' })
//     return { success: true, response }
//   } catch (error) {
//     return { success: false, error }
//   }
// }
