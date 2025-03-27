# Listagem de funcionarios versão mobile

```js
<div id='layoutMobile'>
    {
        !funcionarios ? 
        <Skeleton/> :
        funcionarios.map(funcionario => (
            <div id={`funcionario${funcionario.id}`} className='funcs skillsFechado' key={funcionario.id}>
                <div className='infosFunc'>
                    <div className='nomeFunc'>
                        <span>Nome: </span>
                        {funcionario.primeiro + ' ' + funcionario.ultimo}
                    </div>
                    <div className='cellFunc'>
                        <span>Cel: </span>
                        {funcionario.celular}
                    </div>
                    <div className='ultAtvFunc'>
                        <span>Ultima atividade: </span>
                        {converterDtHr(funcionario.ultimaAtividade)}
                    </div>
                    <div className='cargoFunc'>
                        <span>Cargo: </span>
                        {funcionario.cargo}
                    </div>
                    <div className='statusFunc'>
                        <span>Status: </span>
                        {
                            funcionario.disponivel
                                ? 'disponível'
                                : 'indisponível'
                        }
                    </div>
                </div>
                <div className='editFunc' onClick={() => handleEditClick(funcionario.id)}>
                    <img className='imgEditFunc' src={Edit} alt="editar"/>
                </div>
            </div>
        ))
    }
</div> 
```
