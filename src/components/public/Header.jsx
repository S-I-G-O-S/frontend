import { Link } from 'react-router-dom'
import './Header.css'
function Header(props) {
    return (
        <header id='header'>
            <h1 className='tituloPag'>{props.titulo}</h1>
            <Link id="sair" to="/">
                sair
            </Link>
        </header>
    )
}
export default Header