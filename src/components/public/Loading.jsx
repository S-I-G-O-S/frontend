import carregando from "../../assets/loading1.gif";
import './Loading.css'
import {LoadingOutlined} from '@ant-design/icons'
function Loading() {
    return (
        <div id='contCarregando'>
            {/* <img src={carregando} alt="carregando" /> */}
            <LoadingOutlined id="loadingIMG"/>
            <p>carregando</p>
        </div>
    )
}
export default Loading