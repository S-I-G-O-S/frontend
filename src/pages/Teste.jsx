import { getUsuarioContext } from "../context/UsuarioContext"
import Nav from '@components/public/Nav.jsx'
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

function Teste () {
    const { usuario } = getUsuarioContext()
    return (
        <APIProvider apiKey={'Your API key here'} onLoad={() => console.log('Maps API has loaded.')}>
            <div id="pageTeste">
            {/* <header titulo={"Editando ordem"} usuario={usuario}></header> */}
            <Nav cargo={usuario?.cargo || ''}></Nav>
            <main>
            
            </main>
            </div>
        </APIProvider>
    )
}
export default Teste