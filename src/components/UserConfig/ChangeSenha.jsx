import { notification } from 'antd'
import { useEffect } from 'react'
import zxcvbn from 'zxcvbn'

export default function ChangeSenha({changeModal}) {
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
        try {
            const result = await putRegSenha(novaSenha.login, novaSenha.senhaAntiga, novaSenha.senha)
            console.warn(result)
        } catch (error) {
            console.log(error)
            notification.error({
                message: `Erro ao registrar nova senha!`,
                description: 'Tente novamente mais tarde ou entre em contato com o suporte.',
                placement: 'bottomLeft',

            })
            return
        }
        console.log('Validação completa.')
        closeModal(false)
    }
    useEffect(() => {
        handleChangeNovaSenha(usuario.login, 'login')
    }, [])
    return (
        <section id="secNovaSenha">
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
                <button>cancelar</button>
                <button onClick={handleRegSenha}>salvar senha</button>
            </div>
        </section>
    )
}