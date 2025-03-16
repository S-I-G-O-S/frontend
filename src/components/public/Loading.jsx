import './Loading.css'
import {LoadingOutlined} from '@ant-design/icons'
function Loading({texto}) {
    const tagP = texto || "carregando"
    return (
        <div id='contCarregando'>
            {/* <img src={carregando} alt="carregando" /> */}
            <LoadingOutlined id="loadingIMG"/>
            <p>{tagP}</p>
        </div>
    )
}
export default Loading