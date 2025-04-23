import { useLocation } from "react-router-dom";
import Nav from "@components/public/Nav.jsx";
import Loading from "@components/public/Loading.jsx";
import '@styles/ordem.css'
import { getAtendimentos, getOrdensPorID } from "@backend/ordemAPI.js";
import { useEffect, useState } from "react";
import { ExceptionOutlined } from '@ant-design/icons'
import { postAtendimento, putCancelOrdem } from "@services/backend/ordemAPI.js";
import { notification, Popconfirm } from "antd";
import { getUsuarioContext } from "@context/UsuarioContext.jsx";
import ModalTecnicos from "@components/Ordem/ModalTecnicos.jsx";
import ModalNovoAtendimento from "@components/Ordem/ModalNovoAtendimento.jsx";
import Atendimentos from "@components/Ordem/Atendimentos.jsx";
import Mapa from "@components/Ordem/Mapa.jsx";
import InfosOrdem from "@components/Ordem/InfosOrdem";
import AcoesOrdem from "@components/Ordem/AcoesOrdem";
import ModalViewAtendimento from "@components/Ordem/ModalViewAtendimento";

function Ordem() {
    const { usuario } = getUsuarioContext()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const idOrdem = searchParams?.get('id') ?? null
    const [ordem, setOrdem] = useState(null)
    const [atendimento, setAtendimento] = useState(null)
    const [atendimentoAtual, setAtendimentoAtual] = useState(null)
    const [atendimentos, setAtendimentos] = useState(null)
    const [modais, setModais] = useState({
        modalNovoAtendimento: false,
        modalViewAtendimento: false,
        modalMapa: false,
        modalTecnicos: false,
    })
    const changeModal = (field, value) => {
        setModais(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    // const changeEditMode = () => {
    //     if (!editMode) {
    //         setEditMode(true)
    //         return
    //     }
    //     setEditMode(false)
    // }
    const cancelarOrdem = async () => {
        const result = await putCancelOrdem(ordem)
        if (!result.success) {
            notification.error({
                message: `Erro ${result.error.status}`,
                description: result.error.response.data,
                placement: 'bottomLeft',
            })
            console.error(result.error)
            return
        }
        setOrdem(result.data)
        console.log('Ordem cancelada:')
        console.warn(result)
    }
    const handleAtenderOrdem = async () => {
        // verificar se o funcionario é um técnico
        if (usuario.cargo !== 'TECNICO') { return }
        // verificar se não tem um funcionario atendendo
        if (ordem.funcionario.id !== usuario.id) {
            console.error("ERRO DE SEGURANÇA: O usuário não é o técnico responsável!")
            return
        }
        // verificar se o técnico ja iniciou um atendimento
        if (atendimentos.length > 0) {
            // abre a janela de finalizar atendimento
            // FIXME TROCAR AQUI
            // setModalAtendimento(true)
            changeModal("modalNovoAtendimento", true)
            return
        }
        // inicia o atendimento
        const result = await postAtendimento(ordem.id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        console.log('ordem relacionada ao técnico ' + usuario.nome)
        notification.success({
            message: `Atendimento iniciado, bom serviço ${usuario.nome}.`,
            description: 'Bom trabalho',
            placement: 'bottomLeft',
        })
    }
    const changeModalTecnicos = async (idTecnico) => {
        // verificar se não tem um funcionario atendendo
        console.warn('debug ' + !ordem.funcionario)
        if (ordem.funcionario) {
            // Não da pra atender ele
            console.log('impossivel atender esta ordem.')
            notification.error({
                message: 'Técnico já designado para esta ordem.',
                // description: 'Bom trabalho',
                placement: 'bottomLeft',
            })
            return
        }
        if (!modalTecnicos) {
            // FIXME TROCAR AQUI
            // setModalTecnicos(true)
            changeModal("modalTecnicos", true)
            return
        }
    }
    const abrirAtendimento = (atendimento) => {
        setAtendimento(atendimento)
        changeModal("modalViewAtendimento", true)
    }
    const fetchOrdem = async (id) => {
        const result = await getOrdensPorID(id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setOrdem(result.response.data)
        // setEditDados(result.response.data)
        console.warn(result.response)
    }
    useEffect(() => {
        console.clear()
        console.log(usuario)
        if (!idOrdem) {
            setOrdem('noCode')
            return
        }
        fetchOrdem(idOrdem)
    }, [])
    return (
        <div id="pageOrdem" className="paginas">
            {/* <Header titulo={"Editando ordem"} usuario={usuario}></Header> */}
            <Nav cargo={usuario?.cargo || ''}></Nav>
            <main id="mainOrdem">
                {!ordem ? <Loading></Loading> :(
                    ordem == 'noCode' ? <div>Erro ao obter código da ordem</div> :
                    <>
                    <AcoesOrdem
                        ordem={ordem}
                        usuario={usuario}
                        changeModalTecnicos={changeModalTecnicos}
                        cancelarOrdem={cancelarOrdem}
                        // changeEditMode={changeEditMode}
                        handleAtenderOrdem={handleAtenderOrdem}
                        abrirMapa={() => changeModal( "modalMapa", true)}
                    />
                    
                    <InfosOrdem
                        ordem={ordem}
                        cargo={usuario.cargo}
                    ></InfosOrdem>
                    <Atendimentos
                        idOrdem={ordem.id || null}
                        setAtendimentos={setAtendimentos}
                        atendimentos={atendimentos}
                        setAtendimentoAtual={setAtendimentoAtual}
                        abrirAtendimento={abrirAtendimento}
                    />
                    </>
                )}
            </main>
            {modais.modalTecnicos && (
                <div className='shadowBG'>
                    <ModalTecnicos
                        ordem={ordem}
                        especialidades={ordem.servico.especialidades}
                        changeModal={changeModal}
                        setOrdem={setOrdem}
                    />
                </div>
            )}
            {modais.modalNovoAtendimento && (
                <div className='shadowBG'>
                    <ModalNovoAtendimento
                        changeModal={changeModal}
                        situacao={ordem.situacao}
                        atendimento={atendimentoAtual || 0}
                    />
                </div>
            )}
            {modais.modalMapa && (
                <div className='shadowBG'>
                    <Mapa
                        endereco={ordem.endereco}
                        closeMap={() => changeModal("modalMapa", false)} />
                </div>
            )}
            {modais.modalViewAtendimento && (
                <div className='shadowBG'>
                    <ModalViewAtendimento
                        closeModal={() => changeModal("modalViewAtendimento", false)}
                        atendimento={atendimento || null}/>
                </div>
            )}
        </div>
    )
}
export default Ordem