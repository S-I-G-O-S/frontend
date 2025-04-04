import Loading from '@components/public/Loading.jsx'
import { useEffect, useState } from 'react'
import { getServicos } from '@services/backend/servicosAPI'
import { getServicoPorID } from '@backend/servicosAPI.js'

const Servicos = ({ abrirModal, setServicoAberto, servicos, setServicos }) => {
	const [reqstServicos, setReqstServicos] = useState([])
	const fetchServicos = async () => {
		const result = await getServicos()

		if (!result.success) {
			console.error(result.error)
			return
		}
		setReqstServicos(result.response.data)
		setServicos(result.response.data.content)
	}
	const abrirServico = async (idServ) => {
		const result = await getServicoPorID(idServ)

		if (!result.success) {
			console.error(result.error)
			return
		}
		setServicoAberto(result.response.data)
		abrirModal()
		console.log("Serviço do id " + idServ + " foi aberto")
	}
	useEffect(() => {
		fetchServicos()
	}, [])
	return (
		<div id="contServicos">
			<div id="headContServicos">
				<div>asc</div>
			</div>
			<div id="listServicos">
				{!servicos ? (<Loading></Loading>) : (
					servicos.map(serv =>
						<div className='servicos' key={serv.id}
							onClick={() => { abrirServico(serv.id) }}>
							<h4>
								{serv.nome}
							</h4>
							<p>
								{serv.descricao}
							</p>
						</div>
					)
				)}
			</div>
		</div>
	)
}
export default Servicos;