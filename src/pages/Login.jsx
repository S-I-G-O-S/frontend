import { Link, Navigate, useNavigate } from 'react-router-dom'
import '@styles/login.css'
import Negocio from '@assets/negocio.png'
import Analise from '@assets/analise.png'
import { loginFunc } from '@services/backend/authAPI'
import { useAuth } from '@context/authContext'
import { setCookie } from '@services/cookies'
import config from '@services/config.js'

import { useEffect, useRef, useState } from 'react'
import { notification } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons'
import { getUsuarioContext } from '../context/UsuarioContext'

function Login() {
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const senhaRef = useRef(null)
    const buttonRef = useRef(null)
    const {setUsuario} = getUsuarioContext()
    
    const [render, setRender] = useState({
        senhaVisible: false,
        bttSenhaVisible: false
    })
    const [login, setLogin] = useState({ email: '', senha: '' })
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

        })
    }
    const handleLogin = async () => {
        if (loading) {
            return
        }
        setLoading(true)
        if (login.email == '' || login.senha == '') {
            showNotif(
                'bottomLeft',
                `Erro ao fazer login!`,
                'Campos email e senha são obrigatórios.')
            setLoading(false)
            return
        }
        console.log("fazendo requisição api/login")
        let result = await loginFunc(login)
        console.log("requisição retornada")
        if (!result.success) {
            console.log(result.error)
            showNotif('bottomLeft', `Erro ao fazer login!`, 'Tente novamente mais tarde ou entre em contato com o suporte.')
            setLoading(false)
            return
        }
        console.log('DEBUG 1')
        setToken(result.response.data.tokenJWT)  // Definir o token no Authorization

        console.log('DEBUG 1')
        // setCookie('usuario', result.data.funcionario, 12)
        setUsuario(result.response.data.funcionario)
        
        console.log('DEBUG 1')
        if (result.response.data.funcionario.tema == null) {
            sessionStorage.setItem('preferencias', JSON.stringify({
                tema: 'salmaoLight',
                abertoNav: true 
            }))
        } else {
            sessionStorage.setItem('preferencias', JSON.stringify({
                tema: result.response.data.funcionario.tema,
                abertoNav: true 
            }))
        }
        if (result.response.data.funcionario.ultimaAtividade == null) {
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
    useEffect(() => {
        if (request) {
            console.warn(request)
        }
    }, [request])
    useEffect(() => {
        // console.clear()
    }, [])
    return (
    <main id='mainLogin'>
        <section id="secLogin">
            <h2>Bem-vindo ao SIGOS</h2>
            <div id='inputs'>
                <input 
                    ref={emailRef}
                    id="email" 
                    type="text" 
                    placeholder='email'
                    onChange={(e) => handleChangeLogin(e.target.value, "email")}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            senhaRef.current.focus()
                        }
                    }}
                />
                
                <div id='senha'>
                    <input 
                        ref={senhaRef}
                        type={render.senhaVisible ? "text" : "password"} 
                        placeholder="senha"
                        onChange={(e) => handleChangeLogin(e.target.value, "senha")}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                buttonRef.current.focus()
                            }
                        }}
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
            </div>
            <button 
                ref={buttonRef}
                id="entrar" 
                className={loading ? 'loginCarregando' : 'loginNormal'} 
                onClick={handleLogin}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleLogin()
                    }
                }}
                type='button'
            >
                <p>entrar</p>
                <LoadingOutlined id="iconLoading"/>
            </button>
            <a id="esqueciMinhaSenha" href="">esqueci minha senha</a>
        </section>
        <img id='imgBG1' src={Negocio} alt="" />
        <img id='imgBG2' src={Analise} alt="" />
    </main>
    )
}

export default Login 