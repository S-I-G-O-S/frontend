import '../../../styles/unitEspecialidade.css'
import Down from '../../../assets/dark/down.png' 
import Up from '../../../assets/dark/up.png'
import Edit from '../../../assets/edit-text.png'
// import { Link, useNavigate } from 'react-router-dom';
// import { esbuildVersion } from 'vite'
import PropTypes from 'prop-types'

UnitEspec.propTypes = {
    espec: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        cor: PropTypes.string.isRequired,
        servicos: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
}

function UnitEspec({ espec }) {
    let [cor1, cor2] = espec.cor.split('/');
    return(
        <div id={`espec${espec.id}`} className='especs' title="
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti sequi exercitationem ea dolorum quos at possimus, autem facere ipsa consequatur deleniti sit minus beatae dicta eos quis aliquam maxime ipsam?"
        style={{
            borderColor: cor2,
            backgroundColor: cor1,
            color: cor2
            }}>
            {espec.nome}
        </div>
    )
}
export default UnitEspec