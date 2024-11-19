import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/userConfig.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'
import { getCookie } from '../services/cookies'
import { getDeployStatus } from '../services/renderAPI'

//  TODO Verificar se o token do usuario ainda é valido
function UserConfig() {
    const data = new Date()
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
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
    }, [])
    return (
        <div id='pagePerfilConfig' className='paginas'>
        <Header titulo={"Configurações"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainPerfilConfig">
            {
            !usuario ? <Loading></Loading> :
            <>
                {
                usuario.cargo == 'DEV' ?
                <section id='secDevConfigs'>
                    <h2>Configurações de desenvolvimento</h2>
                    <label>cargo</label>
                    <select name="" id="" 
                        value={usuario.cargo}
                        onChange={(e) => handleChangeUsuario(e.target.value, "cargo")}>
                        <option value="TECNICO">TECNICO</option>
                        <option value="BASE">BASE</option>
                        <option value="ADM">ADM</option>
                        <option value="DEV">DEV</option>
                    </select>
                </section> : ''
                }
                <section id='secInfosFuncionario'>
                    <h2>Minhas informações</h2>
                    <div id='contInfosFunc'>
                        <div>Nome: {usuario.nome}</div>
                        <div>Cargo: {usuario.cargo}</div>
                        <div>Tel./Cel.: {usuario.celular}</div>
                        <div>Email: {usuario.email}</div>
                        <div>
                            Endereço: {usuario.endereco.logradouro}, Nº{usuario.endereco.numero} - {usuario.endereco.cidade}-{usuario.endereco.uf} 
                        </div>
                    </div>
                </section>
                <section id='secUserConfig'>
                    <h2>Preferências</h2>
                    <div>
                        <div>
                            <label>Tema: </label>
                            <select name="" id="">
                                value={usuario.tema}
                                <option value="">claro</option>
                                <option value="">noturno</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>Versão 0.1.0</div>
                        <div>©{data.getFullYear()} SIGOS inc.</div>
                        <a href="">Sobre o SIGOS</a>

                    </div>
                </section>
            </>
            }
        </main>
        </div>
    )
}

export default UserConfig