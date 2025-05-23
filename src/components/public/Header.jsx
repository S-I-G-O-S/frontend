import { Link, useNavigate } from 'react-router-dom'
import '@styles/public/header.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@context/authContext'
import { deleteCookie } from '@services/cookies'
import { Dropdown } from 'antd'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { logoutFunc } from '@backend/authAPI'

function Header({usuario, titulo}) {
    const navigate = useNavigate()
    const { setToken } = useAuth()
    const [viewContUser, setViewContUser] = useState(false)
    const handleViewConfiguser = () => {
        setViewContUser(!viewContUser)
    }
    const handleLogout = async () => {
        try {
            const result = await logoutFunc()
            console.warn(result)
        } catch (error) {
            console.error(error)
        }
        sessionStorage.clear()
        setToken(null)
        deleteCookie('usuario')
        navigate("/", { replace: true })
    }
    const itensMenu = [
        /*{
            key: 1,
            label: (`
                ${usuario.nome}
                ${usuario.cargo}
            `),
            disabled: true,

        },*/
        {
            key: 1,
            label: (
                <div onClick={()=>navigate("/configuracoes", { replace: true })}>configurações</div>
            ),
            icon: <SettingOutlined/>
        }
    ]
    return (
        <header id='header'>
            <div id='headerLeft'>
                <h1 className='tituloPag'>{titulo}</h1>
            </div>
            <div id='headerRight'>
                {/* <Dropdown
                    menu={{
                        items: itensMenu,
                        style: {
                            backgroundColor: '#fcd8b9',
                            
                        }
                    }}
                    arrow={false}
                    placement="bottom"
                    trigger={'click'}
                    overlayClassName="customDropdown"
                    overlayStyle={{ 
                        backgroundColor: "#f7cba4", 
                        border: "0.1rem solid black",
                        borderRadius: '0.3rem'
                    }}
                    dropdownRender={(menu) => (
                        <div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                            }}>
                                <div>{usuario.nome}</div>
                                <div>{usuario.cargo}</div>
                            </div>
                            {menu}
                        </div>
                    )}
                >
                    <UserOutlined id="iconUser"/>
                </Dropdown> */}
                {/*
                    viewContUser &&
                    (<div id='contConfigUser'>
                        <p id='nomeUsuario'>{usuario.nome}</p>  
                        <p id='cargoUsuario'>{usuario.cargo}</p>
                        <Link id='toUserConfig' to={'/usuario'}>Configurações</Link>
                    </div>)
                */}
                <button id="sair" onClick={handleLogout}>
                    sair
                </button>
            </div>
        </header>
    )
}
export default Header