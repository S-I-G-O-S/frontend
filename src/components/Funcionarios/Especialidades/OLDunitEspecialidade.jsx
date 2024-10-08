import '../../../styles/especialidades.css'
import Down from '../../../assets/dark/down.png' 
import Up from '../../../assets/dark/up.png'
import Edit from '../../../assets/edit-text.png'
// import { Link, useNavigate } from 'react-router-dom';
// import { esbuildVersion } from 'vite'
import PropTypes from 'prop-types'

oldUnitEspec.propTypes = {
    espec: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        cor: PropTypes.string.isRequired,
        servicos: PropTypes.arrayOf(PropTypes.string).isRequired    
    }).isRequired
}

function oldUnitEspec({ espec }) {
    let [cor1, cor2] = espec.cor.split('/');
    const verEspec = (idEspec) => {
        const divEspec = document.getElementById(`espec${idEspec}`)
        //const img = document.getElementById(`img${idContato}`)
        if (divEspec.classList == 'especs especFechado') {
            divEspec.classList = "especs especAberto"
            //img.src = Up
            console.log("aberto")
        } else {
            divEspec.classList = "especs especFechado"
            //img.src = Down
            console.log("fechado")
        }
    }
    return(
        <div id={`espec${espec.id}`} className='especs especFechado'>
            <div id={`headEspec${espec.id}`} className='headEspec' >
                <p className='nomeEspec'
                style={{
                    borderColor: cor2,
                    backgroundColor: cor1,
                    color: cor2
                    }}>
                    {espec.nome}
                </p>
                {/* <button className='bttEditEspec' title='editar'>
                    <img src={Edit} alt="editar" />
                </button> */}
                {/* <button title='expandir' onClick={() => {
                verEspec(espec.id)}}>
                    <img src={Down} alt="expandir" />
                </button> */}
            </div>
            <div id={`servsEspec${espec.id}`} className='servsEspec'>
                {
                    espec.servicos.map(servico => 
                        <p key={servico}>{servico}</p>
                    )
                }
            </div>
        </div>
    )
}
export default oldUnitEspec