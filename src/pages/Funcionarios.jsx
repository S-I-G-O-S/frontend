import { Link } from 'react-router-dom'
import navLeft  from '../assets/navLeft.png'
import navRight  from '../assets/navRight.png'
import homeIcon from '../assets/homeIcon.png'
import clientesIcon from '../assets/clientesIcon.png'
import ordensIcon from '../assets/ordensIcon.png'
import '../styles/funcionarios.css'

function Funcionarios() {
    async function changeNav() {
        const nav = document.getElementById("navFuncionarios")
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
        <div id='pageFuncionarios'>
        <header id='headerFuncionarios'>
            <Link id="sair" to="/">
                sair
            </Link>
        </header>
        <nav id="navFuncionarios" className="goTo navFechado">
            <img id="bttNav" src={ navRight } alt="" onClick={changeNav} className="navAbrir"/>
            <div id='containerLinks'>
                <Link className="links" id='goToHome' to="/home">
                    <img src={homeIcon} alt="home" />
                    <p className='nomeGoTo' id='goToHomeP'>home</p>
                </Link>
                <Link className="links" id='goToClientes' to="/clientes">
                    <img src={clientesIcon} alt="clientes" />
                    <p className='nomeGoTo' id='goToClientesP'>clientes</p>
                </Link>
                <Link className="links" id='goToOrdens' to="/ordens">
                    <img src={ordensIcon} alt="ordens" />
                    <p className='nomeGoTo' id='goToOrdensP'>ordens</p>
                </Link>
            </div>
        </nav>
        <main id='mainFuncionarios'>
            <section id='sec1'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim asperiores facere aperiam, consequatur beatae commodi sed saepe minima dolorum rem officia alias repellendus vero perspiciatis officiis eum cum. Nostrum, labore.
            </section>
            <section id='sec2'>
                ipsum dolor sit amet consectetur, adipisicing elit. Tempora corporis veniam fuga. Modi, ea eaque consequuntur quisquam veniam voluptatum amet numquam adipisci natus error, nisi voluptatem unde tempore perferendis eveniet!</section>
            <section id='sec3'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
                ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
            </section>
            <section id='sec4'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
            </section>
        </main>
        </div>
    )
}

export default Funcionarios