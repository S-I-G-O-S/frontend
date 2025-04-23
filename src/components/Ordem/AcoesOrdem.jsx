import { Popconfirm } from "antd"

const AcoesOrdem = (
    {
        ordem, 
        usuario,
        changeModalTecnicos,
        cancelarOrdem,
        // changeEditMode, 
        handleAtenderOrdem, 
        abrirMapa
    }) => {
    /*  Estados da ordem
        recem criada    | Base criou a ordem            | PENDENTE
        sendo executada | Tecnico iniciou atendimento   | EM_EXECUCAO
        
    */
    const renderButtons = () => {
        if (ordem.situacao === "FINALIZADA") {   // Ordem finalizada
            return (
                <p style={{ textAlign: "center" }}>
                    ordem finalizada
                </p>
            )
        }
        if (ordem.situacao === "CANCELADA") {    // Ordem cancelada
            return (
                <p style={{ textAlign: "center" }}>
                    ordem finalizada
                </p>
            )
        }
        if (usuario.cargo !== "TECNICO") {  //  Usuário não é técnico
            return (
                <>
                {(!ordem.funcionario) &&
                    <button onClick={() => changeModalTecnicos(0)}>Designar técnico</button>
                }
                <Popconfirm
                    title=""
                    description={`Deseja cancelar esta ordem?`}
                    onConfirm={cancelarOrdem}
                    onCancel={null}
                    okText="sim"
                    cancelText="não">
                    <button>Cancelar ordem</button>
                </Popconfirm>
                {/* <button onClick={changeEditMode}>Alterar ordem</button> */}
                </>
            )
        }
        if (usuario.cargo === "TECNICO" && usuario.id == ordem.funcionario.id) {    //  Usuário é o técnico designado
            if (ordem.situacao !== 'CANCELADA' && ordem.situacao !== 'FINALIZADA') {    //  Ordem ativa ainda (não cancelada ou finalizada)
                return (
                    <button onClick={handleAtenderOrdem}>
                        {
                            ordem.situacao === "EM_EXECUCAO" ?
                                "finalizar ordem" :
                                "iniciar atendimento"
                        }
                    </button>
                )
            }
        }
    }
    return (
        <aside id="asideAcoes">
            <h2>Opções</h2>
            <div id="contAcoes">
                {/* NOTA Considerando q a ordem não possa ser mudada após finalizada */}
                {renderButtons()}
                {/* TODO adicionar miniatura do mapa */}
                <button onClick={abrirMapa}>Ver mapa</button>
            </div>
        </aside>
    )
}
export default AcoesOrdem