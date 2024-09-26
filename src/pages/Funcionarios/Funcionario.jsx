import Nav from '../../components/public/Nav'
import '../../styles/funcionario.css'
import Header from '../../components/public/Header'
import Down from '../../assets/light/down.png' 
import Up from '../../assets/light/up.png'

function Funcionario() {
    const verContato = (idContato) => {
        const contato = document.getElementById(`contato${idContato}`)
        const img = document.getElementById(`img${idContato}`)
            if (contato.classList == 'contato fechado') {
            contato.classList = "contato aberto"
            img.src = Up
            console.log(`contato ${idContato} aberto`)
        } else {
            contato.classList = "contato fechado"
            img.src = Down
            console.log(`contato ${idContato} fechado`)
        }
    }
    return(
        <div id="pageFuncionario">
            <Header></Header>
            <Nav></Nav>
            <main>
                <section id='secInfos'>
                    <h2>Funcionário</h2>
                    {/* Infos do funcionarios */}
                </section>
                <section id='secEspecialidades'>
                    <h2>Especialidades</h2>
                </section>
            </main>
        </div>
    )
}

export default Funcionario