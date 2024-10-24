import './Nav.css'
import { NavLink } from 'react-router-dom'
import navLeft  from '../../assets/navLeft.png'
import navRight  from '../../assets/navRight.png'
import homeIcon from '../../assets/homeIcon.png'
import funcsIcon from '../../assets/funcsIcon.png'
import clientesIcon from '../../assets/clientesIcon.png'
import ordensIcon from '../../assets/ordensIcon.png'
import especsIcon from '../../assets/tag.png'
import { useEffect, useState } from 'react'

function Nav(cargo) {
    const [sessionConfig, setSessionConfig] = useState({
        abertoNav: true
    })
    const saveSessionConfig = (config) => {
        sessionStorage.setItem('preferencias', JSON.stringify(config))
    }
    useEffect(() => {
        const storedSessionConfig = JSON.parse(sessionStorage.getItem('preferencias'))
        if (storedSessionConfig) {
            setSessionConfig(storedSessionConfig)
        }
    }, [])
    const abrirNav = () => {
        setSessionConfig({ abertoNav: true })
        saveSessionConfig({ abertoNav: true })
    }
    const fecharNav = () => {
        setSessionConfig({ abertoNav: false })
        saveSessionConfig({ abertoNav: false })
    }
    const changeNav = () => {
        if (sessionConfig.abertoNav) {
            fecharNav()
        } else {
            abrirNav()
        }
    }
    return (
        <nav id='nav' className={sessionConfig.abertoNav ? "navAberto" : "navFechado"}>
            <img id="bttNav" 
                src={sessionConfig.abertoNav ? navLeft : navRight}
                onClick={changeNav} className={sessionConfig.abertoNav ? "navFechar" : "navAbrir"}/>
            <div id='containerLinks'>
                <NavLink
                    className={({ isActive }) => (isActive ? "links active" : "links ")}
                    id='goToHome' 
                    to="/home"
                    // activeClassName="active" 
                    >
                    <img src={homeIcon} alt="home" />
                    <p className='nomeGoTo' id='goToHomeP'>home</p>
                </NavLink>
                
                {
                    
                cargo.cargo == 'base' && cargo.cargo == 'adm' ? '' :
                <> 
                <NavLink 
                    className={({ isActive }) => (isActive ? "links active" : "links ")}
                    id='goToFuncionarios' 
                    to="/funcionarios"
                    // activeClassName="active" 
                    >
                    <img src={funcsIcon} alt="funcionarios" />
                    <p className='nomeGoTo' id='goToFuncionariosP'>funcionarios</p>
                </NavLink>
                <NavLink 
                    className={({ isActive }) => (isActive ? "links active" : "links ")} 
                    id='goToClientes' 
                    to="/clientes"
                    // activeClassName="active" 
                    >
                    <img src={clientesIcon} alt="clientes" />
                    <p className='nomeGoTo' id='goToClientesP'>clientes</p>
                </NavLink>
                <NavLink 
                    className={({ isActive }) => (isActive ? "links active" : "links ")}
                    id='goToOrdens' 
                    to="/ordens"
                    // activeClassName="active" 
                    >
                    <img src={ordensIcon} alt="ordens" />
                    <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                </NavLink>
                <NavLink 
                    className={({ isActive }) => (isActive ? "links active" : "links ")}
                    id='goToEspecs' 
                    to="/especialidades"
                    // activeClassName="active" 
                    >
                    <img src={especsIcon} alt="ordens" />
                    <p className='nomeGoTo' id='goToEspecsP'>especialidades & serviços</p>
                </NavLink>
                </>
                }
            </div>
        </nav>
    )
}

export default Nav