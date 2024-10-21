import carregando from "../../assets/loading1.gif";
import './Loading.css'
function Loading() {
    return (
        <div id='contCarregando'>
            <img src={carregando} alt="carregando" />
            <p>carregando</p>
        </div>
    )
}
export default Loading