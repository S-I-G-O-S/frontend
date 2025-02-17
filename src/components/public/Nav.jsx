import './Nav.css'
import { NavLink } from 'react-router-dom'
import navLeft  from '@assets/navLeft.png'
import navRight  from '@assets/navRight.png'
// import homeIcon from '@assets/homeIcon.png'
import funcsIcon from '@assets/funcsIcon.png'
import clientesIcon from '@assets/clientesIcon.png'
import ordensIcon from '@assets/ordensIcon.png'
import especsIcon from '@assets/tag.png'
import { useEffect, useState } from 'react'
import { HomeFilled, IdcardFilled, LogoutOutlined, ReadFilled, ScheduleFilled, SettingFilled, SettingOutlined, ShoppingFilled, TagFilled }  from '@ant-design/icons'
import { IconFuncionarios } from './IconsSVG'
import { usePreferencias } from '@context/PreferenciasContext'
import { logoutFunc } from '@backend/authAPI'
import { useAuth } from '@context/authContext'
import { deleteCookie } from '@services/cookies'

function Nav({ cargo }) {
    const { setToken } = useAuth()
    const { sessPreferencias, setSessPreferencias } = usePreferencias()
    const changeNav = () => {
        setSessPreferencias(prevState => ({
            ...prevState,
            abertoNav: !sessPreferencias.abertoNav
        }))
    }
    const handleLogout = async () => {
        try {
            const result = await logoutFunc()
            console.warn(result)
        } catch (error) {
            console.error(error)
        }
        sessionStorage.clear()
        setToken(null)
        deleteCookie('usuario')
        navigate("/", { replace: true })
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
                        {/* <img src={funcsIcon} alt="" /> */}
                        <IdcardFilled className='iconNav'/>
                        <p className='nomeGoTo' id='goToFuncionariosP'>funcionarios</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")} 
                        id='goToClientes' 
                        to="/clientes"
                        title='Clientes'
                        // activeClassName="active" 
                        >
                        {/* <img src={clientesIcon} alt="clientes" /> */}
                        <ShoppingFilled className='iconNav'/>
                        <p className='nomeGoTo' id='goToClientesP'>clientes</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")}
                        id='goToOrdens' 
                        to="/ordens"
                        title='Ordens'
                        // activeClassName="active" 
                        >
                        {/* <img src={ordensIcon} alt="ordens" /> */}
                        <ScheduleFilled className='iconNav' />
                        <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "links active" : "links ")}
                        id='goToEspecs' 
                        to="/especialidades"
                        title='Especialidades e serviços'
                        // activeClassName="active" 
                        >
                        {/* <img src={especsIcon} alt="ordens" /> */}
                        <TagFilled className='iconNav'/>
                        <p className='nomeGoTo' id='goToEspecsP'>serviços</p>
                    </NavLink>
                </> :  ''
                }
                {/* Paginas exibidas só para usuarios 'tecnico' */}
                {/* TODO pagina Meus Atendimentos mostrando para todos exceto tecnicos */}
                {!cargo!=='TECNICO' ?
                <> 
                    <NavLink
                        className={({ isActive }) => (isActive ? "links active" : "links ")}
                        id='goToMeusAtendimentos' 
                        to="/atendimentos"
                        title='Meus Atendimentos'
                        >
                        <ReadFilled className='iconNav'/>
                        <p className='nomeGoTo' id='goToMeusAtendimentosP'>Meus Atendimentos</p>
                    </NavLink>
                </> : ''
                }
                <NavLink
                    className={({ isActive }) => (isActive ? "links active" : "links ")}
                    id='goToHome' 
                    to="/configuracoes"
                    title='Configurações'
                    // activeClassName="active" 
                    >
                    <SettingFilled className='iconNav' />
                    {/* <img src={homeIcon} alt="home" /> */}
                    <p className='nomeGoTo' id='goToConfigsP'>Configurações</p>
                </NavLink>
            </div>
            <div id='containerFooter'>
                <button title='sair' onClick={handleLogout}>
                    <LogoutOutlined id='iconSair' rotate={180}/>
                    <div id='txtSair'>sair</div>
                </button>
            </div>
        </nav>
    )
}

export default Nav