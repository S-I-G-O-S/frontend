import './Nav.css'
import { NavLink } from 'react-router-dom'
import navLeft  from '../../assets/navLeft.png'
import navRight  from '../../assets/navRight.png'
import homeIcon from '../../assets/homeIcon.png'
import funcsIcon from '../../assets/funcsIcon.png'
import clientesIcon from '../../assets/clientesIcon.png'
import ordensIcon from '../../assets/ordensIcon.png'

function Nav() {
    async function changeNav() {
        const nav = document.getElementById("nav")
        const button = document.getElementById("bttNav")

        if (button.className == "navFechar") {
            //sideNav.style.display = "none"
            button.className = "navAbrir"
            button.src = navRight
            nav.className = "navFechado"
        } else {
            //sideNav.style.display = "flex"
            button.className = "navFechar"
            button.src = navLeft
            nav.className = "navAberto"
        }
    }
    return (
        <nav id='nav' className="goTo navFechado">
            <img id="bttNav" src={ navRight } alt="" onClick={changeNav} className="navAbrir"/>
            <div id='containerLinks'>
                <NavLink 
                    className="links" 
                    id='goToHome' 
                    to="/home"
                    activeClassName="active" 
                    exact>
                    <img src={homeIcon} alt="home" />
                    <p className='nomeGoTo' id='goToHomeP'>home</p>
                </NavLink>
                <NavLink 
                    className="links" 
                    id='goToFuncionarios' 
                    to="/funcionarios"
                    activeClassName="active" >
                    <img src={funcsIcon} alt="funcionarios" />
                    <p className='nomeGoTo' id='goToFuncionariosP'>funcionarios</p>
                </NavLink>
                <NavLink 
                    className="links" 
                    id='goToClientes' 
                    to="/clientes"
                    activeClassName="active" 
                    >
                    <img src={clientesIcon} alt="clientes" />
                    <p className='nomeGoTo' id='goToClientesP'>clientes</p>
                </NavLink>
                <NavLink 
                    className="links" 
                    id='goToOrdens' 
                    to="/ordens"
                    activeClassName="active" 
                    >
                    <img src={ordensIcon} alt="ordens" />
                    <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                </NavLink>
            </div>
        </nav>
    )
}

export default Nav