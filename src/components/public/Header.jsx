import { Link } from 'react-router-dom'
import './Header.css'
function Header() {
    return (
        <header id='header'>
            <Link id="sair" to="/">
                sair
            </Link>
        </header>
    )
}
export default Header