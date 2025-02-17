import '@styles/home/atalhos.css'
import { Link } from 'react-router-dom'
import { FieldTimeOutlined, FileAddOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons'
function Atalhos({cargo}) {
    return(
        <section id="secAtalhos">
            <div id='contAtalhos'>
                <Link className='atalhos' to={"/ordens"}>
                    <div>ordens pendentes</div>
                    <FieldTimeOutlined className='iconAtalhos'/>
                </Link>
                {
                    cargo==='BASE' || cargo==='ADM' || cargo==='DEV' &&
                    <>
                    <Link className='atalhos' to={"/ordens"}>
                        <div>ordens em execução</div>
                        <ToolOutlined className='iconAtalhos'/>
                    </Link>
                    <Link className='atalhos' to={"/funcionarios"}>
                        <div>Técnicos disponíveis</div>
                        <TeamOutlined className='iconAtalhos'/>
                    </Link>
                    <Link className='atalhos' to={"/nova-ordem"}>
                        <div>gerar ordem</div>
                        <FileAddOutlined className='iconAtalhos'/>
                    </Link>
                    </>
                }
                {
                    cargo==='TECNICO' &&
                    <>
                    <Link className='atalhos' to={"/atendimentos"}>
                        <div>meus atendimentos</div>
                    </Link>
                    </>
                }
            </div>
        </section>
    )
}
export default Atalhos