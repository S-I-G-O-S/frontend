import { CloseOutlined } from '@ant-design/icons'

function Filtros({ filtros, onChangeQTD, onChange, onAplicar, onCancelar, especialidades, cargo }) {
    return (
        <div id='secFiltros'>
            <div id='headerFiltros'>
                <h2>Filtros</h2>
                <div id='closeModel' onClick={onCancelar}>
                    <CloseOutlined />
                </div>
            </div>
            <div id='subContFiltros'>
                <div id='contCargoFiltro'>
                    <label>Cargo: </label>
                    <select
                        value={filtros.cargo.value}
                        onChange={(e) => onChange(e.target.value, 'cargo')}
                    >
                        <option value="default">Todos</option>
                        <option value="TECNICO">Técnicos</option>
                        <option value="BASE">Base</option>
                        <option value="ADM">ADM</option>
                        <option value="DEV">Dev</option>
                    </select>
                </div>
                <div id='contEspecFiltro'>
                    <label>Especialidade: </label>
                    <select
                        value={filtros.especialidade.value}
                        onChange={(e) => onChange(e.target.value, 'especialidade')}
                    >
                        {
                            especialidades && [
                                <option key="default" value="default">Todos</option>,
                                ...especialidades.map(espec => (
                                    <option key={espec.id} value={espec.id}>{espec.nome}</option>
                                ))
                            ]
                        }
                    </select>
                </div>
                <div id='contDispFiltro'>
                    <label>Disponibilidade: </label>
                    <select
                        value={filtros.disponivel.value}
                        onChange={(e) => onChange(e.target.value, 'disponivel')}
                    >
                        <option value="default">Todos</option>
                        <option value="true">Disponíveis</option>
                        <option value="false">Indisponíveis</option>
                    </select>
                </div>
                {(cargo === 'ADM' || cargo === 'DEV') && (
                    <div id='contAtivoFiltro'>
                        <label>Funcionarios ativos: </label>
                        <select
                            value={filtros.ativo.value}
                            onChange={(e) => onChange(e.target.value, 'ativo')}
                        >
                            <option value="default">Todos</option>
                            <option value="true">Ativos</option>
                            <option value="false">Inativos</option>
                        </select>
                    </div>
                )}
                <div id='contQTDFiltro'>
                    <label>Quantidade: </label>
                    <select
                        id="selectQTD"
                        value={filtros.qtd}
                        onChange={(e) => onChangeQTD(e.target.value)}
                    >
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
                </div>
            </div>
            <div id='footerFiltros'>
                <button id='bttCancelar' onClick={onCancelar}>
                    Cancelar
                </button>
                <button id='bttAplicar' onClick={onAplicar}>
                    Aplicar filtros
                </button>
            </div>
        </div>
    )
}

export default Filtros
