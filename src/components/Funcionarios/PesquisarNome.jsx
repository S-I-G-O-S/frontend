// PesquisaNome.jsx
import { SearchOutlined } from '@ant-design/icons'

function PesquisaNome({ valor, onChange, onPesquisar }) {
    return (
        <div id='contPesqFunc'>
            <input
                type="text"
                value={valor === 'default' ? '' : valor}
                onChange={(e) => onChange(e.target.value, "nome")}
            />
            <button onClick={onPesquisar}>
                <SearchOutlined style={{ color: '#fcd8b9' }} />
            </button>
        </div>
    )
}

export default PesquisaNome
