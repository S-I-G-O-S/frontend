import { Link } from 'react-router-dom'
import '../styles/login.css'
import Negocio from '../assets/negocio.png'
import Analise from '../assets/analise.png'

function Login() {
    return (
        <main id='mainLogin'>
            <section id="secLogin">
                <h2>Bem-vindo ao SIGOS</h2>
                <input id="email" type="text" placeholder='email'/>
                <input id="senha" type="text" placeholder='senha'/>
                <Link id="entrar" to="/home">entrar</Link>
                <a id="esqueciMinhaSenha" href="">esqueci minha senha</a>
            </section>
            <img id='imgBG1' src={Negocio} alt="" />
            <img id='imgBG2' src={Analise} alt="" />
        </main>
    )
} 

export default Login