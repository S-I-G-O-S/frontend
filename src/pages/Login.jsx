import { Link } from 'react-router-dom'
import '../styles/login.css'
function Login() {
    return (
        <main id='mainLogin'>
            <section id="secLogin">
                <h2>Bem-vindo</h2>
                <input id="email" type="text" placeholder='email'/>
                <input id="senha" type="text" placeholder='senha'/>
                <Link id="entrar" to="/home">entrar</Link>
                <a id="esqueciMinhaSenha" href="">esqueci minha senha</a>
            </section>
        </main>
    )
} 

export default Login