import Nav from './public/Nav'
import Header from './public/Header'
import { useEffect, useState } from 'react'
import { getFuncionarioPorID } from '../../services/funcionariosAPI'
import { useLocation } from 'react-router-dom';

function AtivarUsuario() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idFuncionario = searchParams?.get('id') ?? null
    const [senha, setSenha] = useState({
        senha: '',
        rSenha: ''
    })
    const [funcionario, setFuncionario] = useState()
    const [request, setRequest] = useState(null) 
    const fetchFuncionario = async () => {
        try {
            const response = await getFuncionarioPorID(idFuncionario)
            setFuncionario(response.data)
            setRequest(response)
            // console.warn(response)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        if (request) {
            console.warn(request)
        }
    }, [request])
    useEffect(() => {
        // TODO Criar tratativa de erro > idFuncionario == 'novo'
        fetchFuncionario()
    }, [])

    return (
        <div id="pageAtivacao">
            <Header></Header>
            <Nav></Nav>
            <main id='mainAtivacao'>
                <section>
                    <h1>Olá Nome do funcionario</h1>
                    <p>Para garantir a segurança de sua conta, precisamos que você defina sua senha de acesso.</p>
                    <div>
                        <label>Nova senha:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Repetir senha:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <button>voltar</button>
                        <button>entrar</button>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default AtivarUsuario