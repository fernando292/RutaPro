import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import RouteMap from "../../components/maps/RouteMap";
import ClientMarker from "../../components/maps/ClientMarker";
import DriverMarker from "../../components/maps/DriverMarker";

import { useAuth } from "../../context/AuthContext";

import { getClients } from "../../services/clients/clientService";
import { getDrivers } from "../../services/drivers/driverService";

import "./Map.css";


function Map() {


  const { profile } = useAuth();


  const [clients,setClients] = useState([]);

  const [drivers,setDrivers] = useState([]);



  useEffect(()=>{


    if(profile?.companyId){

      loadMapData();

    }


  },[profile?.companyId]);





  const loadMapData = async()=>{


    try{


      const clientsData = await getClients(

        profile.companyId

      );


      const driversData = await getDrivers(

        profile.companyId

      );



      setClients(clientsData);

      setDrivers(driversData);



    }catch(error){


      console.error(

        "Error cargando mapa:",

        error

      );


    }


  };



  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Topbar />


        <main className="map-content">


          <h1>

            Mapa logístico

          </h1>


          <p>

            Visualización de clientes y conductores.

          </p>



          <RouteMap>


            {

              clients.map((client)=>(

                <ClientMarker

                  key={client.id}

                  client={client}

                />

              ))

            }



            {

              drivers.map((driver)=>(

                <DriverMarker

                  key={driver.id}

                  driver={driver}

                />

              ))

            }


          </RouteMap>


        </main>


      </div>


    </div>

  );

}


export default Map;