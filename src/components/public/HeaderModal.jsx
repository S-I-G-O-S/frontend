import '@styles/public/headerModal.css'
import { CloseOutlined } from '@ant-design/icons'

const HeaderModal = (props) => {
    const title = props?.title || ""
    const hasCloseBtt = props?.hasCloseBtt || false
    const closeModal = props?.closeModal || console.error("Sem função para fechar a janela")
    return (
        <div className="headerModal">
            <h2>{title}</h2>
            {(hasCloseBtt) &&
                <button className='bttCloseModal'
                    onClick={closeModal}>
                    <CloseOutlined className='iconCloseModal'/>
                </button>
            }
        </div>
    )
};
export default HeaderModal