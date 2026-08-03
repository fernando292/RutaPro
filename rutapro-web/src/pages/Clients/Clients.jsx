import { useEffect, useState } from "react";
import { Trash2, Eye, Pencil } from "lucide-react";

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

  const [viewClient, setViewClient] = useState(null);




  useEffect(() => {

    if(profile?.companyId){

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

    setViewClient(null);


    await loadClients();


  };







  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "¿Deseas eliminar este cliente?"
    );


    if(!confirmDelete) return;



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






  const openCreateModal = () => {


    setSelectedClient(null);

    setViewClient(null);

    setOpenModal(true);


  };






  const openEditModal = (client) => {


    setViewClient(null);

    setSelectedClient(client);

    setOpenModal(true);


  };






  const openViewModal = (client) => {


    setSelectedClient(null);

    setViewClient(client);

    setOpenModal(true);


  };






  const closeModal = () => {


    setOpenModal(false);

    setSelectedClient(null);

    setViewClient(null);


  };







  const columns = [

    {
      key:"name",
      label:"Cliente"
    },

    {
      key:"phone",
      label:"Teléfono"
    },

    {
      key:"address",
      label:"Dirección"
    },

    {
      key:"createdAt",
      label:"Fecha"
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

              onClick={openCreateModal}

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


                actions={(client) =>(


                  <div

                    style={{
                      display:"flex",
                      gap:"10px",
                      alignItems:"center"
                    }}

                  >




                    <ButtonIcon

                      icon={
                        <Eye size={18}/>
                      }

                      type="default"

                      title="Ver cliente"

                      onClick={() => {

                        openViewModal(client);

                      }}

                    />


                    <ButtonIcon
                      icon={
                        <Pencil size={18}/>
                      }

                      type="edit"

                      title="Editar cliente"

                      onClick={() => {

                        openEditModal(client);

                      }}
                      
                    />
                      


                    <ButtonIcon


                      icon={
                        <Trash2 size={18}/>
                      }

                      type="delete"

                      title="Eliminar"

                      onClick={() => {

                        handleDelete(client.id);

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


        onClose={closeModal}


      >



        {

          selectedClient ? (


            <ClientForm

              client={selectedClient}

              onSuccess={handleSuccess}

            />



          ) : viewClient ? (


            <div>


              <h2>
                Detalle del cliente
              </h2>



              <p>
                Nombre: {viewClient.name}
              </p>



              <p>
                Teléfono: {viewClient.phone}
              </p>



              <p>
                Correo: {viewClient.email || "No registrado"}
              </p>



              <p>
                Dirección: {viewClient.address}
              </p>



              <p>
                Ciudad: {viewClient.city}
              </p>



              <p>
                Estado: {viewClient.status}
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