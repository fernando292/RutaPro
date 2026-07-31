import {
  MapContainer,
  TileLayer
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "./RouteMap.css";

function RouteMap({

  center = [6.2442, -75.5812],

  zoom = 13,

  children

}) {

  return (

    <MapContainer

      center={center}

      zoom={zoom}

      className="route-map"

    >

      <TileLayer

        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        attribution='&copy; OpenStreetMap contributors'

      />

      {children}

    </MapContainer>

  );

}

export default RouteMap;