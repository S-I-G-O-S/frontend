import '@styles/public/nav.css'
import { NavLink } from 'react-router-dom'
import navLeft  from '@assets/navLeft.png'
import navRight  from '@assets/navRight.png'
// import homeIcon from '@assets/homeIcon.png'
import { FundFilled, HomeFilled, IdcardFilled, LeftCircleFilled, LogoutOutlined, ReadFilled, RightCircleFilled, ScheduleFilled, SettingFilled, SettingOutlined, ShoppingFilled, TagFilled }  from '@ant-design/icons'
import { usePreferencias } from '@context/PreferenciasContext'
import { useAuth } from '@context/authContext'

function Nav({ cargo }) {
    const { logout } = useAuth()
    const { changeNav, viewNav } = usePreferencias()
    const handleLogout = async () => {
        logout()
    }
    return (
        <nav id='nav' className={viewNav ? "navAberto" : "navFechado"}>
            {/* 
                <RightCircleFilled />
                <LeftCircleFilled /> 
            */}
            <div id='containerFooter'>
                {/* <div>Leonardo Martinez</div> */}
                <button title='sair' onClick={handleLogout}>
                    <LogoutOutlined id='iconSair' rotate={180}/>
                    <div id='txtSair'>sair</div>
                </button>
            </div>
            {
                true ? 
                <img id="bttNav" 
                src={viewNav ? navLeft : navRight}
                onClick={changeNav} 
                className={viewNav ? "navFechar" : "navAbrir"}/>
                :
                <></>
            }
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
                        to="/servicos"
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
                {cargo==='TECNICO' ?
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
                {(cargo==="DEV" || cargo==="ADM") && (
                    <NavLink
                        className={"links"}
                        id='goToGrafana'
                        to={"https://sigostcc.grafana.net/"}
                        title='Análise'
                        target='_blank'
                        >
                        <FundFilled className="iconNav"/>
                        <p className='nomeGoTo'>análise</p>
                    </NavLink>
                )}
            </div>
            
        </nav>
    )
}

export default Nav