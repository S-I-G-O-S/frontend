import { Link } from "react-router-dom"

function PaginaIncorreta() {
    return(
        <>
        <main>
            <div>pagina não encontrada</div>
            <Link to="/">sair</Link>
        </main>
        </>
    )
}
export default PaginaIncorreta