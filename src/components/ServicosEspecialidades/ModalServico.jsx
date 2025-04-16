import { deleteServico, postServico, putServico } from "../../services/backend/servicosAPI"
import TextArea from 'antd/es/input/TextArea'
import { notification } from 'antd';
import { useState } from "react";
import { MinusCircleFilled } from '@ant-design/icons'
import Loading from "@components/public/Loading";

const ModalServico = ({ fecharModal, especialidades, servicoAberto, setServicoAberto, setServicos }) => {
    const [pesqAddEspec, setPesqAddEspec] = useState('')
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
    const handleSalvar = async () => {
        let result
        let arrayEspecs = []
        servicoAberto.especialidades.map(espec => (
            arrayEspecs.push(espec.id)
        ))
        if (servicoAberto.id == "novo") {
            result = await postServico(servicoAberto, arrayEspecs)
        } else {
            result = await putServico(servicoAberto, arrayEspecs)
        }
        if (!result.success) {
            notification.error({
                message: 'Erro ao salvar serviço!',
                placement: 'bottomLeft',
            })
            console.error(result.error)
            return
        }
        setServicos(prevState => (
            [...prevState, servicoAberto]
        ))
        notification.success({
            message: 'Alterações salvas com sucesso!',
            placement: 'bottomLeft',
        })
        console.warn(servicoAberto)
        sair()
    }
    const handleDeletar = async () => {
        if(!window.confirm("Deseja APAGAR o serviço: " + servicoAberto.nome + "?")) {
            return
        }
        const result = await deleteServico(servicoAberto.id);
        if (!result.success) {
            console.error(result.error)
            return
        }
        setServicos((prev) => prev.filter((servico) => servico.id !== servicoAberto.id))
        sair()
    }
    const deleteEspecServ = (idEspec) => {
        setServicoAberto(especState => ({
            ...especState,
            especialidades: especState.especialidades.filter(espec => espec.id !== idEspec)
        }))
    }
    const sair = () => {
        setServicoAberto(null)
        fecharModal()
    }
    return !servicoAberto ? <Loading></Loading> : (
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
                <button id='bttCancelar' onClick={sair}>cancelar</button>
                <button id='bttSalvar' onClick={handleSalvar}>salvar</button>
                {
                    servicoAberto.id == "novo" ? '' :
                        <button id='bttExcluir' onClick={handleDeletar}>deletar</button>
                }
            </div>
        </section>
    )
}
export default ModalServico