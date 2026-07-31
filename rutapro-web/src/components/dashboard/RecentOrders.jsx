import "./RecentOrders.css";

function RecentOrders({ orders = [] }) {

  return (

    <div className="recent-orders-card">

      <div className="recent-orders-header">

        <h3>

          Últimos pedidos

        </h3>

        <span>

          Últimos 5 registrados

        </span>

      </div>

      <div className="recent-orders-table">

        <table>

          <thead>

            <tr>

              <th>Pedido</th>

              <th>Cliente</th>

              <th>Estado</th>

              <th>Total</th>

            </tr>

          </thead>

          <tbody>

            {

              orders.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="empty-row"
                  >

                    No hay pedidos registrados.

                  </td>

                </tr>

              ) : (

                orders.map((order) => (

                  <tr key={order.id}>

                    <td>

                      {order.orderNumber}

                    </td>

                    <td>

                      {order.clientName}

                    </td>

                    <td>

                      <span className="status">

                        {order.status}

                      </span>

                    </td>

                    <td>

                      ${Number(order.total || 0).toLocaleString("es-CO")}

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default RecentOrders;