import { useEffect, useState } from "react";
import { Pencil, Eye } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import Modal from "../../components/ui/Modal/Modal";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";

import RouteForm from "./RouteForm";

import { getRoutes } from "../../services/routes/routeService";

import { useAuth } from "../../context/AuthContext";

import "./Routes.css";


function Routes() {


  const { profile } = useAuth();


  const [routes, setRoutes] = useState([]);

  const [loading, setLoading] = useState(true);


  const [openModal, setOpenModal] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);

  const [modalMode, setModalMode] = useState("create");




  useEffect(() => {

    if (profile?.companyId) {

      loadRoutes();

    }

  }, [profile?.companyId]);




  const loadRoutes = async () => {

    try {

      const data = await getRoutes(
        profile.companyId
      );


      setRoutes(data);


    } catch (error) {


      console.error(
        "Error cargando rutas:",
        error
      );


    } finally {

      setLoading(false);

    }

  };





  const handleSuccess = async () => {

    setOpenModal(false);

    setModalMode("create");

    setSelectedRoute(null);

    await loadRoutes();

  };





  const columns = [

    {
      key: "routeNumber",
      label: "Ruta",
    },

    {
      key: "driverName",
      label: "Conductor",
    },

    {
      key: "vehiclePlate",
      label: "Vehículo",
    },

    {
      key: "totalOrders",
      label: "Pedidos",
    },

    {
      key: "createdAt",
      label: "Fecha",
    },

    {
      key: "status",
      label: "Estado",
    },

  ];





  return (

    <div className="dashboard-layout">


      <Sidebar />



      <div className="dashboard-main">


        <Topbar />



        <main className="routes-page">


          <div className="routes-header">


            <div>

              <h1>
                Rutas
              </h1>


              <p>
                Gestiona las rutas de distribución.
              </p>

            </div>





            <button

              className="add-route-button"

              onClick={() => {


                setModalMode("create");

                setSelectedRoute(null);

                setOpenModal(true);


              }}

            >

              + Nueva ruta


            </button>


          </div>






          {

            loading

            ? (

              <p>
                Cargando rutas...
              </p>

            )

            : (


              <Table

                columns={columns}

                data={routes}


                actions={(route) => (

                  <div

                    style={{

                      display: "flex",

                      gap: "8px",

                      justifyContent: "center",

                    }}

                  >



                    <ButtonIcon

                      icon={<Eye size={18} />}

                      type="default"

                      title="Ver"

                      onClick={() => {


                        setModalMode("view");

                        setSelectedRoute(route);

                        setOpenModal(true);


                      }}

                    />





                    <ButtonIcon

                      icon={<Pencil size={18} />}

                      type="edit"

                      title="Editar"

                      onClick={() => {


                        setModalMode("edit");

                        setSelectedRoute(route);

                        setOpenModal(true);


                      }}

                    />


                  </div>

                )}

              />


            )

          }




        </main>


      </div>






      <Modal

        isOpen={openModal}


        onClose={() => {


          setOpenModal(false);

          setSelectedRoute(null);

          setModalMode("create");


        }}

      >



        <RouteForm

          route={selectedRoute}

          mode={modalMode}

          onSuccess={handleSuccess}

        />



      </Modal>



    </div>

  );


}


export default Routes;