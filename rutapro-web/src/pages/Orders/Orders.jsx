import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";
import Modal from "../../components/ui/Modal/Modal";

import OrderForm from "./OrderForm";

import {
  getOrders,
  deleteOrder
} from "../../services/orderService";

import "./Orders.css";


function Orders() {


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);



  useEffect(() => {

    loadOrders();

  }, []);




  const loadOrders = async () => {

    try {

      const data = await getOrders();

      setOrders(data);


    } catch(error) {

      console.error(
        "Error cargando pedidos:",
        error
      );


    } finally {

      setLoading(false);

    }

  };




  const handleSuccess = async () => {

    setOpenModal(false);

    await loadOrders();

  };





  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "¿Deseas eliminar este pedido?"
    );


    if (!confirmDelete) return;


    try {

      await deleteOrder(id);

      await loadOrders();


    } catch(error) {

      console.error(
        "Error eliminando pedido:",
        error
      );

    }

  };





  const columns = [

    {
      key: "status",
      label: "Estado"
    },

    {
      key: "address",
      label: "Dirección"
    },

    {
      key: "total",
      label: "Total"
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



        <main className="orders-page">


          <div className="orders-header">


            <div>

              <h1>
                Pedidos
              </h1>


              <p>
                Gestiona los pedidos de clientes.
              </p>


            </div>




            <button

              className="add-order-button"

              onClick={() => setOpenModal(true)}

            >

              + Nuevo pedido


            </button>



          </div>





          {

            loading ? (

              <p>
                Cargando pedidos...
              </p>


            ) : (


              <Table

                columns={columns}

                data={orders}

                actions={(order) => (

                  <ButtonIcon

                    icon={<Trash2 size={18}/>}

                    type="delete"

                    title="Eliminar"

                    onClick={() =>
                      handleDelete(order.id)
                    }

                  />

                )}

              />


            )

          }





        </main>



      </div>







      <Modal

        isOpen={openModal}

        onClose={() => setOpenModal(false)}

      >

        <OrderForm

          onSuccess={handleSuccess}

        />


      </Modal>




    </div>

  );

}


export default Orders;