// Funções de requisições
import { deleteEspec } from '@backend/especialidadesAPI.js'
import { getServicos, getServicoPorID, postServico, putServico } from '@backend/servicosAPI.js'
import '@styles/servicosEspecialidades.css'
import Nav from '@components/public/Nav.jsx'
import { useEffect, useState } from 'react'
import { MinusCircleFilled } from '@ant-design/icons'
import { getUsuarioContext } from '../context/UsuarioContext'
import { deleteServico } from '../services/backend/servicosAPI'
import ModalEspecialidade from '@components/ServicosEspecialidades/ModalEspecialidade'
import ModalServico from '@components/ServicosEspecialidades/ModalServico'
import Servicos from '@components/ServicosEspecialidades/Servicos'
import Especialidades from '@components/ServicosEspecialidades/Especialidades'

function ServicosEspecialidades() {
    // Geral
    const { usuario } = getUsuarioContext()
    const [tipoJanela, setTipoJanela] = useState(null)
    const [layoutEspecServicos, setLayoutEspecServicos] = useState("layoutServicos")
    const [ordemEspecServicos, setOrdemEspecServicos] = useState("asc")
    
    // Especialidades
    const [especialidades, setEspecialidades] = useState(false)
    const [especialidadeAberta, setEspecialidadeAberta] = useState(null)
    const [modalEspecialidade, setModalEspecialidade] = useState(false)

    // Serviços
    const [servicoAberto, setServicoAberto] = useState(null)
    const [servicos, setServicos] = useState(false)
    const [modalServico, setModalServico] = useState(false)

    //  LISTAGEM
    const mudarLayoutEspecServicos = () => {
        if(layoutEspecServicos == "layoutEspecs") {
            setLayoutEspecServicos("layoutServicos")
        } else {
            setLayoutEspecServicos("layoutEspecs")
        }
    }
    const mudarOrdemEspecServicos = () => {
        if(ordemEspecServicos == "asc") {
            setOrdemEspecServicos("desc")
            setEspecialidades(
                [...especialidades].sort((a, b) => b.nome.localeCompare(a.nome))
            )
            setServicos(
                [...servicos].sort((a, b) => b.nome.localeCompare(a.nome))
            )
        } else {
            setOrdemEspecServicos("asc")
            setEspecialidades(
                [...especialidades].sort((a, b) => a.nome.localeCompare(b.nome)) 
            )
            setServicos(
                [...servicos].sort((a, b) => a.nome.localeCompare(b.nome))
            )   
        }
    }
    
    
    // EDIÇÃO SERVIÇO
    
    // Geral
    
    // TODO Tirar isso
    /*
    const handleSalvar = async () => {
        let result
        if (tipoJanela == 'espec') {
            if (especAberta.id === "nova") {
                result = await postEspecialidade(especAberta)
            } else {
                result = await putEspecialidade(especAberta)
            }
            console.warn(result.response)
            if (result.success) {
                setEspecialidades(prevState => (
                    [...prevState, especAberta]
                ))
                window.alert('Alterações salvas com sucesso!')
                fecharEspec()
                fecharEspec()
            } else {
                window.alert("Não foi possivel salvar esta especialidade.")
                console.error(result.error)
            }
            console.warn(especAberta)
            return
        }
        if (tipoJanela == 'servico') {
            let arrayEspecs = []
            servicoAberto.especialidades.map(espec => (
                arrayEspecs.push(espec.id)
            ))
            console.warn("DEBBUG editando serviço")
            console.warn(servicoAberto.id)
            console.warn(servicoAberto.id)
            console.warn(servicoAberto.id)
            console.warn(arrayEspecs)
            if (servicoAberto.id == "novo") {
                result = await postServico(servicoAberto, arrayEspecs)
            } else {
                result = await putServico(servicoAberto, arrayEspecs)
            }
            if (!result.success) {
                window.alert("Não foi possivel salvar este serviço.")
                console.error(result.error)
                return
            }
            setServicos(prevState => (
                [...prevState, servicoAberto]
            ))
            window.alert('Alterações salvas com sucesso!')
            fecharEspec()
            fecharServ()
            console.warn(servicoAberto)
            return 
        }
    }
    */
    // TODO TIrar isso
    /*
    const handleDeletar = async () => {
        if (tipoJanela == 'espec') {
            if(!window.confirm("Deseja APAGAR a especialidade: " + especAberta.nome + "?")) {
                return
            }
            const result = await deleteEspec(especAberta.id);
            if (!result.success) {
                console.error(result.error)
                return
            } 
            setEspecialidades((prev) => prev.filter((esp) => esp.id !== especAberta.id))
            fecharEspec()
        } else {
            if(!window.confirm("Deseja APAGAR o serviço: " + servicoAberto.nome + "?")) {
                return
            }
            const result = await deleteServico(servicoAberto.id);
            if (!result.success) {
                console.error(result.error)
                return
            }
            setServicos((prev) => prev.filter((servico) => servico.id !== servicoAberto.id))
            fecharServ()
        }
    }
    */
    const handleCancel = () => {
        fecharEspec()
    }
    const novaEspecialidade = () => { 
        setEspecialidadeAberta({
            id: "nova",
            nome: 'Nova especialidade',
            descricao: '',
            cor: '',
        })
        setModalEspecialidade(true)
    }
    const novoServico = () => {
        //  Novo serviço
        setServicoAberto({
            id: "novo",
            nome: 'Novo serviço',
            descricao: '',
            especialidades: []
        })
    }
    const abrirServico = async (idServ) => {
        if (tipoJanela == 'servico') {   // Se alguma janela lateral estiver aberta
            // TODO Excluir caso ocorra erro de uso ao abrir o mesmo serviço
            if(servicoAberto?.id == idServ) {   // Se a nova janela for igual 
                return
            }
            if(!window.confirm("Deseja excluir todas alterações do serviço " + servicoAberto.nome + "?")) {
                return
            }
        }
        if(tipoJanela == 'espec') {
            if(!window.confirm("Deseja excluir todas alterações da especialidade " + especialidadeAberta.nome + "?")) {
                
                return
            }
        }
        if (idServ == "novo") {
        //  Novo serviço
            setServicoAberto({
                id: "novo",
                nome: 'Novo serviço', 
                descricao: '',
                especialidades: []
            })
        } else {
        //  Serviço existente
            const result = await getServicoPorID(idServ)
                
            if (!result.success) {
                console.error(result.error)
                return
            }
            setServicoAberto(result.response.data)
        }
        console.log("Serviço do id " + idServ +" foi aberto")
        fecharEspec()
        setTipoJanela("servico")
    }
    const fecharEspec = () => {
        setEspecialidadeAberta()
        setPrevEspec()
        setTipoJanela(null)
    }
    const fecharServ = () => {
        setServicoAberto(null)
        setTipoJanela(null)
    }

    return(
        <div id='pageEspecialidades' className='paginas'>
        {/* <Header titulo={"Especialidades"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main>
            <section id='secServicos'>
                <div className='contHead'>
                    <h1>Serviços</h1>
                    {(usuario.cargo == 'ADM' || usuario.cargo == 'DEV') && (
                        <button onClick={() => {abrirServico("novo")}}>Novo Serviço</button>
                    )}
                </div>
                <Servicos
                    abrirModal={() => setModalServico(true)}
                    setServicoAberto={setServicoAberto}
                    servicos={servicos}
                    setServicos={setServicos}
                />
            </section>
            <section id='secEspecialidades'>
                <div className='contHead'>
                    <h1>Especialidades</h1>
                    {(usuario.cargo == 'ADM' || usuario.cargo == 'DEV') && (
                        <button onClick={novaEspecialidade}>
                            Nova Especialidade</button>
                    )}
                </div>
                <Especialidades
                    especialidades={especialidades}
                    setEspecialidades={setEspecialidades}
                    abrirModal={() => setModalEspecialidade(true)}
                    setEspecialidadeAberta={setEspecialidadeAberta}
                />
            </section>
        </main>
        {modalEspecialidade &&
            <div className='shadowBG'>
                <ModalEspecialidade
                    fecharModal={() => setModalEspecialidade(false)}
                    especialidadeAberta={especialidadeAberta}
                    setEspecialidadeAberta={setEspecialidadeAberta}
                    setEspecialidades={setEspecialidades}
                /> 
            </div>
        } 
        {modalServico &&
            <div className='shadowBG'>
                <ModalServico
                    fecharModal={() => setModalServico(false)}
                    servicoAberto={servicoAberto}
                    setServicoAberto={setServicoAberto}
                    setServicos={setServicos}
                />
            </div>
        }
        
        </div>
    )
}
export default ServicosEspecialidades