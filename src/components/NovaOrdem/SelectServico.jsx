const SelectServico = (props) => {
    
    return (
        <>
        <div id="contServico">
            <label>Serviço: </label>
            {/* <input type="text"  
                list='dtListServicos' 
                value={formNovaOrdem.servico}
                onChange={(e) => handleChangeNovaOrdem(e.target.value, 'servico')}
                />
            <datalist id="dtListServicos">
                {(servicos && servicos.length>0) && (
                    servicos.map(servico => (
                        <option key={`servico${servico.id}`} value={servico.nome}>{servico.nome}</option>
                    ))
                )}
            </datalist> */}
            <Select
            className="selectNovaOrdem"
                showSearch
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                value={formNovaOrdem.servicoID}
                onSelect={(value) => 
                    console.log('servico selecionado: ' + value)
                }
                onChange={(value) =>( 
                    handleChangeNovaOrdem(value, 'servicoID'),
                    console.log('valor atual do servico: ' + value)
                )}
                options={servicos.map(servico => (
                    {
                        value: servico.id,
                        label: `${servico.nome}`
                    }
                ))}
                style={{
                    width: '100%',
                }}
            />
            {showComponents.bttConfirmServico && (
                <button onClick={confirmServico}>Confirmar</button>
            )}
        </div>
        </>
    );
};
export default SelectServico;