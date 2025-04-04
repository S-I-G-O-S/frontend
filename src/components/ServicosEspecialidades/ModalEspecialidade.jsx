// Funções de requisições
import { deleteEspec } from '@backend/especialidadesAPI.js'
import { useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { ColorPicker } from 'antd'
import { postEspecialidade, putEspecialidade } from '@services/backend/especialidadesAPI'
import { notification } from 'antd';
import Loading from '@components/public/Loading.jsx'

const ModalEspecialidade = ({ fecharModal, especialidadeAberta, setEspecialidadeAberta, setEspecialidades }) => {
    const [previaEspec, setPreviaEspec] = useState(false)
    useEffect(() => {
        if(previaEspec && especialidadeAberta) {
            setEspecialidadeAberta(especAberta => ({
                ...especAberta,
                cor: `${previaEspec.cor1}/${previaEspec.cor2}`,
            }))
        }
    }, [previaEspec])
    //  EDIÇÃO ESPECIALIDADE
    const mudarTemaPrevEspecConfig = () => {
        if (previaEspec.prevTema === "preVisuLight") {
            setPreviaEspec(prevState => ({
                ...prevState,
                prevTema: "preVisuDark"
            }))
        } else {
            setPreviaEspec(prevState => ({
                ...prevState, 
                prevTema: "preVisuLight"
            }))
        }
    }
    const mudarNomePrevEspec = (nomePrev) => {
        setEspecialidadeAberta(especState => ({
            ...especState,
            nome: nomePrev
        }))
    }
    const mudarDescricaoPrevEspec = (nomePrev) => {
        setEspecialidadeAberta(especState => ({
            ...especState,
            descricao: nomePrev
        }))
    }
    const mudarCorPrevEspec = (corPrev, corTipo) => {
        setPreviaEspec(prevState => ({
            ...prevState,
            [corTipo]: corPrev
        }))
    }
    const handleSalvar = async () => {
        let result
        if (especialidadeAberta.id === "nova") {
            result = await postEspecialidade(especialidadeAberta)
        } else {
            result = await putEspecialidade(especialidadeAberta)
        }
        console.warn(result.response)

        if (!result.success) { // erro nas requisições
            notification.error({
                message: 'Não foi possivel salvar esta especialidade.',
                placement: 'bottomLeft',
            })
            console.error(result.error)
        }
        if (especialidadeAberta.id === "nova") {}
        setEspecialidades(prevState => (
            [...prevState, especialidadeAberta]
        ))
        notification.success({
            message: 'Alterações salvas com sucesso!',
            placement: 'bottomLeft',
        })
        console.warn(especialidadeAberta)
        fecharModal()
    }
    const handleDeletar = async () => {
        if (!window.confirm("Deseja APAGAR a especialidade: " + especialidadeAberta.nome + "?")) {
            return
        }
        const result = await deleteEspec(especialidadeAberta.id);
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.warn(result.response)
        setEspecialidades((prev) => prev.filter((esp) => esp.id !== especialidadeAberta.id))
        fecharModal()
    }
    const separarCor = (cor) => {
        const [auxCor1, auxCor2] = cor.includes('/')
			? cor.split('/')
			: [cor, '#000']
		if (!auxCor1) {
			console.error('Erro ao abrir especialidade. Cor invalida.')
			return
		}
		setPreviaEspec({
			prevTema: "preVisuLight",
			cor1: auxCor1,
			cor2: auxCor2,
		})
    }
    useEffect(() => {
        if (!especialidadeAberta) return
        if (especialidadeAberta.id !== "nova") {
            separarCor(especialidadeAberta.cor)
        } else {
            setPreviaEspec({
                prevTema: "preVisuLight",
                cor1: "#ffffff",
                cor2: "#000",
            })
        }
    }, [])
    return (!especialidadeAberta || !previaEspec) ? <Loading /> : (
        <section id='secConfigEspec' className='secConfig'>
            <h2>Editando especialidade</h2>
            <div id='contInfosEspecEdit'>
                <div id='campoNomeConfigEspec'>
                    <label>Nome:</label>
                    <input
                        type="text" id='nomeConfigEspec'
                        value={especialidadeAberta.nome}
                        onChange={(e) => mudarNomePrevEspec(e.target.value)}
                    />
                </div>
                <div id='campoDescricaoConfigEspec'>
                    <label>Descrição:</label>
                    <TextArea
                        id="txtDescricao"
                        value={especialidadeAberta.descricao}
                        onChange={(e) => mudarDescricaoPrevEspec(e.target.value)}
                        placeholder="Opcional"
                        maxLength={250}
                        autoSize={{
                            minRows: 2,
                            maxRows: 6,
                        }}
                        style={{
                            resize: 'none'
                        }}
                    />
                </div>
                {!previaEspec ? '' : (
                    <>
                    <div id='contCamposCoresEspecEdit'>
                        <ColorPicker
                            id="inpCorFundo"
                            value={previaEspec.cor1}
                            disabledAlpha
                            arrow={false}
                            showText={(color) =>
                                <span>
                                    <strong className='labelColor'>Cor de fundo</strong> {color.toHexString()}
                                </span>}
                            onChangeComplete={(color) => mudarCorPrevEspec(color.toHexString(), 'cor1')} />
                        <ColorPicker
                            id="inpCorLetra"
                            value={previaEspec.cor2}
                            arrow={false}
                            disabledAlpha
                            showText={(color) =>
                                <span>
                                    <strong className='labelColor'>Cor da letra</strong> {color.toHexString()}
                                </span>}
                            onChangeComplete={(color) => mudarCorPrevEspec(color.toHexString(), 'cor2')} />
                    </div>
                    <div id='contPreVisu'>
                        <div id='headPreVisu'>
                            <p>Pré-visualização:</p>
                            <button onClick={mudarTemaPrevEspecConfig}>Mudar tema</button>
                        </div>
                        <div id='preVisu' className={previaEspec.prevTema}>
                            <div id='especPreVisu'
                                style={{
                                    borderColor: previaEspec.cor2,
                                    backgroundColor: previaEspec.cor1,
                                    color: previaEspec.cor2
                                }}>
                                {especialidadeAberta.nome}
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
            <div id='contFimAcao'>
                <button id='bttCancelar' onClick={fecharModal}>cancelar</button>
                <button id='bttSalvar' onClick={handleSalvar}>salvar</button>
                {
                    especialidadeAberta.id == "nova" ? '' :
                        <button id='bttExcluir' onClick={handleDeletar}>deletar</button>
                }
            </div>
        </section>
    )
}
export default ModalEspecialidade;