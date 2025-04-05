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
import ModalAtendimento from "@components/Ordem/ModalAtendimento.jsx";
import Mapa from "@components/Ordem/Mapa.jsx";
import { formatCNPJ } from "@services/utils";
import { converterSituacao } from "@services/utils";

function Ordem() {
    const { usuario } = getUsuarioContext()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const idOrdem = searchParams?.get('id') ?? null
    const [ordem, setOrdem] = useState(null)

    const [atendimentoAtual, setAtendimentoAtual] = useState(null)
    const [atendimentos, setAtendimentos] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [editDados, setEditDados] = useState({})
    const [modalTecnicos, setModalTecnicos] = useState(false)
    const [modalAtendimento, setModalAtendimento] = useState(false)
    const [modalMapa, setModalMapa] = useState(false)
    const changeEditMode = () => {
        if (!editMode) {
            setEditMode(true)
            return
        }
        setEditMode(false)
    }
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
        /*
            * editar ordem e mudar 'funcionario' para o id do tecnico
        */
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
            setModalAtendimento(true)
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
            setModalTecnicos(true)
            return
        }
    }
    const changeModalMapa = () => {
        setModalMapa(!modalMapa)
    }
    useEffect(() => {
        if (atendimentos && atendimentos.length > 0) {
            if (ordem.situacao == "EM_EXECUCAO") {
                // FIXME atualmente pegando apenas o primeiro atendimento do array
                setAtendimentoAtual(atendimentos[0].id)
                console.log("atendimento aberto: " + atendimentos[0].id)
            }
            // const atendimentoAberto = clientes.find(cliente => cliente.id === formNovaOrdem.clienteID)
        }
    }, [atendimentos])
    const fetchAtendimentos = async (id) => {
        const result = await getAtendimentos(id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setAtendimentos(result.response.data.content)
        console.warn(result.response)
    }
    useEffect(() => {
        if (!ordem?.id) {
            return
        }
        fetchAtendimentos(ordem.id)
    }, [ordem])
    const fetchOrdem = async (id) => {
        const result = await getOrdensPorID(id)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setOrdem(result.response.data)
        setEditDados(result.response.data)
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
                            <aside id="asideAcoes">
                                <h2>Opções</h2>
                                <div id="contAcoes">
                                    {/* NOTA Considerando q a ordem não possa ser mudada após finalizada */}
                                    {(ordem.situacao == "FINALIZADA") ? (
                                        <p style={{ textAlign: "center" }}>
                                            ordem finalizada
                                        </p>
                                    ) : ((usuario.cargo === "BASE" || usuario.cargo === "ADM" || usuario.cargo === 'DEV') ? (
                                        <>
                                            <button onClick={() => changeModalTecnicos(0)}>Designar técnico</button>
                                            <Popconfirm
                                                title=""
                                                description={`Deseja cancelar esta ordem?`}
                                                onConfirm={cancelarOrdem}
                                                onCancel={null}
                                                okText="sim"
                                                cancelText="não">
                                                <button>Cancelar ordem</button>
                                            </Popconfirm>
                                            <button onClick={changeEditMode}>Alterar ordem</button>
                                        </>
                                        ) : ((usuario.cargo === "TECNICO" && usuario.id == ordem.funcionario.id) && 
                                            (ordem.situacao === 'PENDENTE' || ordem.situacao === 'RETORNO' || ordem.situacao === "EM_EXECUCAO") && (
                                                <button onClick={handleAtenderOrdem}>
                                                    {
                                                        ordem.situacao === "EM_EXECUCAO" ?
                                                            "finalizar ordem" :
                                                            "iniciar atendimento"
                                                    }
                                                </button>
                                            )
                                        ))
                                    }
                                    {/* TODO adicionar miniatura do mapa */}
                                    <button onClick={() => setModalMapa(true)}>Ver mapa</button>
                                </div>
                            </aside>
                            <section id="secPrincipal">
                                <h2>Informações</h2>
                                <div id="contGeral">
                                    <div>
                                        <span>ID ordem:</span>
                                        {ordem.id}
                                    </div>
                                    <div>
                                        <span>Criado por:</span>
                                        {ordem.criadoPor}
                                    </div>
                                    <div>
                                        <span>Situação:</span>
                                        {converterSituacao(ordem.situacao)}
                                    </div>
                                    <div>
                                        <span>Descrição:</span>
                                        {ordem.descricao || 'sem descrição'}
                                    </div>
                                    {
                                        ordem.funcionario &&
                                        <div>
                                            <span>Técnico atendendo:</span>
                                            {ordem.funcionario.primeiro} {ordem.funcionario.ultimo}
                                        </div>
                                    }
                                </div>
                                <div id="contServico">
                                    <div>
                                        <span>Serviço:</span>
                                        {ordem.servico.nome}
                                    </div>
                                    <div>
                                        <span>Descrição:</span>
                                        {ordem.servico.descricao}
                                    </div>
                                </div>
                                <div id="contCliente">
                                    <div>
                                        <span>Cliente:</span>
                                        {ordem.cliente.nome}
                                    </div>
                                    <div>

                                        <span>CNPJ:</span>
                                        {formatCNPJ(ordem.cliente.cnpj)}
                                    </div>
                                    <div>
                                        <span>ID cliente:</span>
                                        {ordem.cliente.id}
                                    </div>
                                </div>
                                <div id="contEndereco">
                                    <span>
                                        <div>Endereço:</div>
                                    </span>
                                    <div>{ordem.endereco.logradouro}, {ordem.endereco.numero}{`${ordem.endereco.complemento}` || ''}  - {ordem.endereco.bairro}, {ordem.endereco.cidade}-{ordem.endereco.uf}/{ordem.endereco.cep}</div>
                                </div>
                                {(ordem.funcionario && usuario.cargo!=="TECNICO") && (
                                        <div id="contFuncionario">
                                            <p><strong>Funcionário: </strong>{ordem.funcionario.primeiro} {ordem.funcionario.ultimo}</p>
                                            <p><strong>contato: </strong>{ordem.funcionario.celular}</p>
                                        </div>
                                    )
                                }
                            </section>
                            <section id="secAtendimentos">
                                <h2>Atendimentos</h2>
                                {
                                    atendimentos &&
                                    (
                                        atendimentos.length == 0 ?
                                            <div id="msgSemAtendimentos">
                                                <p>sem atendimentos</p>
                                                <ExceptionOutlined id="iconSemAtendimentos" />
                                            </div>
                                            :
                                            (
                                                <div id="contListAtendimentos">
                                                    {
                                                        atendimentos.map(atendimento => (
                                                            <div
                                                                className="itemListAtendimento"
                                                                key={`atendimento${atendimento.id}`}
                                                            >
                                                                <div>nome: {atendimento.funcionario}</div>
                                                                <div>data do atendimento: {atendimento.dtAtendimento}</div>
                                                                <div>descrição do atendimento: {atendimento.dsAtendimento || "sem descrição"}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                    )
                                }
                            </section>
                        </>
                )}
            </main>
            {modalTecnicos && (
                <div className='shadowBG'>
                    <ModalTecnicos
                        ordem={ordem}
                        especialidades={ordem.servico.especialidades}
                        changeModal={setModalTecnicos}
                        setOrdem={setOrdem}
                    />
                </div>
            )}
            {modalAtendimento && (
                <div className='shadowBG'>
                    <ModalAtendimento
                        changeModal={setModalAtendimento}
                        situacao={ordem.situacao}
                        atendimento={atendimentoAtual || 0}
                    />
                </div>
            )}
            {modalMapa && (
                <div className='shadowBG'>
                    <Mapa
                        endereco={ordem.endereco}
                        changeModal={changeModalMapa} />
                </div>
            )}
        </div>
    )
}
export default Ordem
