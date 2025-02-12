import { useLocation, useNavigate } from "react-router-dom";
import Header from "@components/public/Header";
import Nav from "@components/public/Nav";
import Loading from "@components/public/Loading";
import { getCookie } from "@services/cookies";
import '@styles/ordens/ordem.css'
import { getAtendimentos, getOrdensPorID } from "@backend/ordemAPI";
import { useEffect, useState } from "react";
import { ExceptionOutlined } from '@ant-design/icons'
import { putCancelOrdem } from "../services/backend/ordemAPI";
import { Popconfirm } from "antd";

//  TODO Talvez seja redundante receber o endereço do cliente e da ordem
function Ordem() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const idOrdem = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const [ordem, setOrdem] = useState(null)
    const [atendimentos, setAtendimentos] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [editDados, setEditDados] = useState({})

    const changeEditMode = () => {
        if (!editMode) {
            setEditMode(true)
            return
        }
        setEditMode(false)
    }
    const formatCNPJ = (cnpj) => {
        if (!cnpj) return ""
        const cnpjLimpo = cnpj.replace(/\D/g, '')
        return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
    }
    const cancelarOrdem = async () => {
        console.log('debug ordem sendo cancelada:')
        console.warn(ordem)
        const result = await putCancelOrdem(ordem)
        if (!result.success) {
            console.error(result.error)
            return
        }
        setOrdem(result.data)
        console.log('Ordem cancelada:')
        console.warn(result)
    }
    const fetchAtendimentos = async (id) => {
        try {
            const result = await getAtendimentos(id)
            setAtendimentos(result.data.content)
            console.warn(result)
        } catch (error) {
            console.error(error)
        }
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
        setOrdem(result.data)
        setEditDados(result.data) // Dados exibidos na edição da ordem
        console.warn(result)
    }
    useEffect(() => {
        console.clear()
        console.log(idOrdem)
        if (!idOrdem) {
            setOrdem('noCode')
            return
        }
        fetchOrdem(idOrdem)
    }, [])
    return(
        <div id="pageOrdem" className="paginas">
        <Header titulo={"Editando ordem"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainOrdem">
        {
            !ordem ? <Loading></Loading> :
            (
                ordem=='noCode' ? <div>Erro ao obter código da</div> :
                <>
                <aside id="asideAcoes">
                    <h2>Opções</h2>
                    <div id="contAcoes">
                        <button>Designar técnico</button>
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
                    </div>
                </aside>
                {
                    editMode ? 
                    <section id="secPrincipal">
                        <h2>Informações</h2>
                        <div id="contGeral">
                            <div>
                                <span>ID ordem:</span>
                                {ordem.id}
                                {}
                            </div>
                            <div>
                                <span>Criado por:</span>
                                {ordem.criadoPor}
                            </div>
                            <div>
                                <span>Situação:</span>
                                {ordem.situacao}
                            </div>
                            <div>
                                <span>Descrição:</span>
                                <input type="text" value={ordem.descricao || 'sem descrição'}/>
                            </div>
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
                            <div>{ordem.endereco.logradouro}, {ordem.endereco.numero}, {`${ordem.endereco.complemento}  - ` || ''}{ordem.endereco.bairro}, {ordem.endereco.cidade}-{ordem.endereco.uf}/{ordem.endereco.cep}</div>
                        </div>
                        {
                            ordem.funcionario && (
                                <id id="contFuncionario">
                                    <div>{ordem.funcionario.primeiro}</div>
                                    <div>{ordem.funcionario.ultimo}</div>
                                    <div>{ordem.funcionario.celular}</div>
                                    <div>{ordem.funcionario.disponivel}</div>
                                </id>
                            )
                        }
                    </section>
                    :
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
                                {ordem.situacao}
                            </div>
                            <div>
                                <span>Descrição:</span>
                                {ordem.descricao || 'sem descrição'}
                            </div>
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
                        {
                            ordem.funcionario && (
                                <id id="contFuncionario">
                                    <div>{ordem.funcionario.primeiro}</div>
                                    <div>{ordem.funcionario.ultimo}</div>
                                    <div>{ordem.funcionario.celular}</div>
                                    <div>{ordem.funcionario.disponivel}</div>
                                </id>
                            )
                        }
                    </section>
                }
                <section id="secAtendimentos">
                    <h2>Atendimentos</h2>
                    {
                        atendimentos &&
                        (
                            atendimentos.length==0 ?
                            <div id="msgSemAtendimentos">
                                <p>sem atendimentos</p>
                                <ExceptionOutlined id="iconSemAtendimentos"/> 
                            </div>
                            :
                            (
                                <div></div>
                            )
                        )
                    }
                </section>
                </>
            )
        }
        </main>
        </div>
    )
}
export default Ordem
