import { Link } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
function Header(props) {
    const [viewContUser, setViewContUser] = useState(false)
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario')
        return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
    })
    const handleViewConfiguser = () => {
        if(viewContUser) {
            setViewContUser(false)
        } else {
            setViewContUser(true)
        }
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
                        <p id='nomeUsuario'>Usuário teste</p>
                        <p id='cargoUsuario'>{usuario.cargo}</p>
                        <Link id='toUserConfig' to={'/usuario'}>usuário </Link>
                    </div>
                }
                <Link id="sair" to="/">
                    sair
                </Link>
            </div>
        </header>
    )
}
export default Header