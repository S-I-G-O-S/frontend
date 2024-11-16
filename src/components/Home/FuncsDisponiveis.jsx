import { useEffect, useRef, useState } from 'react'
import Loading from '../public/Loading'
import { getFuncionariosDisponiveis } from '../../services/backend/funcionariosAPI'
import Marquee from "react-fast-marquee"

function FuncsDisponiveis() {
    const listRef = useRef(null);
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
        const listElement = listRef.current;
        if (listElement) {
            // Comprimento total dos itens
            const itemsWidth = Array.from(listElement.children).reduce(
                (acc, item) => acc + item.offsetWidth,
                0
            );
            const parentWidth = listElement.offsetWidth;

            // Verifique se a animação é necessária
            if (itemsWidth > parentWidth) {
                // Calcule a duração da animação (maior comprimento = duração maior)
                const duration = itemsWidth / 50; // Ajuste o divisor para ajustar a velocidade

                // Defina a duração da animação via variável CSS
                listElement.style.setProperty('--marquee-duration', `${duration}s`);
            } else {
                // Sem animação se os itens couberem no elemento pai
                listElement.style.setProperty('--marquee-duration', '0s');
            }
        }
    }, [])
    return !funcDisponiveis ? (<Loading /> ): 
        (<section id="secTecnicosDisponiveis">
            <h2>Tecnicos disponiveis</h2>
             {/* TODO ajustar o quanto antes a exibição ddos funcionarios disponiveis */}
            <Marquee 
                id="listTecsDisp" 
                ref={listRef}
                autoFill
                pauseOnHover
            >
                {!funcDisponiveis ? 
                    "Nenhum técnico disponível" : 
                    funcDisponiveis.map(func => (
                        <UnitFuncsDisponiveis key={func.id} func={func}></UnitFuncsDisponiveis>
                    ))
                }
            </Marquee>
        </section>)
}
function UnitFuncsDisponiveis({ func }) {
    return(
        <div id={`funcDisp${func.id}`}
            className="funcsDisp"
            key={func.id}>
            <p className="nomeFunc">{func.primeiro} {func.ultimo}</p>
        </div>
    )
}
export default FuncsDisponiveis;
