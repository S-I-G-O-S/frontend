import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import Negocio from '../assets/negocio.png'
import Analise from '../assets/analise.png'
import { useEffect, useState } from 'react'
import { loginFunc } from '../services/backend/authAPI'
import { useAuth } from '../provider/authProvider'
import { notification } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons'
import { setCookie } from '../services/cookies'
import { putRegSenha } from '../services/backend/usuarioAPI'

import config from '@services/config.js'

function Login() {
    const navigate = useNavigate()
    
    
    const [render, setRender] = useState({
        senhaVisible: false,
        bttSenhaVisible: false
    })
    const [login, setLogin] = useState({ email: '', senha: '' })

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
        setToken(result.data.tokenJWT)  // Definir o token no Authorization
        setCookie('usuario', result.data.funcionario, 12)
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
        if (result.data.funcionario.ultimaAtividade == null) {
            // setPrimeiroAcesso(true)
            setLoading(false)
            if (config.configNovoUsuario) {
                navigate("/novo-usuario")
            } else {
                navigate("/home", { replace: true })
            }
            return
        }
        navigate("/home", { replace: true })
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
    
    useEffect(() => {
        if (msgLogin) {
            console.log(msgLogin)
        }
    }, [msgLogin])
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
            </section>
            <img id='imgBG1' src={Negocio} alt="" />
            <img id='imgBG2' src={Analise} alt="" />
        </main>
    )
}

export default Login 