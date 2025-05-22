import { useEffect, useState } from "react"
import { getUsuarioContext } from "../context/UsuarioContext"
import Nav from '@components/public/Nav.jsx'
export default function Teste() {
    const [funcionario, setFuncionario] = useState({
        nome: "joão da Silva",
        primeiro: "",
        ultimo: ""
    })
    const handleChangeDados = (field, value) => {
        setFuncionario(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const formatNome = () => {
        const nomeSanitizado = funcionario.nome.trim().replace(/[^\p{L}\s]/gu, '')        
        console.log("nomeSanitizado: " + nomeSanitizado)
        if (!nomeSanitizado) {
            return false;
        }
        if (nomeSanitizado.length > 30) {
            console.error("O nome deve ter no máximo 30 caracteres.");
            return false;
        }

        const partesNome = nomeSanitizado.split(/\s+/).map(
            parte => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase()
        );
        console.log("partesNome: " + partesNome)

        const primeiro = partesNome[0] || '';
        console.log("primeiro: " + primeiro)
        
        const ultimo = partesNome.length > 1 ? partesNome[partesNome.length - 1] : '';
        console.log("ultimo: " + ultimo)

        handleChangeDados(primeiro, "primeiro")
        handleChangeDados(ultimo, "ultimo")
        setFuncionario({
            ...funcionario,
            primeiro: primeiro ? primeiro : '',
            ultimo: ultimo ? ultimo : ''
        })
        return true;
    }
    useEffect(() => {
        console.clear()
        if (funcionario) {
            console.log(formatNome())
        }
    }, [])
    return (
        <div id="pageTeste">
            {/* <header titulo={"Editando ordem"} usuario={usuario}></header> */}
            <Nav cargo={'DEV'}></Nav>
            <main>
            
            </main>
        </div>
    )
}