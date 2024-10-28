import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import Negocio from '../assets/negocio.png'
import Analise from '../assets/analise.png'
import { useEffect, useState } from 'react'
import { getFuncionarioPorID } from '../services/authAPI'
import zxcvbn from 'zxcvbn';
import Popup from './public/Popup'
import { useAuth } from '../provider/authProvider'

function Login() {
    const minForca = 3  // nivel obrigatorio da nova senha
    
    //  AUTH
    const { setToken } = useAuth()
    const navigate = useNavigate()

    // TODO fazer as requisições /login/
    const handleLogin = () => {
        setToken("imagine um token JWT aqui k")
        navigate("/home", { replace: true })
    }

    //  Resto da pagina
    const [primeiroAcesso, setPrimeiroAcesso] = useState(false)
    const [usuario, setUsuario] = useState({
        email: '',
        senha: ''
    })
    const [novaSenha, setNovaSenha] = useState({
        senha: '',
        rSenha: ''
    })
    const [msgNovaSenha, setMsgNovaSenha] = useState(null)
    const [msgLogin, setMsgLogin] = useState(null)
    const [funcionario, setFuncionario] = useState()
    const [request, setRequest] = useState(null)
    const [forcaSenha, setForcaSenha] = useState({
        nivel: 1,
        msg: 'muito fraca'
    })
    const [criteriosNovaSenhas, setCriteriosNovaSenhas] = useState({
        maiuscula: false,
        minuscula: false,
        especial: false,
        numero: false,
        tamMinimo: false
    })
    const handleChangeNovaSenha = (value, field) => {
        setMsgNovaSenha(null)
        setNovaSenha(prevState => ({
            ...prevState,
            [field]: value,
        }))
        changeForcaNovaSenha(value)
        //  calcSegurancaSenha(value)
    }
    const handleChangeUsuario = (value, field) => {
        setUsuario(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const changeCriterioNovaSenha = (field, value) => {
        setCriteriosNovaSenhas(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const changeForcaNovaSenha = (senha) => {
        const auxForca = zxcvbn(senha)
        if (auxForca.score == 1) {
            setForcaSenha({
                nivel: auxForca.score,
                msg: 'muito fraca', 
                cor: '#b32a00'
            }
        )}
        if (auxForca.score == 2) {
            setForcaSenha({
                nivel: auxForca.score,
                valor: 'fraca', 
                cor: '#c26e00'
            }
        )}
        if (auxForca.score == 3) {
            setForcaSenha({
                nivel: auxForca.score,
                valor: 'mediana',
                cor: '#dfc800'
            }
        )}
        if (auxForca.score >= 4) {
            setForcaSenha({
                nivel: auxForca.score,
                valor: 'forte',
                cor: '#028313'
            }
        )}


    }
    const handleRegSenha = () => {
        if(novaSenha.senha != novaSenha.rSenha) {
            setMsgNovaSenha('senhas diferentes!')
            return
        }
        if(forcaSenha.nivel < minForca) {
            setMsgNovaSenha('É necessaria uma senha forte!')
            return
        }
        console.log('Validação completa.')
    }
    const changePrimeiroAcesso = () => {
        setPrimeiroAcesso(!primeiroAcesso)
    }
    useEffect(() => {
        if (msgLogin) {
            console.log(msgLogin)
        }
    }, [msgLogin])
    useEffect(() => {
        if (msgNovaSenha) {
            console.log(msgNovaSenha)
        }
    }, [msgNovaSenha])
    useEffect(() => {
        if(request) {
            console.warn(request)
        }
    }, [request])
    return (
        <main id='mainLogin'>
            <section id="secLogin">
                <h2>Bem-vindo ao SIGOS</h2>
                <input id="email" type="text" placeholder='email' onChange={(e) => handleChangeUsuario(e.target.value, "email")}/>
                <input id="senha" type="text" placeholder='senha' onChange={(e) => handleChangeUsuario(e.target.value, "senha")}/>
                <button id="entrar" onClick={handleLogin}>entrar</button>
                <a id="esqueciMinhaSenha" href="">esqueci minha senha</a>
                {/* <p onClick={changePrimeiroAcesso}>primeiro acesso</p>             */}
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
                            <input type="text" onChange={(e) => handleChangeNovaSenha(e.target.value, "senha")}/>
                        </div>
                        <div id='contRepetirSenha'>
                            <label>Repetir senha:</label>
                            <input type="text" onChange={(e) => handleChangeNovaSenha(e.target.value, "rSenha")}/>
                        </div>
                        <div id='contForcaSenha' style={{ visibility: novaSenha.senha ? 'visible' : 'hidden'}}>
                            <p style={{color: forcaSenha.cor}}>senha {forcaSenha.msg}</p>
                        </div>
                    </div>
                    {/* <div id='contMsgNovaSenha'>
                        <p id='msgNovaSenha' style={{ visibility: msgNovaSenha ? 'visible' : 'hidden'}}>{msgNovaSenha}</p>
                    </div> */}
                    <div id='contAcaoPrimeiroAcesso'>
                        <button onClick={changePrimeiroAcesso}>voltar</button>
                        <button onClick={handleRegSenha}>salvar senha</button>
                    </div>
                </section>
                </div>)
            }
        </main>
    )
} 

export default Login