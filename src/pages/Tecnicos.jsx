import { Link } from 'react-router-dom'
import navAbrir  from '../assets/navAbrir.png'
import navFechar  from '../assets/navFechar.png'
import '../styles/tecnicos.css'
function Tecnicos() {
    async function changeNav() {
        const sideNav = document.getElementById("sideNavTecnicos")
        const button = document.getElementById("bttNav")

        if (button.className == "navFechar") {
            sideNav.style.display = "none"
            button.className = "navAbrir"
            button.src = navAbrir
        } else {
            sideNav.style.display = "flex"
            button.className = "navFechar"
            button.src = navFechar
        }
    }
    return (
        <>
        <nav id='navTecnicos'>
            <img id="bttNav" src={ navAbrir } alt="" onClick={changeNav} className="navAbrir"/>
            <Link id="sair" to="/">
                sair
            </Link>
        </nav>
        <div id="sideNavTecnicos" className="goTo">
            <Link className="links" to="/home">home</Link>
            <Link className="links" to="/clientes">clientes</Link>
            <Link className="links" to="/ordens">ordens de serviços</Link>
        </div>
        <main id='mainTecnicos'>
            <section id='sec1'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim asperiores facere aperiam, consequatur beatae commodi sed saepe minima dolorum rem officia alias repellendus vero perspiciatis officiis eum cum. Nostrum, labore.
            </section>
            <section id='sec2'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora corporis veniam fuga. Modi, ea eaque consequuntur quisquam veniam voluptatum amet numquam adipisci natus error, nisi voluptatem unde tempore perferendis eveniet!</section>
            <section id='sec3'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
            </section>
            <section id='sec4'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fugit optio, numquam minima hic minus iusto neque? Est quae, repudiandae iure blanditiis quam esse incidunt quia ex, voluptatem reiciendis ipsa?
            </section>
        </main>
        </>
    )
}

export default Tecnicos