import { CloseOutlined } from '@ant-design/icons'
import { Children } from 'react'

const Modal = (props) => {
    const title = props?.title || ""
    const hasCloseBtt = props?.closeButton || false
    const closeModal = props?.closeModal || console.error("Sem função para fechar a janela")
    return (
        <div className="shadowBG">
            <div className='publicModal'>
                <div className="headerModal">
                    <h2>{title}</h2>
                    {(hasCloseBtt) &&
                        <button className='bttCloseModal'
                            onClick={closeModal}>
                            <CloseOutlined className='iconCloseModal'/>
                        </button>
                    }
                </div>
                {Children}
            </div>
        </div>
    )
}
export default Modal;