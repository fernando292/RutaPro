import {
  Marker,
  Popup
} from "react-leaflet";


function ClientMarker({

  client

}) {

  if (!client.latitude || !client.longitude) {

    return null;

  }


  return (

    <Marker

      position={[

        client.latitude,

        client.longitude

      ]}

    >

      <Popup>

        <strong>

          {client.name}

        </strong>

        <br />

        {client.address}

        <br />

        {client.phone}

      </Popup>


    </Marker>

  );

}


export default ClientMarker;