import { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";
import Modal from "../../components/ui/Modal/Modal";

import ClientForm from "./ClientForm";

import {
  getClients,
  deleteClient
} from "../../services/clients/clientService";

import { useAuth } from "../../context/AuthContext";

import "./Clients.css";


function Clients() {


  const { profile } = useAuth();


  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);





  useEffect(() => {

    if (profile?.companyId) {

      loadClients();

    }

  }, [profile?.companyId]);






  const loadClients = async () => {

    try {


      const data = await getClients(
        profile.companyId
      );


      setClients(data);


    } catch(error) {


      console.error(
        "Error cargando clientes:",
        error
      );


    } finally {


      setLoading(false);


    }

  };






  const handleSuccess = async () => {


    setOpenModal(false);

    setSelectedClient(null);

    await loadClients();


  };







  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "¿Deseas eliminar este cliente?"
    );


    if (!confirmDelete) return;



    try {


      await deleteClient(id);


      await loadClients();



    } catch(error) {


      console.error(
        "Error eliminando cliente:",
        error
      );


    }


  };







  const columns = [


    {
      key: "name",
      label: "Cliente"
    },


    {
      key: "phone",
      label: "Teléfono"
    },


    {
      key: "address",
      label: "Dirección"
    },


    {
      key: "createdAt",
      label: "Fecha"
    }


  ];







  return (

    <div className="dashboard-layout">


      <Sidebar />



      <div className="dashboard-main">


        <Topbar />



        <main className="clients-page">



          <div className="clients-header">


            <div>

              <h1>
                Clientes
              </h1>


              <p>
                Gestiona los clientes de tu empresa.
              </p>


            </div>




            <button

              className="add-client-button"

              onClick={() => {

                setSelectedClient(null);

                setOpenModal(true);

              }}

            >

              + Nuevo cliente


            </button>



          </div>






          {

            loading ? (


              <p>
                Cargando clientes...
              </p>



            ) : (



              <Table


                columns={columns}


                data={clients}



                actions={(client) => (



                  <div

                    style={{

                      display:"flex",

                      gap:"10px"

                    }}

                  >




                    <ButtonIcon


                      icon={
                        <Eye size={18}/>
                      }


                      title="Ver cliente"



                      onClick={() => {


                        setSelectedClient(client);

                        setOpenModal(true);


                      }}


                    />






                    <ButtonIcon


                      icon={
                        <Trash2 size={18}/>
                      }



                      type="delete"



                      title="Eliminar"



                      onClick={() =>
                        handleDelete(client.id)
                      }



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

          setSelectedClient(null);


        }}



      >




        {

          selectedClient ? (


            <div>

              <h2>
                Detalle del cliente
              </h2>


              <p>
                Nombre: {selectedClient.name}
              </p>


              <p>
                Teléfono: {selectedClient.phone}
              </p>


              <p>
                Dirección: {selectedClient.address}
              </p>


            </div>



          ) : (


            <ClientForm

              onSuccess={handleSuccess}

            />


          )



        }





      </Modal>






    </div>


  );

}



export default Clients;