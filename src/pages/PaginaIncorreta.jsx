import '@styles/paginaIncorreta.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
function PaginaIncorreta() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/home`)
    })
    return(
        <>
        <main id="paginaErro404">
            <div>pagina não encontrada</div>
            <Link to="/home">menu principal</Link>
        </main>
        </>
    )
}
export default PaginaIncorreta