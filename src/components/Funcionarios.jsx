// Estilização
import '../styles/funcionarios.css'

import Nav from './public/Nav'
import Header from './public/Header'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import ListFuncionarios from './Funcionarios/ListFuncionarios';


// TODO tratamento para evitar espaços no começo e no final dos nomes

//https://community.revelo.com.br/react-query-um-guia-pratico/
function Funcionarios() {
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario')
        return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
    })

    const navigate = useNavigate()
    const goToEspecialidades = () => {
        navigate(`/especialidades`)
    }
    const handleCreateClick = () => {
        navigate(`/funcionario`)
    }
    

    useEffect(() => {
        console.clear()
        console.log(isMobile ? 'é mobile' : 'não é mobile' )
    }, [])

    return (
        <div id='pageFuncionarios' className='paginas'>
        <Header titulo={"Funcionários"}></Header>
        <Nav></Nav>
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