import {
  Marker,
  Popup
} from "react-leaflet";


function DriverMarker({

  driver

}) {


  if (!driver.latitude || !driver.longitude) {

    return null;

  }


  return (

    <Marker

      position={[

        driver.latitude,

        driver.longitude

      ]}

    >

      <Popup>

        <strong>

          {driver.name}

        </strong>

        <br />

        Vehículo:

        <br />

        {driver.vehicle || "Sin asignar"}

      </Popup>


    </Marker>

  );

}


export default DriverMarker;