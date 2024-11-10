import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
import { useAuth } from '../../provider/authProvider'
import { navigate } from '@storybook/addon-links'
import { deleteCookie } from '../../services/cookies'
function Header(props) {
    const navigate = useNavigate()
    const { setToken } = useAuth()
    const [viewContUser, setViewContUser] = useState(false)
    // const [usuario, setUsuario] = useState(() => {
    //     const storedUsuario = sessionStorage.getItem('usuario')
    //     return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
    // })
    const usuario = props.usuario
    const handleViewConfiguser = () => {
        if(viewContUser) {
            setViewContUser(false)
        } else {
            setViewContUser(true)
        }
    }
    const handleLogout = () => {
        setToken(null)
        deleteCookie('usuario')
        deleteCookie('tema')
        navigate("/", { replace: true })
    }
    return (
        <header id='header'>
            <div id='headerLeft'>
                <h1 className='tituloPag'>{props.titulo}</h1>
            </div>
            <div id='headerRight'>
                <div id='contIconUser' onClick={handleViewConfiguser} >
                    
                </div>
                {
                    !viewContUser ? '' :
                    <div id='contConfigUser'>
                        <p id='nomeUsuario'>{usuario.nome}</p>  
                        <p id='cargoUsuario'>{usuario.cargo}</p>
                        <Link id='toUserConfig' to={'/usuario'}>Configurações</Link>
                    </div>
                }
                <button id="sair" onClick={handleLogout}>
                    sair
                </button>
            </div>
        </header>
    )
}
export default Header