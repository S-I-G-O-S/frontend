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
            {funcDisponiveis === "vazio"
            ? "Nenhum técnico disponível"
            : funcDisponiveis.map((func) => (
                <div
                    id={`funcDisp${func.id}`}
                    className="funcsDisp"
                    key={func.id}
                >
                    <div className="nomeFunc">{func.nome}</div>
                </div>
                ))}
        </div>
        </section>)
}
export default FuncsDisponiveis;
