import { useLocation, useNavigate } from "react-router-dom";
import Header from "@components/public/Header";
import Nav from "@components/public/Nav";
import Loading from "@components/public/Loading";
import { getCookie } from "@services/cookies";
import '@styles/ordens/ordem.css'
import { getAtendimentos, getOrdensPorID } from "@backend/ordemAPI";
import { useEffect, useState } from "react";
import { ExceptionOutlined } from '@ant-design/icons'

//  TODO Talvez seja redundante receber o endereço do cliente e da ordem
function Ordem() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const idCliente = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const [ordem, setOrdem] = useState(null)
    const [reqstOrdem, setReqstOrdem] = useState(null)
    const [atendimentos, setAtendimentos] = useState(null)
    const [reqstAtendimentos, setReqstAtendimentos] = useState(null)
    const formatCNPJ = (cnpj) => {
        if (!cnpj) return ""
        const cnpjLimpo = cnpj.replace(/\D/g, '')
        return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
    }

    const fetchAtendimentos = async (id) => {
        try {
            const result = await getAtendimentos(id)
            setAtendimentos(result.data.content)
            setReqstAtendimentos(result)
            console.warn(result)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (!ordem) {
            return
        }
        fetchAtendimentos(ordem.id)
    }, [ordem])
    const fetchOrdem = async (id) => {
        try {    
            const result = await getOrdensPorID(id)
            setReqstOrdem(result)
            setOrdem(result.data)
            console.warn(result)
        } catch (error) {
            console.error(error)
            setOrdem('vazio')
        }
    }
    useEffect(() => {
        console.clear()
        console.log(idCliente)
        if (!idCliente) {
            setOrdem('vazio')
            return
        }
        fetchOrdem(idCliente)
    }, [])
    return(
        <div id="pageOrdem" className="paginas">
        <Header titulo={"Editando ordem"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainOrdem">
        {
            !ordem ? <Loading></Loading> :
            (
                ordem == 'vazio' ?
                <section>erro ao carregar ordem</section> :
                <>
                <aside id="asideAcoes">
                    <h2>Opções</h2>
                    <div id="contAcoes">
                        <button>Designar técnico</button>
                        <button>Cancelar ordem</button>
                        <button>Alterar ordem</button>
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
                            {ordem.situacao}
                        </div>
                        <div>
                            <span>Descrição:</span>
                            {ordem.descricao}
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
                        <div>{ordem.endereco.logradouro}, {ordem.endereco.numero}, {ordem.endereco.complemento} - {ordem.endereco.bairro}, {ordem.endereco.cidade}-{ordem.endereco.uf}/{ordem.endereco.cep}</div>
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