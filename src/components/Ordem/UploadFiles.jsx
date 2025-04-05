import { useState } from 'react'
import "@styles/ordem/UploadFiles.css"

function UploadFiles() {
    // estado para armazenar os arquivos selecionados e mensagens de erro
    const [files, setFiles] = useState([])
    const [error, setError] = useState('')

    // Função chamada quando o usuário seleciona arquivos
    const handleFileChange = (e) => {
        // Converte o FileList para um array
        const selectedFiles = Array.from(e.target.files)
        // Define os tipos permitidos
        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4']
        // Verifica se cada arquivo tem um tipo permitido
        for (const file of selectedFiles) {
            if (!allowedTypes.includes(file.type)) {
                setError(`O arquivo ${file.name} não é permitido`)
                setFiles([])
                return
            }
        }
        setError('')
        console.log("arquivo selecionado: ", selectedFiles)
        setFiles(selectedFiles)
    }

    // Função para enviar os arquivos para o backend
    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Nenhum arquivo selecionado')
            return
        }
        const formData = new FormData()
        // Adiciona cada arquivo ao FormData com o mesmo campo (pode ser "files" ou conforme a API espera)
        files.forEach(file => {
            formData.append('files', file)
        })
        try {
            // Substitua [baseURL] pela URL base do seu backend
            const response = await fetch('[baseURL]/api/fotos', {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                setError('Erro ao enviar os arquivos')
            } else {
                alert('Upload realizado com sucesso!')
                setFiles([])
            }
        } catch (err) {
            setError('Erro ao enviar os arquivos')
        }
    }
    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '2px dashed #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        marginTop: '20px'
    }
    return (
        <div id="contUploadFiles" >
            {/* Input de arquivo com múltipla seleção e aceitação de tipos específicos */}
            <div id="contInputFiles">
                <input
                    type="file"
                    multiple
                    accept="image/jpeg, image/png, video/mp4"
                    onChange={handleFileChange}
                    id="inputFiles"
                    
                />
            </div>
            {/* Lista os arquivos selecionados com nome e tamanho (em KB) */}
            {files.length > 0 && (
                <div id="contListFiles">
                    <p>Arquivos selecionados:</p>
                    <ul id="listFiles">
                        {files.map((file, index) => (
                            <li key={'arquivo${index}'}>
                                {file.name} ({(file.size / 1048576).toFixed(2)}MB)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Exibe mensagem de erro, se houver */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* <button onClick={handleUpload}>Enviar arquivos</button> */}
        </div>
    )
}

export default UploadFiles