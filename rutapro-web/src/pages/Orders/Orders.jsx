import { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";
import Modal from "../../components/ui/Modal/Modal";

import OrderForm from "./OrderForm";
import OrderDetail from "./OrderDetail";

import {
  getOrders,
  deleteOrder
} from "../../services/orderService";

import { useAuth } from "../../context/AuthContext";

import "./Orders.css";


function Orders() {


  const { profile } = useAuth();

  console.log("EMPRESA PEDIDOS:", profile);


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);





  useEffect(() => {

    if (profile?.companyId) {
    loadOrders();
    }
  }, [profile?.companyId]);





  const loadOrders = async () => {

    try {

      const data = await getOrders(profile.companyId);

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
      key: "orderNumber",
      label: "Pedido"
    },


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

              onClick={() => {

                setSelectedOrder(null);

                setOpenModal(true);

              }}

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


                      title="Ver pedido"



                      onClick={() => {


                        setSelectedOrder(order);

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
                        handleDelete(order.id)
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

          setSelectedOrder(null);


        }}



      >





        {

          selectedOrder ? (


            <OrderDetail

              order={selectedOrder}

            />



          ) : (


            <OrderForm

              onSuccess={handleSuccess}

            />


          )


        }





      </Modal>






    </div>


  );

}



export default Orders;