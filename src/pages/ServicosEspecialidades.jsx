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
import { useAuth } from '../context/authContext'

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
        setModalServico(true)
    }
    const fecharEspec = () => {
        setEspecialidadeAberta()
        setTipoJanela(null)
    }
    const fecharServ = () => {
        setServicoAberto(null)
        setTipoJanela(null)
    }
    const {checkAuth} = useAuth()
    useEffect(() => {
        checkAuth()
    }, [])
    return(
        <div id='pageEspecialidades' className='paginas'>
        {/* <Header titulo={"Especialidades"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main>
            <section id='secServicos'>
                <div className='contHead'>
                    <h1>Serviços</h1>
                    {(usuario.cargo == 'ADM' || usuario.cargo == 'DEV') && (
                        <button onClick={novoServico}>Novo Serviço</button>
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
                    especialidades={especialidades}
                />
            </div>
        }
        
        </div>
    )
}
export default ServicosEspecialidades