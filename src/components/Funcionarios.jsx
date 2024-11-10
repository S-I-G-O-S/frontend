// Estilização
import '../styles/funcionarios.css'

import Nav from './public/Nav'
import Header from './public/Header'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import ListFuncionarios from './Funcionarios/ListFuncionarios';
import { getCookie } from '../services/cookies'

// TODO tratamento para evitar espaços no começo e no final dos nomes

//https://community.revelo.com.br/react-query-um-guia-pratico/
function Funcionarios() {
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const navigate = useNavigate()
    const goToEspecialidades = () => {
        navigate(`/especialidades`)
    }
    const handleCreateClick = () => {
        navigate(`/funcionario`)
    }
    useEffect(() => {
        //console.clear()
        // console.log(isMobile ? 'é mobile' : 'não é mobile' )
    }, [])

    return (
        <div id='pageFuncionarios' className='paginas'>
        <Header titulo={"Página inicial"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id='mainFuncionarios'>
            <section id='secList'>
                <div id='contEspecsNovoFunc'>
                    <button className='btt' onClick={() => goToEspecialidades()}>
                            Especialidades e Serviços
                    </button>
                    {   
                    usuario.cargo == 'adm' || usuario.cargo == 'dev' ?
                    <button className='btt'
                        onClick={() => handleCreateClick()}>Novo Funcionário</button>
                    : ''
                    } 
                </div>
                <ListFuncionarios></ListFuncionarios>
            </section>
        </main>
        </div>
    )
}

export default Funcionarios