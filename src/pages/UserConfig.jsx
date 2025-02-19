import Nav from '@components/public/Nav'
import Header from '@components/public/Header'
import '@styles/userConfig.css'
import { useEffect, useState } from 'react'
import Loading from '@components/public/Loading'
import { getCookie, setCookie } from '@services/cookies'
import { getDeployStatus } from '@services/renderAPI'
import { usePreferencias } from '@context/PreferenciasContext'
import ChangeInfos from '../components/UserConfig/ChangeInfos'
import ChangeSenha from '../components/UserConfig/ChangeSenha'
import ChangeEmail from '../components/UserConfig/ChangeEmail'

function UserConfig() {
    const data = new Date()
    const [modalNovaSenha, setModalNovaSenha] = useState(false)
    const [modalNovoEmail, setModalNovoEmail] = useState(false)
    const [modalChangeInfos, setModalChangeInfos] = useState(false)

    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    const { sessPreferencias, setSessPreferencias } = usePreferencias()
    /*
    useEffect(() => {
        if (sessPreferencias) {
            console.log('Mudando tema para: '+ sessPreferencias.tema)
            sessionStorage.setItem('preferencias', JSON.stringify(sessPreferencias))
        }
    }, [sessPreferencias.tema])
    */
    const changeTheme = (tema) => {
        setSessPreferencias(prevState => ({
            ...prevState,
            tema: tema
        }))
    }
    const handleChangeUsuario = (value, field) => {
        setUsuario(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    useEffect(() => {
        if (usuario) {
            sessionStorage.setItem('usuario', JSON.stringify(usuario))
        }
    }, [usuario])
    const fetchRender = async () => {
        try {
            const result = await getDeployStatus()
            console.warn(result)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        console.clear()
        console.log(usuario)
        console.log(sessPreferencias)
        // changeTheme(sessPreferencias.tema)
        console.warn(usuario)
    }, [])
    return (
        <div id='pageUserConfig' className='paginas'>
        {/* <Header titulo={"Configurações"} usuario={usuario}></Header> */}
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainUserConfig">
        {
            !usuario ? <Loading></Loading> :
            <>
            {/* 
            <section id='secInfosFuncionario'>
                <h2>Minhas informações</h2>
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
            </section>
            */}
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
                    {/* TODO Abrir janela para editar */}
                    <button onClick={() => setModalChangeInfos(true)}>Alterar informações</button>
                </div>
                <div id='contPreferencias'>
                    <h3>Preferências</h3>
                    <label>Tema: </label>
                    <select name="" id="" 
                        onChange={(e) => changeTheme(e.target.value)} 
                        value={sessPreferencias.tema}>
                        {/* <option value="" disabled hidden selected>--</option> */}
                        <option value="salmaoLight">salmão claro</option>
                        <option value="salmaoDark">salmão noturno</option>
                    </select>
                </div>
                <div id='contSeguranca'>
                    <h3>Segurança</h3>
                    <button>mudar minha senha</button>
                    <button>mudar meu email</button>
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
                <ChangeInfos changeModal={setModalChangeInfos}></ChangeInfos>
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