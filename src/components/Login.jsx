import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import Negocio from '../assets/negocio.png'
import Analise from '../assets/analise.png'
import { useEffect, useState } from 'react'
import {  loginFunc } from '../services/backend/authAPI'
import zxcvbn from 'zxcvbn';
import { useAuth } from '../provider/authProvider'
import { Input, notification } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { setCookie } from '../services/cookies'
import { putRegSenha } from '../services/backend/usuarioAPI'

function Login() {
    const navigate = useNavigate()
    const minForca = 3  // nivel obrigatorio da nova senha
    //  AUTH
    const { setToken, token } = useAuth()
    if (token) {
        return <Navigate to="/home"/>
    }
    const handleLogin = async () => {
        if(usuario.email=='' || usuario.senha=='') {
            showNotif(
                    'bottomLeft', 
                    `Erro ao fazer login!`, 
                    'Campos email e senha são obrigatórios.')
            return
        }
        let result
        try {
            result = await loginFunc(usuario)
            console.log(result.data.tokenJWT)
            
        } catch (error) {
            console.log(error)
            showNotif('bottomLeft', `Erro ao fazer login!`, 'Tente novamente mais tarde ou entre em contato com o suporte.')
            return    
        }
        if(result.data.funcionario.ultimaAtividade == null) {
            setUsuario({
                email: result.data.funcionario.login
            })
            setPrimeiroAcesso(true)
            return
        }
        // TODO Verificar se o usuario primeiro login deve trazer o token junto,
        // TODO Verificar se o usuario desativado deve trazer o token junto
        setToken(result.data.tokenJWT)
        setCookie('usuario', result.data.funcionario, 12)
        if(result.data.funcionario.tema == null) {
            setCookie('tema', 'claro', 12)
        } else {
            setCookie('tema', result.data.funcionario.tema, 12)
        }
        navigate("/home", { replace: true })
    }
    const showNotif = (placement, message, description) => {
        notification.error({
        message,
        description,
        placement,
        
        });
    };
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
    // const [funcionario, setFuncionario] = useState()
    const [request, setRequest] = useState(null)
    // const [requestUsuario, setRequestUsuario] = useState()
    const [forcaSenha, setForcaSenha] = useState({
        nivel: 1,
        msg: 'muito fraca'
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
    const handleRegSenha = async () => {
        if(novaSenha.senha != novaSenha.rSenha) {
            showNotif('')
            setMsgNovaSenha('senhas diferentes!')
            return
        }
        if(forcaSenha.nivel < minForca) {
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
        if(request) {
            console.warn(request)
        }
    }, [request])
    return (
        <main id='mainLogin'>
            <section id="secLogin">
                <h2>Bem-vindo ao SIGOS</h2>
                <div id='inputs'>
                    <Input
                        id="email"
                        placeholder='email'
                        onChange={(e) => handleChangeUsuario(e.target.value, "email")}
                    />
                    <Input.Password
                        id="senha"
                        placeholder="senha"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => handleChangeUsuario(e.target.value, "senha")}
                    />
                </div>
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