import './Nav.css'
import { NavLink } from 'react-router-dom'
import navLeft  from '../../assets/navLeft.png'
import navRight  from '../../assets/navRight.png'
// import homeIcon from '../../assets/homeIcon.png'
import funcsIcon from '../../assets/funcsIcon.png'
import clientesIcon from '../../assets/clientesIcon.png'
import ordensIcon from '../../assets/ordensIcon.png'
import especsIcon from '../../assets/tag.png'
import { useEffect, useState } from 'react'
import { HomeFilled }  from '@ant-design/icons'
import { IconFuncionarios } from './IconsSVG'

function Nav(props) {
    const [sessPreferencias, setSessPreferencias] = useState(() => {
        const storedUsuario = sessionStorage.getItem('preferencias')
        return storedUsuario ? JSON.parse(storedUsuario) : { abertoNav: true }
    })
    // const [usuario, setUsuario] = useState(() => {
    //     const storedUsuario = sessionStorage.getItem('usuario')
    //     return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'adm' }
    // })
    const cargo = props.cargo
    useEffect(() => {
        if (sessPreferencias) {
            sessionStorage.setItem('preferencias', JSON.stringify(sessPreferencias))
        }
        
    }, [sessPreferencias])
    const changeNav = () => {
        if (sessPreferencias.abertoNav) {
            setSessPreferencias({ abertoNav: false })
        } else {
            setSessPreferencias({ abertoNav: true })
        }
    }
    return (
        <nav id='nav' className={sessPreferencias.abertoNav ? "navAberto" : "navFechado"}>
            <img id="bttNav" 
                src={sessPreferencias.abertoNav ? navLeft : navRight}
                onClick={changeNav} className={sessPreferencias.abertoNav ? "navFechar" : "navAbrir"}/>
            <div id='containerLinks'>
                <NavLink
                    className={({ isActive }) => (isActive ? "links active" : "links ")}
                    id='goToHome' 
                    to="/home"
                    title='Home'
                    // activeClassName="active" 
                    >
                    <HomeFilled className='iconNav' />
                    {/* <img src={homeIcon} alt="home" /> */}
                    <p className='nomeGoTo' id='goToHomeP'>home</p>
                </NavLink>
                
                {/* Paginas exibidas só para usuarios 'base' ou 'adm' */}
                {cargo === 'BASE' || cargo === 'ADM' || cargo == 'DEV' ?
                <> 
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")}
                        id='goToFuncionarios' 
                        to="/funcionarios"
                        title='Funcionário'
                        // activeClassName="active" 
                        >
                        {/* <IconFuncionarios className='iconNav'></IconFuncionarios> */}
                        <img src={funcsIcon} alt="" />
                        <p className='nomeGoTo' id='goToFuncionariosP'>funcionarios</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")} 
                        id='goToClientes' 
                        to="/clientes"
                        title='Clientes'
                        // activeClassName="active" 
                        >
                        <img src={clientesIcon} alt="clientes" />
                        <p className='nomeGoTo' id='goToClientesP'>clientes</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")}
                        id='goToOrdens' 
                        to="/ordens"
                        title='Ordens'
                        // activeClassName="active" 
                        >
                        <img src={ordensIcon} alt="ordens" />
                        <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")}
                        id='goToEspecs' 
                        to="/especialidades"
                        title='Especialidades e serviços'
                        // activeClassName="active" 
                        >
                        <img src={especsIcon} alt="ordens" />
                        <p className='nomeGoTo' id='goToEspecsP'>especialidades & serviços</p>
                    </NavLink>
                </> :  ''
                }
            </div>
        </nav>
    )
}

export default Nav