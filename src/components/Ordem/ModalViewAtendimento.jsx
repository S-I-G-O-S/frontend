import { converterDtHr, converterSituacao } from "@services/utils"
import Loading from "../public/Loading"
import { getArquivos } from "@services/backend/arquivosAPI"
import { useEffect, useState } from "react"
import { getArquivoUnico } from "../../services/backend/arquivosAPI"

const ModalViewAtendimento = ({closeModal, atendimento}) => {
    const [arquivos, setArquivos] = useState([])
    const addArquivo = (arquivo) => {
        setArquivos(prevState => ([
            ...prevState, 
            arquivo
        ]))
    }
    const getFile = async (id) => {
        console.log("Puxando imagem " + id)
        const result = await getArquivoUnico(id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        addArquivo(result.response.data)
        console.warn(result.response)
    }
    const getArrayFiles = async () => {
        const result = await getArquivos(atendimento.id)
        if (!result.success) {
            console.error(result.error)
            return null
        }
        if (result.response.data.length==0) {
            console.log("Sem fotos neste atendimento")
            return
        }
        console.warn(result.response)
        result.response.data.forEach(async (arquivo, index) => {
            await getFile(arquivo.id)
        })
    }
    useEffect(() => {
        if (atendimento==null) {return}
        getArrayFiles()
    }, [])
    return !atendimento ? (<Loading/>) : (
        <section id="secViewAtendimento">
            {/* {
                "id": 2,
                "funcionario": "Julio Gomes",
                "dtAtendimento": "12-03-2025 18:51:45",
                "dtFinal": "12-03-2025 18:59:45",
                "dsAtendimento": "primeira ordem sendo atendida na história da SIGOS",
                "dsSituacao": "FINALIZADA"
            } */}
            <div><strong>id: </strong> {atendimento.id}</div>
            <div><strong>técnico: </strong> {atendimento.funcionario}</div>
            <div><strong>data início: </strong> {converterDtHr(atendimento.dtAtendimento)}</div>
            <div><strong>data finalização: </strong> {converterDtHr(atendimento.dtFinal)}</div>
            <div><strong>descrição: </strong> {atendimento.dsAtendimento}</div>
            <div><strong>situação final: </strong> {converterSituacao(atendimento.dsSituacao)}</div>
            <div id="listArquivos">
                {arquivos.length>0 && (
                    arquivos.map((arquivo, index) => {
                        // <Image
                        //     style={{
                        //         width: 51,
                        //         height: 51,
                        //         resizeMode: 'contain',
                        //     }}
                        //     source={{
                        //         uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                        //     }}
                        // />
                        <img src={`data:image/png;base64, ${arquivo}`} alt="image atendimento"/>
                    })
                )}
            </div>
            <div id="acoesViewAtendimento">
                <button id="sair" onClick={closeModal}>sair</button>
            </div>
        </section>
    )
}
export default ModalViewAtendimento