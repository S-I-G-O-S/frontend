export default function ChangeInfos({closeModal}) {
    return (
        <section id='secChangeInfos'>
            {/* 
                    nome,
                    primeiro,
                    ultimo,
                    celular,
                    endereço
                 */}
            <div id='contNomes'>
                <div id='subContNome'>
                    {/* Atualizar os input Primeiro e Ultimo por este */}
                    <label>Nome completo</label>
                    <input type="text" />
                </div>
                <div id='subContPrimeiro'>
                    <label>Primeiro nom</label>
                    <input type="text" />
                </div>
                <div id='subContUltimo'>
                    <label>Ultimo nome</label>
                    <input type="text" />
                </div>
            </div>
            <div id="contCelular">

            </div>
            <div id="contEndereco">
            
            </div>
        </section>
    )
}