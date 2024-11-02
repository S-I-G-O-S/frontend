import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/userConfig.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'

function UserConfig() {
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = sessionStorage.getItem('usuario')
        return storedUsuario ? JSON.parse(storedUsuario) : { cargo: 'dev' }
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
        // const storedUsuario = JSON.parse(sessionStorage.getItem('usuario'))
        // if (storedUsuario) {
        //     console.log(storedUsuario.cargo)
        //     setUsuario(storedUsuario)
        // } else {
        //     setUsuario({cargo: 'adm'})
        //     sessionStorage.setItem('usuario', JSON.stringify({cargo: 'adm'}))
        // }
    }, [])
    return (
        <div id='pagePerfilConfig' className='paginas'>
        <Header titulo={"Configuração de usuário"}></Header>
        <Nav></Nav>
        <main id="mainPerfilConfig">
            {
            !usuario ? <Loading></Loading> :
            <section id='secUserConfig'>
                <div>
                    <label>cargo</label>
                    <select name="" id="" 
                        value={usuario.cargo}
                        onChange={(e) => handleChangeUsuario(e.target.value, "cargo")}>
                        <option value="tecnico">Técnico</option>
                        <option value="base">Base</option>
                        <option value="adm">ADM</option>
                        <option value="dev">Dev</option>
                    </select>
                </div>
            </section>
            }
        </main>
        </div>
    )
}

export default UserConfig