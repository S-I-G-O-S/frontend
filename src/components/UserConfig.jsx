import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/userConfig.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'
import { getCookie } from '../services/cookies'

function UserConfig() {
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
    useEffect(() => {
        console.log(usuario)
    }, [])
    return (
        <div id='pagePerfilConfig' className='paginas'>
        <Header titulo={"Página inicial"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main id="mainPerfilConfig">
            {
            !usuario ? <Loading></Loading> :
            <>
                {
                usuario.cargo == 'DEV' ?
                <section>
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
                <section id='secUserConfig'>
                    <h2>Minhas informações</h2>
                    <div>
                        <div>Nome: {usuario.nome}</div>
                        <div>Cargo: {usuario.cargo}</div>
                        <div>Tel./Cel.: {usuario.celular}</div>
                        <div>Email: {usuario.email}</div>
                        <div>
                            Endereço: {usuario.endereco.logradouro}, Nº{usuario.endereco.numero}, {usuario.endereco.complemento} - {usuario.endereco.cidade}-{usuario.endereco.uf} 
                        </div>
                    </div>
                </section>
                <section>
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
                </section>
            </>
            }
        </main>
        </div>
    )
}

export default UserConfig