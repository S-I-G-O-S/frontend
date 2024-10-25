import { useEffect, useState } from 'react'
import Loading from '../public/Loading'
import { getFuncionariosDisponiveis } from '../../services/funcionariosAPI'
function FuncsDisponiveis() {
    const [funcDisponiveis, setFuncDisponiveis] = useState(null)
    const fetchFuncs = async () => {
        try {
            const result = await getFuncionariosDisponiveis()
            setFuncDisponiveis(result.data.content)
            console.warn(result)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchFuncs()
    }, [])
    return !funcDisponiveis ? (<Loading /> ): 
        (<section id="secTecnicosDisponiveis">
            <h2>Tecnicos disponiveis</h2>
            <div id="listTecsDisp">
                {!funcDisponiveis ? 
                    "Nenhum técnico disponível" : 
                    funcDisponiveis.map(func => (
                        <div id={`funcDisp${func.id}`}
                            className="funcsDisp"
                            key={func.id}>
                            <p className="nomeFunc">{func.primeiro} {func.ultimo}</p>
                        </div>
                    ))
                }
            </div>
        </section>)
}
export default FuncsDisponiveis;
