import "./OrderDetail.css";


function OrderDetail({ order }) {


  if (!order) return null;



  return (


    <div className="order-detail">



      <h2>
        Pedido #{String(order.orderNumber).padStart(4, "0")}
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


        <p>
          <strong>Estado:</strong>{" "}
          {order.status}
        </p>


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




    </div>


  );

}



export default OrderDetail;