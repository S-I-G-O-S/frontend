import '../../styles/unitEspecialidade.css'
import Down from '@assets/dark/down.png'
import Up from '@assets/dark/up.png'
import Edit from '@assets/edit-text.png'
// import { Link, useNavigate } from 'react-router-dom';
// import { esbuildVersion } from 'vite'
import PropTypes from 'prop-types'

UnitEspec.propTypes = {
	espec: PropTypes.shape({
		id: PropTypes.number.isRequired,
		nome: PropTypes.string.isRequired,
		descricao: PropTypes.string.isRequired,
		cor: PropTypes.string.isRequired,
		// servicos: PropTypes.arrayOf(PropTypes.object).isRequired
	}).isRequired,
	onClick: PropTypes.func
}

function UnitEspec({ espec, onClick }) {
	let [cor1, cor2] = espec.cor.split('/');
	return (
		<div id={`espec${espec.id}`} className='especs'
			title={espec.descricao}
			style={{
				borderColor: cor2,
				backgroundColor: cor1,
				color: cor2
			}}
			onClick={onClick}
		>
			{espec.nome}
		</div>
	)
}
export default UnitEspec