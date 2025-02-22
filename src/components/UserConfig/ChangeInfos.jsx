import { useEffect, useState } from "react";
import { SearchOutlined} from '@ant-design/icons'
import '@styles/userConfig/changeInfos.css'
import { getUsuarioContext } from "../../context/UsuarioContext";
import { putEditUsuario } from "../../services/backend/usuarioAPI";

export default function ChangeInfos({ changeModal }) {
    const {usuario, attUsuario} = getUsuarioContext()
    const [formUsuario, setFormUsuario] = useState({
        "nome": "",
        "primeiro": "",
        "ultimo": "",
        "email": "",
        "celular": "",
        "cargo": "",
        "endereco": {
            "cep": "",
            "logradouro": "",
            "numero": "",
            "bairro": "",
            "cidade": "",
            "uf": "",
            "complemento": ""
        }
    })
    const [loading, setLoading] = useState(false)
    const handleSalvar = async () => {
        setLoading(true)
        const result = await putEditUsuario(formUsuario)
        if (!result.success) {
            console.error(result.error)
            setLoading(false)
            return
        }
        attUsuario()
        setLoading(false)
        changeModal(false)
    }
    const handleCEP = (value) => {
        const cep = value.replace(/\D/g, '')
        
        if (cep.length > 8) {return}

        if (cep.length === 0) {
            setFormUsuario(prevState => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: '',
                }
            }));
            return
        }

        let formatted = cep;
        /*
        TODO Tirei pra evitar erro no primeiro carregamento
        if (cep.length > 5) {
            formatted = `${cep.slice(0, 5)}-${cep.slice(5)}`;
        }
        */
        setFormUsuario(prevState => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                cep: formatted,
            }
        }))
    }
    const fetchCEP = async () => {
        const cep = formUsuario.endereco.cep.replace(/\D/g, '')
        if (cep.length === 8) {
            try {
                const response = await cepAPI(cep)
                console.warn(response)
                const { street, neighborhood, city, state } = response.data
                setFormUsuario(prevState => ({
                    ...prevState,
                    endereco: {
                        ...prevState.endereco,
                        logradouro: street,
                        bairro: neighborhood,
                        cidade: city,
                        uf: state
                    }
                }))
            } catch (error) {
                notification.error({
                    message: `Erro ao procurar CEP`,
                    description: 'CEP não encontrado',
                    placement,
                })
            }
        } else {
            notification.error({
                message: `Erro ao procurar CEP`,
                description: 'CEP fornecido inválido.',
                placement,
            })
        }
    }
    const handleChangeEndereco = (value, field) => {
        if(field == 'logradouro' && value.length > 100) {
            return
        }
        if(field == 'numero' && value.length > 10) {
            return
        }
        if(field == 'bairro' && value.length > 50) {
            return
        }
        if(field == 'cidade' && value.length > 50) {
            return
        }
        if(field == 'uf' && value.length > 2) {
            return
        }
        if(field == 'complemento' && value.length > 100) {
            return
        }
        setFormUsuario(prevState => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                [field]: value,
            }
        }))
    }
    const handleChangeDados = (value, field) => {
        if(field == 'nome' && value.length > 100) {
            return
        }
        if(field == 'email' && value.length > 100) {
            return
        }
        if(field == 'celular' ) {
            if (value.length > 15) {return}
            formatCelular(value)
            return
        }
        
        setFormUsuario(prevState => ({
            ...prevState,
            [field]: value,
        }))
    }
    const formatCelular = (value) => {
        let cleaned = value.replace(/\D/g, '');
        if (cleaned.length === 0) {
            setFormUsuario(prevState => ({
                ...prevState,
                celular: ''
            }));
            return;
        }

        // Aplica a máscara progressivamente
        let formatted = cleaned;

        if (cleaned.length > 2) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        }
        if (cleaned.length > 7) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        setFormUsuario(prevState => ({
            ...prevState,
            celular: formatted,
        }));
    }
    const formatNome = () => {
        const nomeSanitizado = formUsuario.nome.trim().replace(/[^a-zA-Z\s]/g, '');

        if (!nomeSanitizado) {
            return
        }
        if (nomeSanitizado.length > 30) {
            console.error("O nome deve ter no máximo 30 caracteres.");
            return
        }

        const partesNome = nomeSanitizado.split(/\s+/).map(
            parte => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase()
        );

        const primeiro = partesNome[0] || '';
        const ultimo = partesNome.length > 1 ? partesNome[partesNome.length - 1] : '';
        handleChangeDados(primeiro, "primeiro")
        handleChangeDados(ultimo, "ultimo")
        /*
        setFormUsuario({
            ...formUsuario,
            primeiro: primeiro ? primeiro : '',
            ultimo: ultimo ? ultimo : ''
        })
        */
    }
    useEffect(() => {
        formatNome()
    }, [formUsuario?.nome])
    useEffect(() => {
        setFormUsuario(usuario)
    }, [usuario])
    return usuario && (
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
                    <input 
                        type="text" 
                        value={formUsuario.nome}
                        onChange={(e) => handleChangeDados(e.target.value, 'nome')}
                        />
                </div>
                <div id='subContPrimeiro'>
                    <label>Primeiro nome</label>
                    <input 
                        type="text" 
                        value={formUsuario.primeiro}
                        onChange={(e) => handleChangeDados(e.target.value, 'primeiro')}
                        />
                </div>
                <div id='subContUltimo'>
                    <label>Ultimo nome</label>
                    <input 
                        type="text" 
                        value={formUsuario.ultimo}
                        onChange={(e) => handleChangeDados(e.target.value, 'ultimo')}
                        />
                </div>
            </div>
            <div id="contCelular">
                <label>celular</label>
                <input 
                    type="text" 
                    value={formUsuario.celular}
                    onChange={(e) => handleChangeDados(e.target.value, 'celular')}
                    />
            </div>
            <div id='contEndFunc'>
                <div id='contCepFunc'>
                    <label>CEP:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco.cep || ""}
                        onChange={(e) => handleCEP(e.target.value)}
                    />
                    <button id='bttPesqCEP' onClick={fetchCEP}>
                        <p>Pesquisar CEP</p>
                        <SearchOutlined />
                    </button>
                </div>
                <div id='contRuaFunc'>
                    <label>Rua:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco?.logradouro || ""}
                        onChange={(e) => handleChangeEndereco(e.target.value, "logradouro")}
                    />
                </div>
                <div id='contNumFunc'>
                    <label>Nº:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco?.numero || ""}
                        onChange={(e) => handleChangeEndereco(e.target.value, "numero")}
                    />
                </div>
                <div id='contCompFunc'>
                    <label>Complemento:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco?.complemento || ""}
                        onChange={(e) => handleChangeEndereco(e.target.value, "complemento")}
                    />
                </div>
                <div id='contBairroFunc'>
                    <label>Bairro:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco?.bairro || ""}
                        onChange={(e) => handleChangeEndereco(e.target.value, "bairro")}
                    />
                </div>
                <div id='contCidadeFunc'>
                    <label>Cidade:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco?.cidade || ""}
                        onChange={(e) => handleChangeEndereco(e.target.value, "cidade")}
                    />
                </div>
                <div id='contUFFunc'>
                    <label>UF:</label>
                    <input
                        type="text"
                        value={formUsuario.endereco?.uf || ""}
                        onChange={(e) => handleChangeEndereco(e.target.value, "uf")}
                    />
                </div>
            </div>
            <div>
                <button onClick={() => changeModal(false)}>cancelar</button>
                <button onClick={handleSalvar}>salvar</button>
            </div>
        </section>
    )
}