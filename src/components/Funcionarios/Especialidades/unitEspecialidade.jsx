import '../../../styles/especialidades.css'
import Nav from '../../public/Nav'
import Header from '../../public/Header'
import Down from '../../../assets/dark/down.png' 
import Up from '../../../assets/dark/up.png'
import { Link, useNavigate } from 'react-router-dom';

function UnitEspec({ props }) {
    let [cor1, cor2] = props.cor.split('/');
    return(
        <div id='espec${props.id}' className='especs especAberto'>
            <div id='headEspec1' className='headEspec'>
                <p className='nomeEspec'
                style={{
                    borderColor: "#fff",
                    backgroundColor: "#b80a0a",
                    color: "#fff"
                    }}>Especialidade 1</p>
                <p>34 funcionarios</p>
            </div>
            <div id='servsEspec1' className='servsEspec'>
                for (let servico in props.servicos) {
                    <p>{ servico }</p>
                }
            </div>
        </div>
    )
}
export default UnitEspec