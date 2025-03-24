import { useState, useEffect } from "react";
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { getGoogleMapsToken } from "@services/mapsAPI";
import "@styles/ordem/mapa.css"

export default function Mapa({ endereco, changeModal }) {
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
        <section id="secMapaOrdem">
            <h2>Endereço</h2>
            <APIProvider apiKey={token} onLoad={() => (
                console.log('Maps API has loaded.'),
                setMapsLoaded(true)
            )}>
                <div id="contMapa" >
                    {position ? (
                        <Map
                            defaultZoom={15}
                            defaultCenter={position}
                            mapId="Local do serviço"
                        >
                            <AdvancedMarker position={position} />
                        </Map>
                    ) : (
                        <p>Carregando mapa...</p>
                    )}
                </div>
            </APIProvider>
            <div id="contAcoesMapaOrdem">
                <button id="bttSair" onClick={() => changeModal(false)}>sair</button>
            </div>
        </section>
    )
}
