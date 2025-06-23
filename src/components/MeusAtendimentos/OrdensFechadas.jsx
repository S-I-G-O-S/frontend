import { WarningFilled } from '@ant-design/icons'
import { converterDtHr, converterSituacao } from '@services/utils'
import { useNavigate } from 'react-router-dom'

const OrdensFechadas = ({ordens}) => {
    const navigate = useNavigate()
    const handleAbrirOrdem = (idOrdem) => {
        navigate(`/ordem?id=${idOrdem}`)
    }   
    if (!ordens || ordens.length==0)  {
        return (
            <div>
                <WarningFilled />
                <p>sem ordens fechadas...</p>
            </div> 
        )
    } else {
        return (
            <section id="secOrdensFechadas">
                <h2>Ordens concluídas</h2>
                {ordens.map((ordem, index) => {
                    return (
                        <div key={`ordemFechada${index}`} className='ordemFechada cardOrdens'
                            onClick={() => handleAbrirOrdem(ordem.id)}>
                            <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className={`situacao situacao${ordem.situacao}`}>{converterSituacao(ordem.situacao)}</div>
                            <div className="serviço">{ordem.servico}</div>
                        </div>
                )})}
            </section>
        )
    }
}
export default OrdensFechadas;