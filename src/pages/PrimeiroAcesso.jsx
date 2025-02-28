import '@styles/primeiroAcesso.css'
// import { getCookie } from "@services/cookies"
import { putRegSenha } from "@backend/usuarioAPI"

import { useEffect, useState } from "react"
import { EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons'
import { notification } from "antd"
import zxcvbn from 'zxcvbn'
import { useNavigate } from "react-router-dom"
import { getUsuarioContext } from '../context/UsuarioContext'

//  TODO Falta estilizar essa pag
function PrimeiroAcesso() {
    const navigate = useNavigate()
    //  States
    /*const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })*/
    const {usuario} = getUsuarioContext()
    const [renderizar, setRenderizar] = useState({
        senhaAntigaVisible: false,
        novaSenhaVisible: false,
        novaSenhaRepVisible: false
    })
    const [novaSenha, setNovaSenha] = useState({
        login: '',
        senhaAntiga: '',
        senha: '', 
        rSenha: '' 
    })
    const [forcaSenha, setForcaSenha] = useState({ nivel: 1, msg: 'muito fraca' })
    
    //  Functions
    const handleChangeNovaSenha = (value, field) => {
        setNovaSenha(prevState => ({
            ...prevState,
            [field]: value,
        }))
        if (field!='senhaAntiga') {
            changeForcaNovaSenha(value)
        }
    }
    const changeRender = (value, field) => {
        setRenderizar(prevState => ({
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
        const minForca = 1  // nivel obrigatorio da nova senha
        if (novaSenha.senha != novaSenha.rSenha) {
            notification.error({
                message: `Erro ao registrar nova senha!`,
                description: 'Senhas diferentes.',
                placement: 'bottomLeft',
            })
            // setMsgNovaSenha('senhas diferentes!')
            return
        }
        if (forcaSenha.nivel < minForca) {
            // setMsgNovaSenha('É necessaria uma senha forte!')
            notification.error({
                message: `Erro ao registrar nova senha!`,
                description: 'Senha muito fraca',
                placement: 'bottomLeft',
            })
            return
        }
        console.warn(novaSenha)
        const result = await putRegSenha(novaSenha.senhaAntiga, novaSenha.senha)
        if (!result.success) {
            console.log(result.error)
            notification.error({
                message: `Erro ao registrar nova senha!`,
                description: 'Tente novamente ou entre em contato com o suporte.',
                placement: 'bottomLeft',
            })
            return
        }
        console.log('Validação completa.')
        navigate("/home", { replace: true })
    }
    useEffect(() => {
        console.clear()
        console.warn(usuario)
        if (usuario) {
            handleChangeNovaSenha(usuario.login, 'login')
        }
    }, [])
    return (
        <>
        <main id="mainPrimeiroAcesso'">
            <section id='secPrimeiroAcesso'>
                <div id='contMsgAviso'>
                    <h1>Olá {usuario.nome}</h1>
                    <p>Para garantir a segurança de sua conta, precisamos que você defina sua senha de acesso.</p>
                </div>
                <div id='contSenhas'>
                    <div id='contSenhaAntiga'>
                        <input
                            type={renderizar.senhaAntigaVisible ? "text" : "password"}
                            placeholder="senha antiga"
                            onChange={(e) => handleChangeNovaSenha(e.target.value, "senhaAntiga")}
                        />
                        <button
                            onClick={() => changeRender(!renderizar.senhaAntigaVisible, "senhaAntigaVisible")}
                        >
                            {
                                renderizar.senhaAntigaVisible ? (
                                    <EyeOutlined />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        </button>
                    </div>
                    <div id='contSenha'>
                        <input
                            type={renderizar.novaSenhaVisible ? "text" : "password"}
                            placeholder="nova senha"
                            onChange={(e) => handleChangeNovaSenha(e.target.value, "senha")}
                        />
                        <button
                            onClick={() => changeRender(!renderizar.novaSenhaVisible, "novaSenhaVisible")}
                        >
                            {
                                renderizar.novaSenhaVisible ? (
                                    <EyeOutlined />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        </button>
                    </div>
                    <div id='contRepetirSenha'>
                        <input
                            type={renderizar.novaSenhaRepVisible ? "text" : "password"}
                            placeholder="repetir nova senha"
                            onChange={(e) => handleChangeNovaSenha(e.target.value, "rSenha")}
                        />
                        <button
                            onClick={() => changeRender(!renderizar.novaSenhaRepVisible, "novaSenhaRepVisible")}
                        >
                            {
                                renderizar.novaSenhaRepVisible ? (
                                    <EyeOutlined />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        </button>
                    </div>
                    <div id='contForcaSenha' style={{ visibility: novaSenha.senha ? 'visible' : 'hidden' }}>
                        <p style={{ color: forcaSenha.cor }}>senha {forcaSenha.msg}</p>
                    </div>
                </div>
                {/* <div id='contMsgNovaSenha'>
                    <p id='msgNovaSenha' style={{ visibility: msgNovaSenha ? 'visible' : 'hidden'}}>{msgNovaSenha}</p>
                </div> */}
                <div id='contAcaoPrimeiroAcesso'>
                    <button onClick={handleRegSenha}>salvar senha</button>
                </div>
            </section>
        </main>
        </>
    )
}
export default PrimeiroAcesso