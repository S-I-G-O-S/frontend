import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../../provider/authProvider'
import { deleteCookie } from '../../services/cookies'
import { Dropdown } from 'antd'
import { DownOutlined, SettingOutlined } from '@ant-design/icons'

function Header({usuario, titulo}) {
    const navigate = useNavigate()
    const { setToken } = useAuth()
    const [viewContUser, setViewContUser] = useState(false)
    const handleViewConfiguser = () => {
        setViewContUser(!viewContUser)
    }
    const handleLogout = () => {
        setToken(null)
        deleteCookie('usuario')
        deleteCookie('tema')
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
                <div onClick={()=>navigate("/usuario", { replace: true })}>configurações</div>
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
                <Dropdown
                    menu={{
                        items: itensMenu,
                        style: {
                            backgroundColor: '#fcd8b9',
                            
                        }
                    }}
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
                            }}>
                                <div>{usuario.nome}</div>
                                <div>{usuario.cargo}</div>
                            </div>
                            {menu}
                        </div>
                    )}
                >
                    <div id='contIconUser' /*onClick={handleViewConfiguser} */>
                    </div>
                </Dropdown>
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