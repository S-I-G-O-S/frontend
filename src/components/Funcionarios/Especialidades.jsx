import '../../styles/especialidades.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import UnitEspec from './Especialidades/unitEspecialidade'
import { useState } from 'react'
// import Options from '../../assets/options.png'
// import Edit from '../../assets/edit-text.png'
// import Down from '../../assets/dark/down.png' 
// import Up from '../../assets/dark/up.png'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

// TODO a pagina agora terá uma so sessão, e a tela de edição da especialidade terá forma de popup
function Especialidades() {
    const [especEdit, setEspecEdit] = useState([])
    const [prevTema, setPrevTema] = useState({
        temaPrevEspec: 'dark'})
    let especialidades = [
        {
            "id": 1,
            "nome": "Especialidade 1",
            "contFuncs": 34,
            "cor": "#b80a0a/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 2,
            "nome": "Especialidade 2",
            "contFuncs": 34,
            "cor": "#273dfa/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 3,
            "nome": "Especialidade 3",
            "contFuncs": 34,
            "cor": "#1a9a0a/#fff",
            "servicos": ["serviço 1", "serviço com nome longo", "serviço 3"]
        }
    ]
    let servicos = []
    let servicosEspecialidades = []
    //https://www.delftstack.com/pt/howto/react/for-loop-in-react/
    return(
        <div id='pageEspecialidades'>
        <Header></Header>
        <Nav></Nav>
        <div id='shadowBG'>
        </div>
        <main>
            <section id='sec1'>
                <div id='contH2Novo'>
                    <h2>Especialidades & Serviços</h2>
                    <div id='contNovo'>
                    <button>Nova Especialidade</button>
                    <button>Novo Serviço</button>
                    </div>
                </div>
                {/* 
                    nome
                    cont funcs
                    list servs
                 */}
                <div id='contListEspecs'>
                    {
                        especialidades.map(espec => 
                            <UnitEspec key={espec.id} espec={espec}></UnitEspec>
                        )
                    }
                </div>
            </section>
            
            <section id='secConfigEspec'>
                <h2>Editando especialidade</h2>
                <div id='contInfosEspecEdit'>
                    <div id='campoNomeConfigEspec' className='campoConfigEspec'>
                        <label>Nome:</label>
                        <input type="text" />
                    </div>
                    <div id='campoCor2ConfigEspec' className='campoConfigEspec'>
                        <label>Cor de fundo:</label>
                        <input type="color" name="" id="inpCorFundo" />
                    </div>
                    <div id='campoCor1ConfigEspec' className='campoConfigEspec'>
                        <label>Cor da letra:</label>
                        <input type="color" name="" id="inpCorLetra" />
                    </div>
                    <div id='contPreVisu'>
                        <div id='headPreVisu'>
                            <p>pré visualização:</p>
                            <button>Mudar tema</button>
                        </div>
                        <div id='preVisu' className='preVisuLight'>
                            <div id='especPreVisu'>Especialidade</div>
                        </div>
                    </div>
                </div>
                <div id='contServicosEspecEdit'>
                    <div id='headServicos'>
                        <p>Serviços relacionados</p>
                        <button>Adicionar</button>
                    </div>
                    <div id='listServicosEdit'>
                        <p>Serviço 1</p>
                        <p>Serviço 2</p>
                        <p>Serviço 3</p>
                        <p>Serviço 4</p>
                        <p>Serviço 5</p>
                        <p>Serviço 6</p>
                    </div>
                </div>
                <div id='contFimAcao'>
                <button>cancelar</button>
                <button>salvar</button>
                <button>deletar</button>
                </div>
            </section>
        </main>
        </div>
    )
}
export default Especialidades