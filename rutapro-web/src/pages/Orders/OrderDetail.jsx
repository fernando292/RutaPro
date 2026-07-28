import { useEffect, useState } from "react";

import {
  updateOrder
} from "../../services/orders/orderService";

import {
  increaseStock
} from "../../services/inventory/inventoryMovementService";

import "./OrderDetail.css";


function OrderDetail({

  order,

  onSuccess

}) {


  const [status, setStatus] = useState("");


  const [loading, setLoading] = useState(false);




  useEffect(() => {

    if (order) {

      setStatus(order.status);

    }

  }, [order]);





  if (!order) return null;





  const handleSave = async () => {


    if (loading) return;


    try {


      setLoading(true);


      // Si el pedido pasa a Cancelado,
      // devolver el inventario una sola vez.
      if (

        order.status !== "Cancelado" &&

        status === "Cancelado"

      ) {

        await increaseStock(

          order.items,

          order.companyId,

          "Cancelación de pedido"

        );

      }


      await updateOrder(

        order.id,

        {

          status

        }

      );


      if (onSuccess) {

        await onSuccess();

      }


    } catch (error) {


      console.error(

        "Error actualizando pedido:",

        error

      );


    } finally {


      setLoading(false);

    }


  };








  return (


    <div className="order-detail">


      <h2>

        Pedido #

        {String(order.orderNumber).padStart(4, "0")}

      </h2>






      <div className="detail-section">


        <h3>

          Información del cliente

        </h3>



        <p>

          <strong>Cliente:</strong>{" "}

          {order.clientName || "Sin nombre"}

        </p>



        <p>

          <strong>Dirección:</strong>{" "}

          {order.address || "Sin dirección"}

        </p>




        <label>

          <strong>Estado</strong>

        </label>



        <select

          value={status}

          onChange={(e) =>

            setStatus(e.target.value)

          }

        >

          <option value="Pendiente">

            Pendiente

          </option>

          <option value="Preparando">

            Preparando

          </option>

          <option value="En ruta">

            En ruta

          </option>

          <option value="Entregado">

            Entregado

          </option>

          <option value="Cancelado">

            Cancelado

          </option>

        </select>


      </div>








      <div className="detail-section">


        <h3>

          Productos

        </h3>




        <div className="products-detail">


          {

            order.items?.map((item, index) => (

              <div

                key={index}

                className="product-detail-card"

              >


                <p>

                  <strong>

                    Producto:

                  </strong>{" "}

                  {item.productName}

                </p>



                <p>

                  <strong>

                    Cantidad:

                  </strong>{" "}

                  {item.quantity}

                </p>



                <p>

                  <strong>

                    Precio:

                  </strong>{" "}

                  $

                  {Number(item.price)
                    .toLocaleString("es-CO")}

                </p>



                <p>

                  <strong>

                    Subtotal:

                  </strong>{" "}

                  $

                  {Number(item.subtotal)
                    .toLocaleString("es-CO")}

                </p>


              </div>

            ))

          }


        </div>


      </div>








      <div className="order-total">


        Total:


        {" "}


        $


        {Number(order.total)
          .toLocaleString("es-CO")}


      </div>







      <button

        className="save-order-button"

        onClick={handleSave}

        disabled={loading}

      >

        {

          loading

            ? "Guardando..."

            : "Guardar cambios"

        }

      </button>



    </div>


  );


}


export default OrderDetail;