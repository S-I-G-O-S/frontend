import '../../styles/especialidades.css'
import Nav from '../public/Nav'
import Header from '../public/Header'
import UnitEspec from './Especialidades/unitEspecialidade'
import Options from '../../assets/options.png'
import Edit from '../../assets/edit-text.png'
import Down from '../../assets/dark/down.png' 
import Up from '../../assets/dark/up.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// TODO a pagina agora terá uma so sessão, e a tela de edição da especialidade terá forma de popup
function Especialidades() {
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
            "cor": "#b80a0a/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        },
        {
            "id": 3,
            "nome": "Especialidade 3",
            "contFuncs": 34,
            "cor": "#b80a0a/#fff",
            "servicos": ["serviço 1", "serviço 2", "serviço 3"]
        }
    ]
    const verExpandEspec = (idEspec) => {
        const espec = document.getElementById(`espec${idEspec}`)
        //const img = document.getElementById(`img${idContato}`)
        if (espec.classList == 'especs especFechado') {
            espec.classList = "especs especAberto"
            //img.src = Up
            console.log("aberto")
        } else {
            espec.classList = "especs especFechado"
            //img.src = Down
            console.log("fechado")
        }
    }
    //https://www.delftstack.com/pt/howto/react/for-loop-in-react/
    return(
        <div id='pageEspecialidades'>
        <Header></Header>
        <Nav></Nav>
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
                {/* <div id='titulo'>
                    <div id='tExibir'>
                        <p>Exibir por: </p>
                        <div>
                            <label>especialidade</label>
                            <input type="checkbox" name="ord" id=""/>
                        </div>
                        <div>
                            <label>serviço</label>
                            <input type="checkbox" name="ord" id="" />
                        </div>
                    </div>
                    <div id='tOrdenar'>
                        <p>Ordernar por:</p>
                        <div>
                            <label>nome</label>
                            <input type="checkbox" name="ord" id=""/>
                        </div>
                        <div>
                            <label>num. funcionários</label>
                            <input type="checkbox" name="ord" id="" />
                        </div>
                    </div>
                </div> */}
                <div id='contListEspecs'>
                    {
                        especialidades.map(espec => 
                            <p key={espec.name}>{`${espec.name}, ${espec.age} years old`}</p>
                            <div id={`espec1${espec.id}`} className='especs especAberto'>
                                <div id={`headEspec1${espec.id}`} className='headEspec' onClick={() => {verExpandEspec(${espec.id})} }>
                                    <p className='nomeEspec'
                                    style={{
                                        borderColor: "#fff",
                                        backgroundColor: "#b80a0a",
                                        color: "#fff"
                                        }}>Especialidade 1</p>
                                    <p>34 funcionarios</p>
                                </div>
                                <div id='servsEspec1' className='servsEspec'>
                                    <p>serviço 1</p>
                                    <p>serviço 2</p>
                                    <p>serviço 3</p>
                                </div>
                            </div>
                        )
                    }
                    <div id='espec1' className='especs especAberto'>
                        <div id='headEspec1' className='headEspec' onClick={() => {verExpandEspec(1)} }>
                            <p className='nomeEspec'
                            style={{
                                borderColor: "#fff",
                                backgroundColor: "#b80a0a",
                                color: "#fff"
                                }}>Especialidade 1</p>
                            <p>34 funcionarios</p>
                        </div>
                        <div id='servsEspec1' className='servsEspec'>
                            <p>serviço 1</p>
                            <p>serviço 2</p>
                            <p>serviço 3</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id='sec2'>
                <h2>Editando especialidade</h2>
                <div id='contInfosEspecEdit'>
                    <div>
                        <label>Nome:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Cor da letra:</label>
                        <input type="color" name="" id="inpCorLetra" />
                    </div>
                    <div>
                        <label>Cor de fundo:</label>
                        <input type="color" name="" id="inpCorFundo" />
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
                    </div>
                </div>
                
            </section>
        </main>
        </div>
    )
}

export default Especialidades