import Nav from './public/Nav'
import Header from './public/Header'
import '../styles/userConfig.css'
import { useEffect, useState } from 'react'
import Loading from './public/Loading'

function UserConfig() {
    const [usuario, setUsuario] = useState({
    })
    // const saveSessionConfig = (usuario) => {
    //     sessionStorage.setItem('usuario', JSON.stringify(usuario))
    // }
    const handleChangeUsuario = (value, field) => {
        setUsuario(prevState => ({
            ...prevState,
            [field]: value,
        }))
        salvarUsuario()
    }
    const salvarUsuario = () => {
        sessionStorage.setItem('usuario', JSON.stringify())
    }
    useEffect(() => {
        const storedUsuario = JSON.parse(sessionStorage.getItem('usuario'))
        console.log(storedUsuario.cargo)
        if (storedUsuario) {
            setUsuario(storedUsuario)
        }
    }, [])
    return (
        <div id='pagePerfilConfig'>
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
                    </select>
                </div>
            </section>
            }
        </main>
        </div>
    )
}

export default UserConfig