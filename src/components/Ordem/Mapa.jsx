import { useState, useEffect } from "react";
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { getGoogleMapsToken } from "@services/mapsAPI";
import "@styles/ordem/mapa.css"
import Loading from '@components/public/Loading.jsx'
import { CloseOutlined } from '@ant-design/icons'
import HeaderModal from "../public/HeaderModal";

function Mapa ({ endereco, closeMap }) {
    const token = getGoogleMapsToken();
    const formatEndereco = `${endereco.logradouro}, ${endereco.numero}, CEP ${endereco.cep}, ${endereco.cidade}, ${endereco.uf}, Brasil`;

    const [position, setPosition] = useState(null);
    const [mapsLoaded, setMapsLoaded] = useState(false);
    useEffect(() => {
        if (
            mapsLoaded &&
            window.google &&
            window.google.maps &&
            typeof window.google.maps.Geocoder === "function"
        ) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: formatEndereco }, (results, status) => {
                if (status === "OK" && results[0]) {
                    setPosition(results[0].geometry.location);
                } else {
                    console.error("Geocode não obteve sucesso: ", status);
                }
            });
        }
    }, [mapsLoaded, formatEndereco])

    return (
        <section id="secMapaOrdem" className="modal">
            <HeaderModal
                title={"Endereço da ordem de serviço"}
                hasCloseBtt={true}
                closeModal={closeMap}
            />
            <APIProvider apiKey={token} onLoad={() => (
                console.log('Maps API has loaded.'),
                setMapsLoaded(true)
            )}>
                    {position ? (
                        <div id="contMapa" >    
                            <Map
                                defaultZoom={15}
                                defaultCenter={position}
                                mapId="Local do serviço"
                            >
                                <AdvancedMarker position={position} />
                            </Map>
                        </div>
                    ) : (
                        <Loading texto={'carregando mapa'}></Loading>
                    )}
            </APIProvider>
        </section>
    )
}
export default Mapa
