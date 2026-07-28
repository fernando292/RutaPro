import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Pencil,
  Trash2
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import Modal from "../../components/ui/Modal/Modal";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";

import ClientForm from "./ClientForm";

import {
  getClients,
  deleteClient
} from "../../services/clientService";

import "./Clients.css";


function Clients() {


  const { profile } = useAuth();

  console.log("EMPRESA CLIENTES:", profile);

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

      const data = await getClients(profile.companyId);

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
      "¿Seguro que deseas eliminar este cliente?"
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
      key: "email",
      label: "Correo"
    },


    {
      key: "city",
      label: "Ciudad"
    },


    {
      key: "status",
      label: "Estado"
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
                Administra los clientes registrados.
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


                  <>



                    <ButtonIcon


                      icon={<Pencil size={18}/>}


                      type="edit"


                      title="Editar"



                      onClick={() => {


                        setSelectedClient(client);


                        setOpenModal(true);



                      }}


                    />






                    <ButtonIcon


                      icon={<Trash2 size={18}/>}


                      type="delete"


                      title="Eliminar"



                      onClick={() =>

                        handleDelete(client.id)

                      }


                    />



                  </>



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




        <ClientForm


          client={selectedClient}


          onSuccess={handleSuccess}


        />



      </Modal>






    </div>


  );


}


export default Clients;