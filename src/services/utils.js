export const converterCargo = (cargo) => {
    let cargoConvertido
    switch(cargo) {
        case 'TECNICO': 
            cargoConvertido = 'Técnico'
            break;
        case 'BASE': 
            cargoConvertido = 'Base'
            break;
        case 'DEV': 
            cargoConvertido = 'Dev'
            break;
        case 'ADM': 
            cargoConvertido = 'ADM'
            break;
        default: 
            cargoConvertido = 'erro'
            break;
    }
    return cargoConvertido
}
export const converterEspecs = (idEspec) => {
        let especialidade = especialidades.find(espec => espec.id == idEspec)
        const [cor1, cor2] = especialidade.cor.split('/')
        return (
            <div className='skillsFunc' key={especialidade.id}
                style={{
                        borderColor: cor2,
                        backgroundColor: cor1,
                        color: cor2
                }}
            >
                {especialidade.nome}
            </div>
        )
    }
export const converterDtHr = (dataHora) => {
        if (!dataHora) {
            return '--/--/----, --:--'
        }
        const [dia, mes, anoHora] = dataHora.split('-')
        const [ano, hora] = anoHora.split(' ')
        const dataISO = `${ano}-${mes}-${dia}T${hora}`

        const data = new Date(dataISO);
        if (isNaN(data.getTime())) return "Data Inválida"
            return data.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }