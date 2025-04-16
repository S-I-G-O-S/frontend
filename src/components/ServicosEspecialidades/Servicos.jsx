import Loading from '@components/public/Loading.jsx'
import { useEffect, useState } from 'react'
import { getServicos } from '@services/backend/servicosAPI'
import { getServicoPorID } from '@backend/servicosAPI.js'

const Servicos = ({ abrirModal, setServicoAberto, servicos, setServicos, especialidades }) => {
	const [reqstServicos, setReqstServicos] = useState([])
	const [filtros, setFiltros] = useState({
		ordem: "ASC",
		especialidade: {
			value: null,
			is: false
		},
		nome: {
			value: "",
			is: false
		}
	})
	const fetchServicos = async () => {
		const result = await getServicos()

		if (!result.success) {
			console.error(result.error)
			return
		}
		console.warn(result.response)
		setReqstServicos(result.response.data)
		setServicos(result.response.data.content)
	}
	const abrirServico = async (idServ) => {
		abrirModal()
		const result = await getServicoPorID(idServ)

		if (!result.success) {
			console.error(result.error)
			return
		}
		setServicoAberto(result.response.data)
		console.log("Serviço do id " + idServ + " foi aberto")
	}
	useEffect(() => {
		fetchServicos()
	}, [])
	return (
		<div id="contServicos">
			<div id="headContServicos">
				<div>asc

				</div>
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