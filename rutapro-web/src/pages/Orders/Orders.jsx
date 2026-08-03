import { useEffect, useState } from "react";
import { Trash2, Eye, Pencil } from "lucide-react";

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
} from "../../services/orders/orderService";

import { useAuth } from "../../context/AuthContext";

import "./Orders.css";


function Orders() {


  const { profile } = useAuth();


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [viewOrder, setViewOrder] = useState(null);




  useEffect(() => {

    if(profile?.companyId){

      loadOrders();

    }

  }, [profile?.companyId]);






  const loadOrders = async()=>{

    try{

      const data = await getOrders(
        profile.companyId
      );

      setOrders(data);


    }catch(error){

      console.error(
        "Error cargando pedidos:",
        error
      );


    }finally{

      setLoading(false);

    }

  };







  const handleSuccess = async()=>{

    setOpenModal(false);

    setSelectedOrder(null);

    setViewOrder(null);

    await loadOrders();

  };







  const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
      "¿Deseas eliminar este pedido?"
    );


    if(!confirmDelete) return;



    try{


      await deleteOrder(id);

      await loadOrders();


    }catch(error){

      console.error(
        "Error eliminando pedido:",
        error
      );

    }

  };








  const columns=[

    {
      key:"orderNumber",
      label:"Pedido"
    },

    {
      key:"status",
      label:"Estado"
    },

    {
      key:"address",
      label:"Dirección"
    },

    {
      key:"total",
      label:"Total"
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

              onClick={()=>{

                setSelectedOrder(null);

                setViewOrder(null);

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


                actions={(order)=>(


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

                      onClick={()=>{

                        setViewOrder(order);

                        setSelectedOrder(null);

                        setOpenModal(true);

                      }}

                    />







                    <ButtonIcon

                      icon={
                        <Pencil size={18}/>
                      }

                      type="edit"

                      title="Editar pedido"

                      onClick={()=>{

                        setSelectedOrder(order);

                        setViewOrder(null);

                        setOpenModal(true);

                      }}

                    />







                    <ButtonIcon

                      icon={
                        <Trash2 size={18}/>
                      }

                      type="delete"

                      title="Eliminar"

                      onClick={()=>{

                        handleDelete(order.id);

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


        onClose={()=>{

          setOpenModal(false);

          setSelectedOrder(null);

          setViewOrder(null);

        }}


      >



        {

          selectedOrder ? (


            <OrderForm

              order={selectedOrder}

              onSuccess={handleSuccess}

            />


          ) : viewOrder ? (


            <OrderDetail

              order={viewOrder}

              onSuccess={handleSuccess}

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