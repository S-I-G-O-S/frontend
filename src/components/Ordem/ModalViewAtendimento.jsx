import "@styles/ordem/modalViewAtendimento.css"
import { converterDtHr, converterSituacao } from "@services/utils"
import Loading from "../public/Loading"
import { getArquivos, getArquivoUnico } from "@services/backend/arquivosAPI"
import { useEffect, useState } from "react"
import HeaderModal from "@components/public/HeaderModal"

const ModalViewAtendimento = ({ closeModal, atendimento }) => {
    const [arquivos, setArquivos] = useState([])

    const arrayBufferToDataURL = (buffer, mime = 'image/jpeg') => {
        const binary = Array.from(new Uint8Array(buffer))
            .map((b) => String.fromCharCode(b))
            .join('')
        const base64 = window.btoa(binary)
        return `data:${mime};base64,${base64}`
    }
    const getArrayFiles = async () => {
        const result = await getArquivos(atendimento.id)
        if (!result.success) throw result.error

        const lista = result.response.data
        // dispara todas as buscas em paralelo
        const promessas = lista.map(async arquivo => {
            const r = await getArquivoUnico(arquivo.id)
            if (!r.success) return null

            
            console.log("tipo do arquivo: ", r.response.headers['content-type'])
            const mime = r.response.headers['content-type'] || 'image/jpeg'
            const dataUrl = arrayBufferToDataURL(r.response.data, mime)
            return { 
                nome: arquivo.nomeArquivo,
                tipo: mime, 
                content: dataUrl
            }
        })

        const arquivosConvertidos = (await Promise.all(promessas)).filter(Boolean)
        console.table(arquivosConvertidos)
        setArquivos(arquivosConvertidos)
    }

    useEffect(() => {
        if (atendimento?.id) getArrayFiles()
    }, [atendimento?.id])

    if (!atendimento) return <Loading />

    return (
        <div id="modalViewAtendimento" className="modal">
            <HeaderModal 
                title={"Atendimento"}
                hasCloseBtt={true}
                closeModal={closeModal}/>
            <div id="infosAtendimento">
                <div><strong>id:</strong> {atendimento.id}</div>
                <div><strong>técnico:</strong> {atendimento.funcionario}</div>
                <div><strong>data início:</strong> {converterDtHr(atendimento.dtAtendimento)}</div>
                <div><strong>data finalização:</strong> {converterDtHr(atendimento.dtFinal)}</div>
                <div><strong>descrição:</strong> {atendimento.dsAtendimento}</div>
                <div><strong>situação final:</strong> {converterSituacao(atendimento.dsSituacao)}</div>
            </div>
            {/* <div><strong>arquivos do atendimento:</strong></div> */}
            <div id="listArquivos">
                {(arquivos.length>0 && arquivos) &&
                    arquivos.map((arquivo, index) => (
                        <div className="arquivoAtendimento" key={`arquivo${index}`}>
                        {(arquivo.tipo=="image/jpeg") &&
                            <img
                                className="imgAtendimento"
                                src={arquivo.content}
                                alt={arquivo.nome}
                            />
                        }
                        </div>
                    ))
                }
            </div>

            <div id="acoesViewAtendimento">
                <button id="sair" className="button bttPrimary" onClick={closeModal}>sair</button>
            </div>
        </div>
    )
}

export default ModalViewAtendimento