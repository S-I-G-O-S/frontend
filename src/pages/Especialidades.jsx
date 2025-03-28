// Funções de requisições
import { getEspecialidades, postEspecialidade, deleteEspec, putEspecialidade } from '@backend/especialidadesAPI.js'
import { getServicos, getServicoPorID, postServico, putServico } from '@backend/servicosAPI.js'

import '@styles/especialidades.css'
import Nav from '@components/public/Nav.jsx'
import UnitEspec from '@components/Especialidades/unitEspecialidade.jsx'
import Loading from '@components/public/Loading.jsx'
import { useEffect, useState } from 'react'

import TextArea from 'antd/es/input/TextArea'
import { MinusCircleFilled } from '@ant-design/icons'
import { ColorPicker } from 'antd'
import { getUsuarioContext } from '../context/UsuarioContext'
import { deleteServico } from '../services/backend/servicosAPI'

// https://www.delftstack.com/pt/howto/react/for-loop-in-react/

function Especialidades() {
    // Geral
    const { usuario } = getUsuarioContext()
    const [tipoJanela, setTipoJanela] = useState(null)
    const [layoutEspecServicos, setLayoutEspecServicos] = useState("layoutServicos")
    const [ordemEspecServicos, setOrdemEspecServicos] = useState("asc")
    // Especialidades
    const [reqstEspecialidades, setReqstEspecialidades] = useState([])
    const [especialidades, setEspecialidades] = useState(reqstEspecialidades)
    const [prevEspec, setPrevEspec] = useState(null)
    const [especAberta, setEspecAberta] = useState(null)
    // Serviços
    const [reqstServicos, setReqstServicos] = useState([])
    const [servicos, setServicos] = useState(reqstServicos)
    const [servicoAberto, setServicoAberto] = useState(null)
    const [pesqAddEspec, setPesqAddEspec] = useState('')
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
    //  EDIÇÃO ESPECIALIDADE
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
    const mudarCorPrevEspec = (corPrev, corTipo) => {
        setPrevEspec(prevState => ({
            ...prevState,
            [corTipo]: corPrev
        }))
    }
    useEffect(() => {
        if(prevEspec && especAberta) {
            setEspecAberta(especAberta => ({
                ...especAberta,
                cor: `${prevEspec.cor1}/${prevEspec.cor2}`,
            }))
        }
    }, [prevEspec])
    // EDIÇÃO SERVIÇO
    const addEspecToServ = () => {
        console.info("ADICIONANDO ESPECIALIDADE")
        let especToAdd = especialidades.find(espec => espec.nome.toLowerCase() === pesqAddEspec.toLowerCase())
        if (!especToAdd) {
            console.error("Serviço não encontrado!")
            setPesqAddEspec("Especialidade não encontrada")
            setTimeout(() => {
                setPesqAddEspec('')
            }, 2000)
            return
        }

        if (servicoAberto.especialidades.some(espec => espec.id === especToAdd.id)) {
            setPesqAddEspec('')
            console.error("Esta especialidade já foi adicionado a este serviço!");
            return
        }
        setServicoAberto(especState => ({
            ...especState,
            especialidades: [...especState.especialidades, especToAdd]
        }))
        setPesqAddEspec('')
    }
    const deleteEspecServ = (idEspec) => {
        setServicoAberto(especState => ({
            ...especState,
            especialidades: especState.especialidades.filter(espec => espec.id !== idEspec)
        }))
    }
    const changePesqAddEspec = (value) => {
        setPesqAddEspec(value)
    }
    const converterEspecs = (especialidade) => {
        const [cor1, cor2] = especialidade.cor.split('/')
        return (
            <div className='skillsServ' key={especialidade.id}
                style={{
                        borderColor: cor2,
                        backgroundColor: cor1,
                        color: cor2
                }}
            >
                <p>{especialidade.nome}</p>
                {/* <img src={removeIcon} onClick={() => {deleteEspecServ(especialidade.id)}}/> 
                <MinusCircleFilled />
                */}
                <MinusCircleFilled className='iconRmvEspec'
                    onClick={() => deleteEspecServ(especialidade.id)}
                /> 
            </div>
        )
    }
    const mudarInfoServico = (valor, campo) => {
        setServicoAberto(serv => ({
            ...serv,
            [campo]: valor,
        }))
    }
    // Geral
    const handleSalvar = async () => {
        let result
        console.log()
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
    const handleCancel = () => {
        fecharEspec()
    }
    const abrirEspec = (idEspec) => {
        if (tipoJanela == 'espec') {
            // TODO Excluir caso ocorra erro de uso ao abrir a mesma especialidade
            if(especAberta?.id == idEspec) {
                return
            }
            if(!window.confirm("Deseja excluir todas alterações da especialidade " + especAberta.nome + "?")) {
                
                return
            }
        }
        if (tipoJanela == 'servico') {
            if(!window.confirm("Deseja excluir todas alterações do serviço " + servicoAberto.nome + "?")) {
                return
            }
        }
        if (idEspec == "nova") {
        //  Nova Especialidade
            setEspecAberta({
                id: "nova",
                nome: 'Nova especialidade', 
                descricao: '', 
                cor: '',
            })
            setPrevEspec({
                prevTema: "preVisuLight",
                cor1: "#ffffff",
                cor2: "#000",
            })
        } else {
        //  Especialidade existente
            let especSelecionada = especialidades.find(espec => espec.id === idEspec)
            console.warn(especSelecionada)
            if (!especSelecionada) {
                console.error('Erro ao abrir especialidade.')
                return;
            }
            const [auxCor1, auxCor2] = especSelecionada.cor.includes('/') 
                ? especSelecionada.cor.split('/') 
                : [especSelecionada.cor, '#000']
            if (!auxCor1) {
                console.error('Erro ao abrir especialidade. Cor invalida.')
                return
            }
            setEspecAberta(especSelecionada)
            setPrevEspec({
                prevTema: "preVisuLight",
                cor1: auxCor1,
                cor2: auxCor2,
            })
        }
        console.log("especialidade do id " + idEspec +" foi aberta")
        fecharServ()
        setTipoJanela('espec')
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
            if(!window.confirm("Deseja excluir todas alterações da especialidade " + especAberta.nome + "?")) {
                
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
        setEspecAberta()
        setPrevEspec()
        setTipoJanela(null)
    }
    const fecharServ = () => {
        setServicoAberto(null)
        setTipoJanela(null)
    }
    const handleAttLista = () => {
        console.log("atualizando listas")
        const fetchData = async () => {
            if(layoutEspecServicos == 'layoutEspecs') {
                await fetchEspecialidades()
                await fetchServicos()
            } else {
                await fetchServicos()
                await fetchEspecialidades()
            }
        }
        fetchData()
    }
    const fetchEspecialidades = async () => {
        const result = await getEspecialidades()
        if (!result.success) {
            console.error(result.error)
            return
        }
        setReqstEspecialidades(result.response)
        setEspecialidades(result.response.data.content)
    }
    const fetchServicos = async () => {
        const result = await getServicos()
        
        if (!result.success) {
            console.error(result.error)
            return
        }
        setReqstServicos(result.response.data)
        setServicos(result.response.data.content)
    }
    useEffect(() => {
        const fetchData = async () => {
            fetchServicos()
            fetchEspecialidades()
        }
        fetchData()
    }, [])
    return(
        <div id='pageEspecialidades' className='paginas'>
        {/* <Header titulo={"Especialidades"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main className={
                !tipoJanela ? "secConfigFechada" : "secConfigAberta"
            }
        >
            <section id='sec1'>
                {
                    usuario.cargo == 'ADM' || usuario.cargo == 'DEV' ?
                    <div id='contNovo'>
                        <button onClick={() => {abrirEspec("nova")}}>
                            Nova Especialidade</button>
                        <button onClick={() => {abrirServico("novo")}}>Novo Serviço</button>
                    </div>
                    : ''
                }
                <div id='contFiltrosEspecServ'>
                    <div id='orderFiltrosEspecServ'>
                        <p>Ordernar por:</p>
                        <button id='nomeOrderFiltrosEspec' onClick={mudarOrdemEspecServicos}>
                            Nome {ordemEspecServicos.toUpperCase()}
                        </button>
                        <button onClick={handleAttLista}>Atualizar</button>
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
                        (
                            !especialidades ? 
                            <Loading></Loading> :
                            especialidades.map(espec => 
                            <UnitEspec key={espec.id} espec={espec} onClick={() => abrirEspec(espec.id)}></UnitEspec>
                        )) :
                        (
                            !servicos ? <Loading></Loading> :
                            servicos.map(serv => 
                            <div className='servicos' key={serv.id}
                                onClick={() => {abrirServico(serv.id)}}>
                                <h4>
                                    {serv.nome}
                                </h4>
                                <p>
                                    {serv.descricao}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>
            {
            !tipoJanela  ?
                '': 
                (tipoJanela == 'espec' ?
                    (<section id='secConfigEspec' className='secConfig'>
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
                                <TextArea
                                    id="txtDescricao"
                                    value={especAberta.descricao}
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
                            <div id='contCamposCoresEspecEdit'>
                                <ColorPicker 
                                    id="inpCorFundo"
                                    value={prevEspec.cor1}
                                    disabledAlpha
                                    arrow={false}
                                    showText={(color) => 
                                        <span>
                                            <strong className='labelColor'>Cor de fundo</strong> {color.toHexString()}
                                        </span>}
                                    onChangeComplete={(color) => mudarCorPrevEspec(color.toHexString(), 'cor1')} />
                                <ColorPicker
                                    id="inpCorLetra"
                                    value={prevEspec.cor2}
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
                        <div id='contFimAcao'>
                            <button id='bttCancelar' onClick={handleCancel}>cancelar</button>
                            <button id='bttSalvar' onClick={handleSalvar}>salvar</button>
                            {
                                especAberta.id == "nova" ? '' :
                                <button id='bttExcluir' onClick={handleDeletar}>deletar</button>
                            }
                        </div>
                    </section>) :
                    (!servicoAberto ? 
                        <Loading></Loading> : 
                        <section id='secConfigServico'>
                            <h2>Editando Serviço</h2>
                            <div id='contDadosConfigServ'>
                                <div id='nomeDadosConfigServ'>
                                    <label>Nome:</label>
                                    <input 
                                        type="text" id='nomeConfigEspec' 
                                        value={servicoAberto.nome}
                                        onChange={(e) => mudarInfoServico(e.target.value, 'nome')}
                                    />
                                </div>
                                <div id='descricaoDadosConfigServ'>
                                    <label>Descrição:</label>
                                    {/* <textarea 
                                        type="text" id='nomeConfigEspec' 
                                        value={servicoAberto.descricao}
                                        onChange={(e) => mudarInfoServico(e.target.value, 'descricao')}
                                    /> */}
                                    <TextArea
                                        id="txtDescricao"
                                        value={servicoAberto.descricao}
                                        onChange={(e) => mudarInfoServico(e.target.value, 'descricao')}
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
                            </div>
                            <div id='contEspecsConfigServ'>
                                <div id='contAddEspecFunc'>
                                    {/* pesquisar */}
                                    <input type="text" list='dtListEspecialidades'
                                        value={pesqAddEspec}
                                        onChange={(e) => changePesqAddEspec(e.target.value)}
                                    />
                                    <datalist id='dtListEspecialidades'>
                                        {
                                            !especialidades ? '' : 
                                            especialidades
                                                .map(espec => (
                                                    <option key={espec.id} value={espec.nome}>
                                                        {espec.nome}
                                                    </option>
                                                ))
                                        }
                                    </datalist>
                                    <button onClick={addEspecToServ}>Adicionar</button>
                                </div>
                                <div id="contListEspecFunc">
                                {
                                !servicoAberto ? 
                                    (<Loading></Loading>) : 
                                    ('id' in servicoAberto) ?
                                        (servicoAberto.especialidades && servicoAberto.especialidades.length > 0 ? 
                                            (servicoAberto.especialidades.map(espec => (
                                                converterEspecs(espec)
                                            ))) : 
                                            (<p id='msgSemEspecs'>Nenhuma especialidade adicionada</p>)) : 
                                        (<p id='msgSemEspecs'>Nenhuma especialidade adicionada</p>)
                                }
                                </div>
                                </div>
                                <div id='contAcaoConfigServ'>
                                    <button id='bttCancelar' onClick={handleCancel}>cancelar</button>
                                    <button id='bttSalvar' onClick={handleSalvar}>salvar</button>
                                    {
                                        servicoAberto.id == "novo" ? '' :
                                        <button id='bttExcluir' onClick={handleDeletar}>deletar</button>
                                    }
                            </div>
                        </section>
                    )
                )
            }
        </main>
        </div>
    )
}
export default Especialidades