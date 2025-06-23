import { WarningFilled } from '@ant-design/icons'
import { converterDtHr, converterSituacao } from '@services/utils'
import { useNavigate } from 'react-router-dom'

const OrdensAbertas = ({ordens}) => {
    const navigate = useNavigate()
    const handleAbrirOrdem = (idOrdem) => {
        navigate(`/ordem?id=${idOrdem}`)
    }
    if (!ordens || ordens.length==0)  {
        return null
    } else {
        return (
            <section id="secOrdensAbertas">
                <h2>Ordens abertas</h2>
                {ordens.map((ordem, index) => {
                    return (
                        <div key={`ordemAberta${index}`} className='ordemAberta cardOrdens' 
                            onClick={() => handleAbrirOrdem(ordem.id)}>
                            <div className="dataHora">{converterDtHr(ordem.dtAbertura)}</div>
                            <div className="nomeCliente">{ordem.cliente}</div>
                            <div className={`situacao situacao${ordem.situacao}`}>{converterSituacao(ordem.situacao)}</div>
                            <div className="serviço">{ordem.servico}</div>
                        </div>
                )})}
            </section >
        )
    }
}
export default OrdensAbertas;