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

function Especialidades() {
    let especialidades = [
        {
        "id": 1,
        "nome": "Especialidade 1",
        "contFuncs": 34,
        "cor": "#b80a0a/#fff",
        "servicos": ["serviço 1", "serviço 2", "serviço 3"]}
    ]
    return(
        <div id='pageEspecialidades'>
        <Header></Header>
        <Nav></Nav>
        <main>
            <section id='sec1'>
                <div id='contH2Novo'>
                    <h2>Especialidades</h2>
                    <button>Nova Especialidade</button>
                </div>
                {/* 
                    nome
                    cont funcs
                    list servs

                 */}
                <div id='titulo'>
                    <label>ordenar por: </label>
                    <input type="checkbox" name="ord" id="" />
                    <input type="checkbox" name="ord" id="" />
                    <input type="checkbox" name="ord" id="" />
                </div>
                <div id='contListEspecs'>
                    
                    <div id='espec1' className='especs especAberto'>
                        <div id='headEspec1' className='headEspec'>
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
                <div id='contServiçosEspecEdit'>
                    <div>
                        <p>Serviços relacionados</p>
                        <button>Adicionar</button>
                    </div>
                    <div id='listServiçosEdit'>
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