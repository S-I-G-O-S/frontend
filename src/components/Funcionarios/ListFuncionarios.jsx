// ListaFuncionarios.jsx
// import { Dropdown, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { converterCargo, converterDtHr } from '@services/utils.jsx'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
function ListFuncionarios({ funcionarios, especialidades, cargo }) {
    if ( !funcionarios) {
        return (
            <tr>
                <td colSpan='6'>
                    sem funcionários
                </td>
            </tr>
        )
    }
    const navigate = useNavigate()
    const handleEditClick = (idFuncionario) => {
        if (cargo=='BASE' || cargo=='TECNICO') return
        navigate(`/funcionario?id=${idFuncionario}`)
    }
    return funcionarios.map(funcionario => (
        <tr key={`func${funcionario.id}`} className='funcs' onClick={() => handleEditClick(funcionario.id)}>
            <td className='nomeFunc cl1'>
                {`${funcionario.primeiro} ${funcionario.ultimo}`}
            </td>
            <td className='cellFunc cl2'>
                {funcionario.celular}
            </td>
            <td className='ultAtvFunc cl3'>
                {converterDtHr(funcionario.ultimaAtividade)}
            </td>
            <td className='cargoFunc cl4'>
                {converterCargo(funcionario.cargo)}
            </td>
            <td className='statusFunc cl5'>
                {funcionario.disponivel ? 'disponível' : 'indisponível'}
            </td>
            {/* <td className='setaSkillsFunc cl6'>
                {especialidades && (
                    <Dropdown
                        // placement='bottom'
                        // menu={{
                        //     items: funcionario.especialidades.length === 0 ?
                        //         [{ key: 'semEspecialidade', label: "sem especialidades" }] : funcionario.especialidades.map(id => {
                        //             const espec = especialidades.find(e => e.id === id)
                        //             return espec ? { key: espec.id, label: espec.nome } : null
                        //         }).filter(Boolean),
                        //     style: {
                        //         backgroundColor: '#F2E8DF',
                        //         fontWeight: '500'
                        //     }
                        // }}
                        // overlayStyle={{
                        //     border: "0.1rem solid #26110D",
                        //     borderRadius: '0.5rem'
                        // }}
                        options={[1, 2, 3]}
                    >
                        <div>expandir</div>
                    </Dropdown>
                )}
            </td> */}
        </tr>
    ))
}

export default ListFuncionarios
