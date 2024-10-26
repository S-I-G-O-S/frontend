import { Link } from 'react-router-dom'
import '../styles/login.css'
import Negocio from '../assets/negocio.png'
import Analise from '../assets/analise.png'
import { useEffect, useState } from 'react'

function Login() {
    const [primeiroAcesso, setPrimeiroAcesso] = useState(false)
    const [senha, setSenha] = useState({
        senha: '',
        rSenha: ''
    })
    const [funcionario, setFuncionario] = useState()
    const [request, setRequest] = useState(null)
    const [forcaSenha, setForcaSenha] = useState('Fraca')
    const fetchFuncionario = async () => {
        try {
            const response = await getFuncionarioPorID(idFuncionario)
            setFuncionario(response.data)
            setRequest(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    const calcSegurancaSenha = (senha) => {
        let criteriaMet = 0;
    
        // Verificar cada critério
        const hasUpperCase = /[A-Z]/.test(senha);
        const hasLowerCase = /[a-z]/.test(senha);
        const hasSpecialChar = /[$#&_]/.test(senha);
        const hasMinLength = senha.length >= 8;
    
        // Contabilizar critérios atendidos
        if (hasUpperCase) criteriaMet++;
        if (hasLowerCase) criteriaMet++;
        if (hasSpecialChar) criteriaMet++;
        if (hasMinLength) criteriaMet++;
    
        // Determinar a qualidade da senha
        if (criteriaMet <= 2) {
            setForcaSenha('Fraca');
        } else if (criteriaMet === 3) {
            setForcaSenha('Moderada');
        } else if (criteriaMet === 4) {
            setForcaSenha('Boa');
        }
      };
    const changePrimeiroAcesso = () => {
        setPrimeiroAcesso(!primeiroAcesso)
    }
    useEffect(() => {

    }, [])
    return (
        <main id='mainLogin'>
            <section id="secLogin">
                <h2>Bem-vindo ao SIGOS</h2>
                <input id="email" type="text" placeholder='email'/>
                <input id="senha" type="text" placeholder='senha'/>
                <Link id="entrar" to="/home">entrar</Link>
                <a id="esqueciMinhaSenha" href="">esqueci minha senha</a>
                <p onClick={changePrimeiroAcesso}>primeiro acesso</p>            
            </section>
            {/* <img id='imgBG1' src={Negocio} alt="" />
            <img id='imgBG2' src={Analise} alt="" /> */}
            {
                primeiroAcesso && 
                (<div id='shadowBG'>
                <section id='secPrimeigoAcesso'>
                    <div id='contMsgAviso'>
                        <h1>Olá Nome do funcionario</h1>
                        <p>Para garantir a segurança de sua conta, precisamos que você defina sua senha de acesso.</p>
                    </div>
                    <div id='contSenhas'>
                        <div id='contSenha'>
                            <label>Nova senha:</label>
                            <input type="text" />
                        </div>
                        <div id='contRepetirSenha'>
                            <label>Repetir senha:</label>
                            <input type="text" />
                        </div>
                        <div id='contCriteriosSenha'>
                            <p>sugerimos que esta senha os seguintes caracteres:</p>
                            <div id='criteriosSenha'>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                        <div id='contForcaSenha'>
                            <p>força a senha: {forcaSenha}</p>
                        </div>
                    </div>
                    <div id='contAcaoPrimeiroAcesso'>
                        <button onClick={changePrimeiroAcesso}>voltar</button>
                        <button>entrar</button>
                    </div>
                </section>
                </div>)
            }
        </main>
    )
} 

export default Login