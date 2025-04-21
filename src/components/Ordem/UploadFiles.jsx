import { useState } from 'react'
import "@styles/ordem/uploadFiles.css"

function UploadFiles({files, setFiles}) {
    const [error, setError] = useState('')

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)
        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4']
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

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Nenhum arquivo selecionado')
            return
        }
        const formData = new FormData()
        files.forEach(file => {
            formData.append('files', file)
        })
        try {
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
    return (
        <div id="contUploadFiles" >
            <div id="contInputFiles">
                <input
                    type="file"
                    multiple
                    accept="image/jpeg, image/png, video/mp4"
                    onChange={handleFileChange}
                    id="inputFiles"
                    
                />
            </div>
            {files.length > 0 && (
                <div id="contListFiles">
                    <p>Arquivos selecionados:</p>
                    <ul id="listFiles">
                        {files.map((file, index) => (
                            <li key={`arquivo${index}`}>
                                {file.name} ({(file.size / 1048576).toFixed(2)}MB)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UploadFiles