import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import Negocio from '../assets/negocio.png'
import Analise from '../assets/analise.png'
import { useEffect, useState } from 'react'
import { loginFunc } from '../services/backend/authAPI'
import zxcvbn from 'zxcvbn';
import { useAuth } from '../provider/authProvider'
import { Input, notification } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons'
import { setCookie } from '../services/cookies'
import { putRegSenha } from '../services/backend/usuarioAPI'

function Login() {
    const navigate = useNavigate()
    const minForca = 3  // nivel obrigatorio da nova senha
    
    const [render, setRender] = useState({
        senhaVisible: false,
        bttSenhaVisible: false
    })
    const [primeiroAcesso, setPrimeiroAcesso] = useState(false)
    const [login, setLogin] = useState({ email: '', senha: '' })
    const [novaSenha, setNovaSenha] = useState({ senha: '', rSenha: '' })
    const [forcaSenha, setForcaSenha] = useState({ nivel: 1, msg: 'muito fraca' })
    const [msgNovaSenha, setMsgNovaSenha] = useState(null)
    const [msgLogin, setMsgLogin] = useState(null)
    // const [funcionario, setFuncionario] = useState()
    const [request, setRequest] = useState(null)
    // const [requestUsuario, setRequestUsuario] = useState()
    const [loading, setLoading] = useState(false)
    //  AUTH
    const { setToken, token } = useAuth()
    if (token) {
        return <Navigate to="/home" />
    }
    
    const showNotif = (placement, message, description) => {
        notification.error({
            message,
            description,
            placement,

        });
    };
    const handleLogin = async () => {
        setLoading(true)
        if (login.email == '' || login.senha == '') {
            showNotif(
                'bottomLeft',
                `Erro ao fazer login!`,
                'Campos email e senha são obrigatórios.')
            setLoading(false)
            return
        }
        let result
        try {
            result = await loginFunc(login)
        } catch (error) {
            console.log(error)
            showNotif('bottomLeft', `Erro ao fazer login!`, 'Tente novamente mais tarde ou entre em contato com o suporte.')
            setLoading(false)
            return
        }
        if (result.data.funcionario.ultimaAtividade == null) {
            // setLogin({
            //     email: result.data.funcionario.login
            // })
            setPrimeiroAcesso(true)
            setLoading(false)
            return
        }
        setToken(result.data.tokenJWT)  // Definir o token no Authorization

        setCookie('usuario', result.data.funcionario, 12)   // Definir o cookie do usuario
        if (result.data.funcionario.tema == null) {
            sessionStorage.setItem('preferencias', JSON.stringify({
                tema: 'salmaoLight',
                abertoNav: true 
            }))
        } else {
            sessionStorage.setItem('preferencias', JSON.stringify({
                tema: result.data.funcionario.tema,
                abertoNav: true 
            }))
        }
        navigate("/home", { replace: true })
    }
    const handleChangeNovaSenha = (value, field) => {
        setMsgNovaSenha(null)
        setNovaSenha(prevState => ({
            ...prevState,
            [field]: value,
        }))
        changeForcaNovaSenha(value)
        //  calcSegurancaSenha(value)
    }
    const handleChangeLogin = (value, field) => {
        if (field=='senha' && value=='') {
            changeRender(false, 'bttSenhaVisible')
        } else {
            changeRender(true, 'bttSenhaVisible')
        }
        setLogin(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const changeRender = (value, field) => {
        setRender(prevState => ({
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
            )
        }
        if (auxForca.score == 2) {
            setForcaSenha({
                nivel: auxForca.score,
                valor: 'fraca',
                cor: '#c26e00'
            }
            )
        }
        if (auxForca.score == 3) {
            setForcaSenha({
                nivel: auxForca.score,
                valor: 'mediana',
                cor: '#dfc800'
            }
            )
        }
        if (auxForca.score >= 4) {
            setForcaSenha({
                nivel: auxForca.score,
                valor: 'forte',
                cor: '#028313'
            }
            )
        }


    }
    const handleRegSenha = async () => {
        if (novaSenha.senha != novaSenha.rSenha) {
            showNotif('')
            setMsgNovaSenha('senhas diferentes!')
            return
        }
        if (forcaSenha.nivel < minForca) {
            setMsgNovaSenha('É necessaria uma senha forte!')
            return
        }
        let result
        try {
            result = await putRegSenha(
                usuario.email,
                novaSenha.senha,
                novaSenha.rSenha
            )
            // TODO [FUNC] Função primeira senha
            console.warn(result)
        } catch (error) {
            console.log(error)
            showNotif(
                'bottomLeft',
                `Erro ao registrar nova senha!`,
                'Tente novamente mais tarde ou entre em contato com o suporte.')
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
        if (request) {
            console.warn(request)
        }
    }, [request])
    return (
        <main id='mainLogin'>
            <section id="secLogin">
                <h2>Bem-vindo ao SIGOS</h2>
                <div id='inputs'>
                    {/* <Input
                        id="email"
                        placeholder='email'
                        onChange={(e) => handleChangeUsuario(e.target.value, "email")}
                    /> */}
                    <input id="email" type="text" 
                        placeholder='email'
                        onChange={(e) => handleChangeLogin(e.target.value, "email")}
                    />
                    
                    <div id='senha'>
                        <input 
                            type={render.senhaVisible ? "text" : "password"} 
                            placeholder="senha"
                            onChange={(e) => handleChangeLogin(e.target.value, "senha")}
                        />
                        <button
                            onClick={() => changeRender(!render.senhaVisible, "senhaVisible")}
                            style={{ visibility: render.bttSenhaVisible ? 'visible' : 'hidden' }}
                        >
                        {
                            render.senhaVisible ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )
                            
                        }
                        </button>
                    </div>
                    {/* <Input.Password
                        id="senha"
                        placeholder="senha"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => handleChangeUsuario(e.target.value, "senha")}
                    /> */}
                </div>
                <button id="entrar" className={loading ? 'loginCarregando' : 'loginNormal'} onClick={handleLogin}>
                    <p>
                        entrar
                    </p>
                    <LoadingOutlined id="iconLoading"/>
                    {/* {
                        loading &&
                        <LoadingOutlined id="iconLoading"/>
                    } */}
                </button>
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
                        <form>
                        <div id='contSenhas'>
                            <div id='contSenha'>
                                <label>Nova senha:</label>
                                <Input.Password
                                    placeholder=""
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={(e) => handleChangeNovaSenha(e.target.value, "senha")}
                                />
                            </div>
                            <div id='contRepetirSenha'>
                                <label>Repetir senha:</label>
                                <Input.Password
                                    placeholder=""
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={(e) => handleChangeNovaSenha(e.target.value, "rSenha")}
                                />
                            </div>
                            <div id='contForcaSenha' style={{ visibility: novaSenha.senha ? 'visible' : 'hidden' }}>
                                <p style={{ color: forcaSenha.cor }}>senha {forcaSenha.msg}</p>
                            </div>
                        </div>
                        </form>
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