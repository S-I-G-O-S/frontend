import { WarningFilled } from '@ant-design/icons'
import { converterDtHr, converterSituacao } from '@services/utils'

const OrdensAbertas = ({ordens}) => {
    
    if (!ordens || ordens.length==0)  {
        return (
            <div>
                <WarningFilled />
                <p>sem ordens abertas...</p>
            </div> 
        )
    } else {
        return (
            ordens.map((ordem, index) => {
                return (
                    <div key={`ordemAberta${index}`} className='ordemAberta cardOrdens'>
                        <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className={`situacao situacao${ordem.situacao}`}>{converterSituacao(ordem.situacao)}</div>
                            <div className="serviço">{ordem.servico}</div>
                    </div>
            )})
        )
    }
}
export default OrdensAbertas;