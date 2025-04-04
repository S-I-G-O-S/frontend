import { useEffect, useState } from "react"
import { getEspecialidades } from '@services/backend/especialidadesAPI'
import UnitEspec from './unitEspecialidade'
import Loading from '@components/public/Loading'

const Especialidades = ({ especialidades, setEspecialidades, abrirModal, setEspecialidadeAberta }) => {
	const [reqstEspecialidades, setReqstEspecialidades] = useState([])
	const abrirEspec = (idEspec) => {
		let especSelecionada = especialidades.find(espec => espec.id === idEspec)
		console.warn(especSelecionada)
		if (!especSelecionada) {
			console.error('Erro ao abrir especialidade.')
			return;
		}
		setEspecialidadeAberta(especSelecionada)
		console.log("especialidade do id " + idEspec + " foi aberta")
		abrirModal(true)
	}
	const fetchEspecialidades = async () => {
		const result = await getEspecialidades()
		if (!result.success) {
			console.error(result.error)
			return
		}
		console.warn(result.response)
		setReqstEspecialidades(result.response)
		setEspecialidades(result.response.data.content)
	}
	useEffect(() => {
		fetchEspecialidades()
	}, [])
	return (
		<div id="contEspecialidades">
			<div id="headContEspecialidades">
				<div>asc</div>
			</div>
			<div id="listEspecialidades">
				{!especialidades ? (<Loading></Loading>) : (
					especialidades.map(espec =>
						<UnitEspec key={espec.id} espec={espec} onClick={() => abrirEspec(espec.id)}></UnitEspec>
					)
				)}
			</div>
		</div>
	)
}
export default Especialidades