import Nav from '@components/public/Nav.jsx'
import '@styles/userConfig.css'
import { useEffect, useState } from 'react'
import Loading from '@components/public/Loading.jsx'
import { usePreferencias } from '@context/PreferenciasContext.jsx'
import ChangeInfos from '../components/UserConfig/ChangeInfos.jsx'
import ChangeSenha from '../components/UserConfig/ChangeSenha.jsx'
import ChangeEmail from '../components/UserConfig/ChangeEmail.jsx'
import { getUsuarioContext } from '../context/UsuarioContext.jsx'
import { useAuth } from '../context/authContext.jsx'

function UserConfig() {
    const data = new Date()
    const [modalNovaSenha, setModalNovaSenha] = useState(false)
    const [modalNovoEmail, setModalNovoEmail] = useState(false)
    const [modalChangeInfos, setModalChangeInfos] = useState(false)
    const {checkAuth} = useAuth()
    const {usuario} = getUsuarioContext()
    const { preferencias, changeTema } = usePreferencias()
    useEffect(() => {
        console.clear()
        checkAuth()
        // console.log(sessPreferencias)
        // changeTheme(sessPreferencias.tema)
    }, [])
    return (
        <div id='pageUserConfig' className='paginas'>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainUserConfig">
        {
            !usuario ? <Loading></Loading> :
            <>
            <section id='secUserConfig'>
                <h2>Configurações</h2>
                {/* 
                    - infos do usuario
                        mostrar os dados atuais
                        alterar dados simples
                            celular
                            especialidades
                            endereço
                    - preferencias de acessibilidade
                        - tema
                        - zoom
                    - segurança 
                        mudar senha
                        mudar email
                    - informações do programa
                        versão
                        direitos reservados
                        mais sobre o projeto
                */}
                <div id='contMinhasInfos'>
                <h3>Minha informações</h3>
                {
                    !usuario ? 
                    <Loading></Loading> :
                    <div id='contInfosFunc'>
                        <div>Nome: {usuario.nome || ''}</div>
                        <div>Cargo: {usuario.cargo || ''}</div>
                        <div>Tel./Cel.: {usuario.celular || ''}</div>
                        <div>Email: {usuario.email || ''}</div>
                        <div>
                            Endereço: {usuario.endereco.logradouro || ''}, Nº{usuario.endereco.numero || ''} - {usuario.endereco.cidade || ''}-{usuario.endereco.uf || ''} 
                        </div>
                    </div>
                }
                    <button onClick={() => setModalChangeInfos(true)} className='bttConfigs'>mudar minhas informações</button>
                </div>
                <div id='contPreferencias'>
                    <h3>Preferências</h3>
                    <label>Tema: </label>
                    <select name="" id="" 
                        onChange={(e) => changeTema(e.target.value)} 
                        value={preferencias.tema}>
                        {/* <option value="" disabled hidden selected>--</option> */}
                        <option value="salmaoLight">salmão claro</option>
                        <option value="salmaoDark">salmão noturno</option>
                    </select>
                </div>
                <div id='contSeguranca'>
                    <h3>Segurança</h3>
                    <button className='bttConfigs' onClick={() => setModalNovaSenha(true)}>mudar minha senha</button>
                    {/* <button>mudar meu email</button> */}
                </div>
                <div id='contSigos'>
                    <div>Versão 0.1.0</div>
                    <div>©{data.getFullYear()} SIGOS inc.</div>
                    <a href="">Sobre o SIGOS</a>
                </div>
            </section>
            </>
        }
        </main>
        {
            modalChangeInfos &&
            <div className='shadowBG'>
                <ChangeInfos
                    view={modalChangeInfos}
                    changeModal={setModalChangeInfos}/>
            </div>
        }
        {
            modalNovaSenha &&
            <div className='shadowBG'>
                <ChangeSenha changeModal={setModalNovaSenha}></ChangeSenha>
            </div>
        }
        {
            modalNovoEmail &&
            <div className='shadowBG'>
                <ChangeEmail changeModal={setModalNovoEmail}></ChangeEmail>
            </div>
        }
        </div>
    )
}

export default UserConfig