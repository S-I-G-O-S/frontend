import { WarningFilled } from '@ant-design/icons'
import { converterDtHr, converterSituacao } from '@services/utils'

const OrdensFechadas = ({ordens}) => {
    if (!ordens || ordens.length==0)  {
        return (
            <div>
                <WarningFilled />
                <p>sem ordens fechadas...</p>
            </div> 
        )
    } else {
        return (
            ordens.map((ordem, index) => {
                return (
                    <div key={`ordemFechada${index}`} className='ordemFechada cardOrdens'>
                        <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className={`situacao situacao${ordem.situacao}`}>{converterSituacao(ordem.situacao)}</div>
                            <div className="serviço">{ordem.servico}</div>
                    </div>
            )})
        )
    }
}
export default OrdensFechadas;