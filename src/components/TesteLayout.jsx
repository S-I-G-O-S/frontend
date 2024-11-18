import { Button, Layout, Menu } from "antd"
import { useEffect, useState } from "react"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import Sider from "antd/es/layout/Sider"
import { Content, Header } from "antd/es/layout/layout"

function TesteLayout() {
    const [sessPreferencias, setSessPreferencias] = useState(() => {
        const storedUsuario = sessionStorage.getItem('preferencias')
        return storedUsuario ? JSON.parse(storedUsuario) : { abertoNav: true }
    })
    useEffect(() => {
        if (sessPreferencias) {
            sessionStorage.setItem('preferencias', JSON.stringify(sessPreferencias))
        }

    }, [sessPreferencias])
    return (
        <div className="paginas">
            <Layout
                style={{
                    minHeight: '100vh',
                }}>
                <Sider
                    trigger={null}
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible
                    collapsed={!sessPreferencias.abertoNav}>
                    <div className="demo-logo-vertical">
                        teste
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: '#26110D',
                        }}
                    >
                        <Button
                            type="text"
                            icon={sessPreferencias.abertoNav ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setSessPreferencias({ abertoNav: !sessPreferencias.abertoNav })}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: '#F2E8DF',
                            borderRadius: '0.3rem',
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
export default TesteLayout