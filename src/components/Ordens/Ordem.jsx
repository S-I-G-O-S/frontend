import { useLocation, useNavigate } from "react-router-dom";
import Header from "../public/Header";
import Nav from "../public/Nav";
import { useState } from "react";
import { getCookie } from "../../services/cookies";

function Ordem() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    let idCliente = searchParams?.get('id') ?? null
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(() => {
        const cookieUsuario = getCookie('usuario')
        return cookieUsuario ? cookieUsuario : ''
    })
    
    return(
        <div id="pageOrdem" className="paginas">
        <Header titulo={"Editando ordem"} usuario={usuario}></Header>
        <Nav cargo={usuario?.cargo || ''}></Nav>
        <main>
        <section>
            
        </section>
        </main>
        </div>
    )
}
export default Ordem