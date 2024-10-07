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
    const verEspec = (idEspec) => {
        const divEspec = document.getElementById(`espec${idEspec}`)
        //const img = document.getElementById(`img${idContato}`)
        if (divEspec.classList == 'especs especFechado') {
            divEspec.classList = "especs especAberto"
        } else {
            divEspec.classList = "especs especFechado"
        }
    }
    return(
        <div id={`espec${espec.id}`} className='especs' 
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