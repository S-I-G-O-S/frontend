import { getUsuarioContext } from "../context/UsuarioContext"
import Nav from '@components/public/Nav.jsx'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { getGoogleMapsToken } from "../services/mapsAPI";

export default function Teste() {
    const token = getGoogleMapsToken()
    const { usuario } = getUsuarioContext()
    // const position = { lat: -23.942596609219, lng: -46.32638259822 }
    const position = { lat: -33.860664, lng: 151.208138 }

    return (
        <APIProvider apiKey={token} onLoad={() => console.log('Maps API has loaded.')}>
            <div id="pageTeste">
                {/* <header titulo={"Editando ordem"} usuario={usuario}></header> */}
                <Nav cargo={usuario?.cargo || ''}></Nav>
                <main>
                    <div id="contMapa" style={{height: "30rem", width: "30rem"}}>
                    <Map
                        defaultZoom={13}
                        defaultCenter={position}
                        mapId='Local do serviço'
                    // onCameraChanged={ () =>
                    //     console.log('camera changed:', MapCameraChangedEvent.detail.center, 'zoom:', MapCameraChangedEvent.detail.zoom)
                    // }
                    >
                        <AdvancedMarker position={position} />
                    </Map>
                    </div>
                </main>
            </div>
        </APIProvider >
    )
}