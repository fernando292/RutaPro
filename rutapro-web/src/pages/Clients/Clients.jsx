import {
  useEffect,
  useState,
  useMemo,
  useCallback
} from "react";


import {
  Trash2,
  Eye,
  Pencil
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
} from "../../services/clients/clientService";


import {
  useAuth
} from "../../context/AuthContext";


import "./Clients.css";



function Clients() {


  const { profile } = useAuth();



  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);

  const [viewClient, setViewClient] = useState(null);







  const loadClients = useCallback(async () => {


    if (!profile?.companyId) return;



    try {


      const data = await getClients(
        profile.companyId
      );


      setClients(data || []);



    } catch (error) {


      console.error(
        "Error cargando clientes:",
        error
      );


    } finally {


      setLoading(false);


    }


  }, [profile?.companyId]);







  useEffect(() => {


    loadClients();


  }, [loadClients]);








  const handleSuccess = useCallback(async () => {


    setOpenModal(false);

    setSelectedClient(null);

    setViewClient(null);


    await loadClients();


  }, [loadClients]);









  const handleDelete = useCallback(async (id) => {


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


  }, [loadClients]);










  const openCreateModal = useCallback(() => {


    setSelectedClient(null);

    setViewClient(null);

    setOpenModal(true);


  }, []);







  const openEditModal = useCallback((client) => {


    setViewClient(null);

    setSelectedClient(client);

    setOpenModal(true);


  }, []);







  const openViewModal = useCallback((client) => {


    setSelectedClient(null);

    setViewClient(client);

    setOpenModal(true);


  }, []);








  const closeModal = useCallback(() => {


    setOpenModal(false);

    setSelectedClient(null);

    setViewClient(null);


  }, []);









  const columns = useMemo(() => [


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


  ], []);









  const renderActions = useCallback((client) => (

    <div className="table-actions">


      <ButtonIcon

        icon={<Eye size={18} />}

        type="default"

        title="Ver cliente"

        onClick={() =>
          openViewModal(client)
        }

      />



      <ButtonIcon

        icon={<Pencil size={18} />}

        type="edit"

        title="Editar cliente"

        onClick={() =>
          openEditModal(client)
        }

      />



      <ButtonIcon

        icon={<Trash2 size={18} />}

        type="delete"

        title="Eliminar cliente"

        onClick={() =>
          handleDelete(client.id)
        }

      />


    </div>


  ), [

    openViewModal,

    openEditModal,

    handleDelete

  ]);









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

                actions={renderActions}

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



            <div className="client-detail">


              <h2>
                Detalle del cliente
              </h2>



              <p>
                <strong>Nombre:</strong>{" "}
                {viewClient.name}
              </p>



              <p>
                <strong>Teléfono:</strong>{" "}
                {viewClient.phone || "No registrado"}
              </p>



              <p>
                <strong>Correo:</strong>{" "}
                {viewClient.email || "No registrado"}
              </p>



              <p>
                <strong>Dirección:</strong>{" "}
                {viewClient.address || "No registrada"}
              </p>



              <p>
                <strong>Ciudad:</strong>{" "}
                {viewClient.city || "No registrada"}
              </p>



              <p>
                <strong>Estado:</strong>{" "}
                {viewClient.status || "Activo"}
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