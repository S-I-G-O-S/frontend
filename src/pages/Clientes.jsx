import '@styles/clientes.css'
import { getUsuarioContext } from "@context/UsuarioContext.jsx";
import Nav from '@components/public/Nav.jsx'
import { useEffect, useState } from 'react';
import { notification } from 'antd'
import TableClientes from '../components/Clientes/TableClientes.jsx';
import ModelNovoCliente from '../components/Clientes/ModelNovoCliente.jsx';
import { useAuth } from '../context/authContext.jsx';

function Clientes() {
	const [viewModalNovoCliente, setViewModalNovoCliente] = useState(false)
	const { usuario } = getUsuarioContext()
	const [filtros, setFiltros] = useState({
		nome: null,
		cnpj: null,
		ativo: null
	})
	const {checkAuth} = useAuth()
	useEffect(() => {
		checkAuth()
		console.clear()
	}, [])
	return (
		<div id='pageClientes' className='paginas'>
			{/* <Header titulo={"Clientes"} usuario={usuario}></Header> */}
			<Nav cargo={usuario?.cargo || ''}></Nav>
			<main id='mainClientes'>
				{/* Listagem */}
				<section id='secListClientes' className='section'>
					{(usuario.cargo == 'ADM' || usuario.cargo == 'DEV') && (
						<div id='containerH2Novo'>
							<button onClick={() => setViewModalNovoCliente(true)}>Novo cliente</button>
						</div>
					)}
					<TableClientes filtros={filtros}></TableClientes>
				</section>
			</main>
			{
				!viewModalNovoCliente ? '' :
					<div id='shadowBG'>
						<ModelNovoCliente
							changeModal={setViewModalNovoCliente}
							/>
					</div>
			}
		</div>
	)
}

export default Clientes