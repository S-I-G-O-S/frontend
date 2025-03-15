import "@styles/primeiroAcesso.css"
import { putRegSenha } from "@backend/usuarioAPI"
import { useEffect, useRef, useState } from "react"
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined} from '@ant-design/icons'
import { notification } from "antd"
import zxcvbn from 'zxcvbn'
import { useNavigate } from "react-router-dom"
import { getUsuarioContext } from '../context/UsuarioContext'

//  TODO Falta estilizar essa pag
function PrimeiroAcesso() {
    const navigate = useNavigate()
    const {usuario} = getUsuarioContext()
    const senhaAntigaRef = useRef(null)
    const novaSenhaRef = useRef(null)
    const repetirNovaSenhaRef = useRef(null)
    const buttonRef = useRef(null)
    //  States
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
    const [loadingSalvar, setLoadingSalvar] = useState(false)
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
        setLoadingSalvar(true)
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
        const result = await putRegSenha(novaSenha.senhaAntiga, novaSenha.senha)
        setLoadingSalvar(false)
        if (!result.success) {
            console.log(result.error)
            notification.error({
                message: `Erro ao registrar nova senha!`,
                description: 'Tente novamente ou entre em contato com o suporte.',
                placement: 'bottomLeft',
                duration: 6
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
        <div id="pagePrimeiroAcesso">
            <section id='secPrimeiroAcesso'>
                <h1>Seu primeiro acesso na Sigos</h1>
                <div id='contMsgAviso'>
                    <p>Olá {usuario.nome}</p>
                    <p>Para garantir a segurança de sua conta, precisamos que você defina sua senha de acesso.</p>
                </div>
                <div id='contSenhas'>
                    <div id='contSenhaAntiga' className="senhas">
                        <input
                            ref={senhaAntigaRef}
                            type={renderizar.senhaAntigaVisible ? "text" : "password"}
                            placeholder="senha atual"
                            onChange={(e) => handleChangeNovaSenha(e.target.value, "senhaAntiga")}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    novaSenhaRef.current.focus()
                                }
                            }}
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
                    <div id='contSenha' className="senhas">
                        <input
                            ref={novaSenhaRef}
                            type={renderizar.novaSenhaVisible ? "text" : "password"}
                            placeholder="nova senha"
                            onChange={(e) => handleChangeNovaSenha(e.target.value, "senha")}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    repetirNovaSenhaRef.current.focus()
                                }
                            }}
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
                    <div id='contRepetirSenha' className="senhas">
                        <input
                            ref={repetirNovaSenhaRef}
                            type={renderizar.novaSenhaRepVisible ? "text" : "password"}
                            placeholder="repetir nova senha"
                            onChange={(e) => handleChangeNovaSenha(e.target.value, "rSenha")}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    buttonRef.current.focus()
                                }
                            }}
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
                    <button
                        id="buttonSalvarSenha"
                        className={loadingSalvar ? 'bttCarregando' : 'bttNormal'} 
                        ref={buttonRef}
                        onClick={handleRegSenha}
                        >
                        <p>salvar senha</p>
                        <LoadingOutlined id="iconLoading"/>
                    </button>
                </div>
            </section>
        </div>
        </>
    )
}
export default PrimeiroAcesso