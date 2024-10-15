import config from '../../services/devConfig'
// Dados simulados
import simuGetEspecialidades from '../../dadosSimulados/especialidades'

// Funções de requisições
import { getEspecialidades, postEspecialidade, deleteEspec, putEspecialidade } from '../../services/especialidadesAPI'
import { getServicos, postServicos, putServicos, deleteServicos } from '../../services/servicosAPi'

import '../../styles/especialidades.css'

import Nav from '../public/Nav'
import Header from '../public/Header'
import UnitEspec from './Especialidades/unitEspecialidade'
import { useEffect, useState } from 'react'

// https://www.delftstack.com/pt/howto/react/for-loop-in-react/

function Especialidades() {
    const [reqstEspecialidades, setReqstEspecialidades] = useState([])
    const [reqstServicos, setReqstServicos] = useState([])
    const [especialidades, setEspecialidades] = useState(reqstEspecialidades)
    const [servicos, setServicos] = useState(reqstServicos)
    
    const [prevEspec, setPrevEspec] = useState(null)
    const [layoutEspecServicos, setLayoutEspecServicos] = useState("layoutEspecs")
    const [ordemEspecServicos, setOrdemEspecServicos] = useState("asc")
    const [especAberta, setEspecAberta] = useState(null)

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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
    const handleNovaEspec = () => {
        abrirEspec("nova")
    }

    //  EDITAÇÃO ESPECIALIDADE
    const mudarTemaPrevEspecConfig = () => {
        if (prevEspec.prevTema === "preVisuLight") {
            setPrevEspec(prevState => ({
                ...prevState,
                prevTema: "preVisuDark"
            }))
        } else {
            setPrevEspec(prevState => ({
                ...prevState, 
                prevTema: "preVisuLight"
            }))
        }
    }
    const mudarNomePrevEspec = (nomePrev) => {
        setEspecAberta(especState => ({
            ...especState,
            nome: nomePrev
        }))
    }
    const mudarDescricaoPrevEspec = (nomePrev) => {
        setEspecAberta(especState => ({
            ...especState,
            descricao: nomePrev
        }))
    }
    const mudarCor1PrevEspec = (cor1Prev) => {
        setPrevEspec(prevState => ({
            ...prevState,
            cor1: cor1Prev
        }))
        setEspecAberta(especAberta => ({
            ...especAberta,
            cor: `${prevEspec.cor1}/${prevEspec.cor2}`,
        }))
    }
    const mudarCor2PrevEspec = (cor2Prev) => {
        setPrevEspec(prevState => ({
            ...prevState,
            cor2: cor2Prev
        }))
        setEspecAberta(especAberta => ({
            ...especAberta,
            cor: `${prevEspec.cor1}/${prevEspec.cor2}`,
        }))
    }
    const mudarInputServPrevEspec = (inpServ) => {
        setPrevEspec(especState => ({
            ...especState,
            inpServ: inpServ
        }))
    }
    const addServToEspec = () => {
        const servicoSelecionado = servicos.find(servico => servico.nome.toLowerCase() === prevEspec.inpServ.toLowerCase())
        
        if (!servicoSelecionado) {
            setError("Serviço não encontrado!")
            return
        }

        const servicoJaAdicionado = prevEspec.servicos.some(servEspec => servEspec.id === servicoSelecionado.id)

        if (servicoJaAdicionado) {
            setError("Este serviço já foi adicionado a esta especialidade!");
            return
        }
        setPrevEspec(especState => ({
            ...especState,
            servicos: [...especState.servicos, servicoSelecionado],
            inpServ: ''
        }))
        setError('')
    }
    const deleteServEspec = (idServ) => {
        setEspecAberta(especState => ({
            ...especState,
            servicos: especState.servicos.filter(servico => servico.id !== idServ)
        }))
    }
    const handleSalvar = async () => {
        const especAberta = {
            ...especAberta,
            nome: prevEspec.nome,
            cor: `${prevEspec.cor1}/${prevEspec.cor2}`,
        }

        let result
        if (especAberta.id === "nova") {
            result = postEspecialidade(especAberta)
        } else {
            result = putEspecialidade(especAberta)
        }

        if (result.success) {
            window.alert('Alterações salvas com sucesso!')
            fecharEspec()
        } else {
            window.alert(result.error)
        }
    }
    const handleDeletar = () => {
        if(!window.confirm("Deseja APAGAR a especialidade " + especAberta.nome + "?")) {
            return
        }
        if(config.simularDados) {
            setReqstEspecialidades((prev) => ({
                ...prev,
                content: prev.content.filter((esp) => esp.id !== especAberta.id),
            }))
        } else {
            const result = deleteEspec(especAberta.id);
            if (result.success) {
                setEspecialidades((prev) => prev.filter((esp) => esp.id !== especAberta.id))
            } else {
                console.error(result.error);
            }
        }
        fecharEspec()
    }
    const handleCancel = () => {
        fecharEspec()
    }
    const abrirEspec = (idEspec) => {
        console.log("especialidade do id " + idEspec +" foi aberta")
        if (especAberta) {
            if(especAberta.id == idEspec) {
                return
            }
            if(especAberta.id != idEspec && especAberta) {
                if(!window.confirm("Deseja excluir todas alterações da especialidade " + especAberta.nome + "?")) {
                    
                    return
                }
            }
        }
        if (idEspec == "nova") {
        //  Nova Especialidade
            setEspecAberta({
                id: "nova",
                nome: 'Nova especialidade', 
                descricao: '', 
                cor: '',
                servicos: []
            })
            setPrevEspec({
                prevTema: "preVisuLight",
                cor1: "#ffffff",
                cor2: "#000",
                inpServ: ""
            })
        } else {
        //  Especialidade existente
            let especSelecionada = especialidades.find(espec => espec.id === idEspec)
            console.warn(especSelecionada)
            if (!especSelecionada) {
                setError('Erro ao abrir especialidade.')
                return;
            }
            const [auxCor1, auxCor2] = especSelecionada.cor.split('/');
            if (!auxCor1 || !auxCor2) {
                setError('Erro ao abrir especialidade. Cor invalida.')
                return
            }
            setEspecAberta(especSelecionada)
            setPrevEspec({
                prevTema: "preVisuLight",
                cor1: auxCor1,
                cor2: auxCor2,
                inpServ: ""
            })
        }
    }
    const fecharEspec = () => {
        setEspecAberta(null)
        setPrevEspec(null)
    }
    const fetchEspecialidades = async () => {
        try {
            const data = await getEspecialidades()
            setReqstEspecialidades(data)
            setEspecialidades(data.content)
            console.warn(data)
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchServicos = async () => {
        try {
            const data = await getServicos()
            setReqstServicos(data)
            setServicos(data.content)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        if (config.simularDados) {
            setReqstEspecialidades(simuGetEspecialidades)

            setEspecialidades(simuGetEspecialidades.content)
        } else {
            fetchEspecialidades()
            fetchServicos()
        }
    }, [])
    return(
        <div id='pageEspecialidades'>
        <Header titulo={"Especialidades & Serviços"}></Header>
        <Nav></Nav>
        <main className={
                !especAberta ? "secConfigEspecFechada" : "secConfigEspecAberta"
            }
        >
            <section id='sec1'>
                <div id='contNovo'>
                    <button onClick={handleNovaEspec}>
                        Nova Especialidade</button>
                    <button>Novo Serviço</button>
                </div>
                {/* 
                    Nome ASC/DESC
                    Mudar layout
                */}
                <div id='contFiltrosEspecServ'>
                    <div id='orderFiltrosEspecServ'>
                        <p>Ordernar por:</p>
                        <button id='nomeOrderFiltrosEspec' onClick={mudarOrdemEspecServicos}>
                            Nome {ordemEspecServicos.toUpperCase()}
                        </button>
                        <button>Criação ASC</button>
                    </div>
                    <div id='groupFiltrosEspecServ'>
                        <p>Agrupar por:</p>
                        <button id='bttGroupFiltrosEspec'
                        onClick={mudarLayoutEspecServicos}>
                            {
                                layoutEspecServicos == "layoutEspecs" ?
                                "Especialidades" : "Serviços" 
                            }
                        </button>
                    </div>
                </div>
                <div id='contListEspecServ' className={layoutEspecServicos}>
                    {   
                        layoutEspecServicos == "layoutEspecs" ?
                        especialidades
                        // .filter(espec => espec.ativo == true)
                        .map(espec => 
                            <UnitEspec key={espec.id} espec={espec} onClick={() => abrirEspec(espec.id)}></UnitEspec>
                        ) :
                        servicos.map(serv => 
                            <div className='servicos' key={serv.id}>
                                <h4>{serv.nome}</h4>    
                                <div>
                                    {serv.descricao}
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
            { especAberta  &&
                <section id='secConfigEspec'>
                    <h2>Editando especialidade</h2>
                    <div id='contInfosEspecEdit'>

                        <div id='campoNomeConfigEspec'>
                            <label>Nome:</label>
                            <input 
                                type="text" id='nomeConfigEspec' 
                                value={especAberta.nome}
                                onChange={(e) => mudarNomePrevEspec(e.target.value)}
                            />
                        </div>
                        <div id='campoDescricaoConfigEspec'>
                            <label>Descrição:</label>
                            <input type="text" id='descricaoConfigEspec' 
                                value={especAberta.descricao}
                                onChange={(e) => mudarDescricaoPrevEspec(e.target.value)}/>
                        </div>
                        <div id='contCamposCoresEspecEdit'>
                            <div id='campoCor1ConfigEspec' className='campoConfigEspec'>
                                <label>Cor de fundo:</label>

                                <div className='inputsCamposCoresConfigEspec'>
                                    <input type="text" value={prevEspec.cor1}
                                        onChange={(e) => mudarCor1PrevEspec(e.target.value)}/>
                                    <input 
                                        type="color" name="" id="inpCorFundo" 
                                        value={prevEspec.cor1}
                                        onChange={(e) => mudarCor1PrevEspec(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div id='campoCor2ConfigEspec' className='campoConfigEspec'>
                                <label>Cor da letra:</label>
                                <div className='inputsCamposCoresConfigEspec'>
                                <input type="text" value={prevEspec.cor2}
                                    onChange={(e) => mudarCor2PrevEspec(e.target.value)}/>
                                <input 
                                    type="color" name="" id="inpCorLetra"
                                    value={prevEspec.cor2}
                                    onChange={(e) => mudarCor2PrevEspec(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>
                        <div id='contPreVisu'>
                            <div id='headPreVisu'>
                                <p>Pré-visualização:</p>
                                <button onClick={mudarTemaPrevEspecConfig}>Mudar tema</button>
                            </div>
                            <div id='preVisu' className={prevEspec.prevTema}>
                                <div id='especPreVisu'
                                style={{
                                    borderColor: prevEspec.cor2,
                                    backgroundColor: prevEspec.cor1,
                                    color: prevEspec.cor2
                                }}>
                                    {especAberta.nome}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='contServicosEspecEdit'>
                        <h3>Serviços relacionados</h3>
                        <div id='secAddServicoEspecEdit'>
                            <input type="text" list='dtListServicos' id='inputAddServicoEspecEdit' value={prevEspec.inpServ} onChange={(e) => mudarInputServPrevEspec(e.target.value)}/>
                            <datalist id='dtListServicos'>
                                {
                                    servicos
                                        .map(servico => (
                                            <option key={servico.id} value={servico.nome}>
                                                {servico.nome}
                                            </option>
                                        ))
                                }
                            </datalist>
                            <button onClick={addServToEspec}>Adicionar</button>
                        </div>
                        <div id='listServicosEditEspecEdit'>
                            {
                                especAberta.servicos.map(servico => 
                                    <div key={servico.id} className='itemListServicoEditEspecEdit'>
                                        <p>
                                        {servico.nome}
                                        </p>
                                        <button onClick={() => {deleteServEspec(servico.id)}}>
                                            X
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div id='contFimAcao'>
                    <button onClick={handleCancel}>cancelar</button>
                    <button onClick={handleSalvar}>salvar</button>
                    {
                        especAberta.id == "nova" ? '' :
                        <button onClick={handleDeletar}>deletar</button>
                    }
                    </div>
                </section>
            }
        </main>
        <div id='shadowBG'>
            
        </div>
        </div>
    )
}
export default Especialidades