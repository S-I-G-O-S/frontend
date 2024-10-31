// Funções de requisições
import {getFuncionarios, getPageFuncionarios} from '../../services/funcionariosAPI.js'
import {getEspecialidades} from '../../services/especialidadesAPI.js'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/funcionarios.css'
import Edit from '../../assets/edit-text.png'
import Down from '../../assets/dark/down.png' 
import Up from '../../assets/dark/up.png'
import Loading from './../public/Loading.jsx'

function ListFuncionarios() {
    const navigate = useNavigate()
    const [reqstFuncionarios, setReqstFuncionarios] = useState()
    const [reqstEspecialidades, setReqstEspecialidades] = useState()
    const [funcionarios, setFuncionarios] = useState()
    const [especialidades, setEspecialidades] = useState()
    const [filtros, setFiltros] = useState({
        nome: null,
        cargo: null,
        especialidade: null,
        disponivel: null,
        ativo: null,
    })
    const handleEditClick = (idFuncionario) => {
        navigate(`/funcionario?id=${idFuncionario}`);
    }
    const converterDtHr = (dataHora) => {
        const data = new Date(dataHora)
        // Formata para o estilo desejado
        const dataLegivel = data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        return dataLegivel
    }
    const converterEspecs = (idEspec) => {
        let especialidade = especialidades.find(espec => espec.id == idEspec)
        const [cor1, cor2] = especialidade.cor.split('/')
        return (
            <div className='skillsFunc' key={especialidade.id}
                style={{
                        borderColor: cor2,
                        backgroundColor: cor1,
                        color: cor2
                }}
            >
                {especialidade.nome}
            </div>
        )
    }
    const verEspecialidades = (idFuncionario) => {
        const contato = document.getElementById(`contSkillsFunc${idFuncionario}`)
        const img = document.getElementById(`imgSetaSkillsFunc${idFuncionario}`)
            if (contato.classList == 'containerSkillsFunc skillsFechado') {
            contato.classList = "containerSkillsFunc skillsAberto"
            img.src = Up
        } else {
            contato.classList = "containerSkillsFunc skillsFechado"
            img.src = Down
        }
    }
    const fetchEspecialidades = async () => {
        try {
            const response = await getEspecialidades()
            setReqstEspecialidades(response)
            setEspecialidades(response.data.content)
            console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchFuncionarios = async (pagina) => {
        try {
            const result = await getPageFuncionarios(pagina, filtros)
            setReqstFuncionarios(result)
            setFuncionarios(result.data.content)
            console.warn(result)
        } catch (error) {
            setErro(error.message)
        }
    }
    const handlePageClick = (pagina) => {
        fetchFuncionarios(pagina)
    }
    const renderPaginas = () => {
        const totalPages = reqstFuncionarios.data.page.totalPages
        let render = []
        for (let pags = 0; pags < totalPages; pags++) {
            render.push(
                <button 
                    key={pags} 
                    className="paginaItem"
                    onClick={() => handlePageClick(pags)}
                >
                    {pags + 1}
                </button>
            )
        }
        return render
    }
    useEffect(() => {
        const fetchData = async () => {
            fetchFuncionarios(0)
            fetchEspecialidades()
        }
        fetchData()
    }, [])
    return(
        <>
        <div id="tableWrapper">
        <table id='listFuncs'>
            <thead id='titleList'>
                <tr >
                    <th className='nomeTitle cl1'>nome</th>
                    <th className='cellTitle cl2'>celular</th>
                    <th className='ultAtvTitle cl3'>ultima atividade</th>
                    <th className='cargoTitle cl4'>cargo</th>
                    <th className='statusTitle cl5'>status</th>
                    <th className='cl6'></th>
                    <th className='cl7'></th>
                </tr>
            </thead>
            <tbody>
            {
                !funcionarios ? 
                <Loading></Loading> :
                funcionarios.map(funcionario => (
                    <tr id={`funcionario${funcionario.id}`} className='funcs skillsFechado' key={funcionario.id}>
                        <td className='nomeFunc cl1'>
                            {funcionario.primeiro + ' ' + funcionario.ultimo}
                        </td>
                        <td className='cellFunc cl2'>
                            {funcionario.celular}
                        </td>
                        <td className='ultAtvFunc cl3'>
                            {converterDtHr(funcionario.ultimaAtividade)}
                        </td>
                        <td className='cargoFunc cl4'>
                            {funcionario.cargo}
                        </td>
                        <td className='statusFunc cl5'>
                            {
                                funcionario.isDisponivel
                                    ? 'disponível'
                                    : 'indisponível'
                            }
                        </td>
                        <td className='setaSkillsFunc cl6'
                        onClick={() => verEspecialidades(funcionario.id)}>
                            <img id={`imgSetaSkillsFunc${funcionario.id}`} className='imgSetaSKills' src={Down} alt="ver especialidades"/>
                        </td>
                        <td className='editFunc cl7' onClick={() => handleEditClick(funcionario.id)}>
                            <img className='imgEditFunc' src={Edit} alt="editar"/>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </div>
        <div id='contPagesFuncionarios' className='paginacao'>
            {
                !reqstFuncionarios ? '' :
                renderPaginas()
            }
        </div>
        {/* <div id={`contSkillsFunc${funcionario.id}`} className='containerSkillsFunc skillsFechado'>
            {
                !especialidades ? 'carregando...' :
                funcionario.especialidades.map(especID => (
                    converterEspecs(especID)
                ))
            }
        </div> */}
        </>
    )
}
export default ListFuncionarios