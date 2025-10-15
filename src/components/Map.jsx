import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../Hooks/useGeolocate";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([9, 8]);
  const [mapLat, mapLng] = useUrlPosition();
  const { getPosition, isLoading: isLoadingPosition, position: geolocatePosition } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)]);
  }, [mapLat, mapLng]);

  useEffect(
    function () {
      if (geolocatePosition) setMapPosition([geolocatePosition.lat, geolocatePosition.lng]);
    },
    [geolocatePosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocatePosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? "Loading" : "Pin your Location"}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map((city) =>
          city.position?.lat && city.position?.lng ? (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ) : null
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
