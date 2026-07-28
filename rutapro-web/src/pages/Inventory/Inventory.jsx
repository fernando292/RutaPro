import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import {
  getInventoryMovements
} from "../../services/inventory/inventoryService";

import "./Inventory.css";



function InventoryMovements() {


  const { profile } = useAuth();


  const [movements, setMovements] = useState([]);


  const [loading, setLoading] = useState(true);





  useEffect(() => {


    if (profile?.companyId) {

      loadMovements();

    }


  }, [profile?.companyId]);






  const loadMovements = async () => {


    try {


      const data = await getInventoryMovements(

        profile.companyId

      );


      setMovements(data);


    } catch (error) {


      console.error(

        "Error cargando movimientos:",

        error

      );


    } finally {


      setLoading(false);


    }


  };






  const formatDate = (timestamp) => {


    if (!timestamp?.seconds) {

      return "Sin fecha";

    }


    return new Date(

      timestamp.seconds * 1000

    ).toLocaleDateString("es-CO");

  };








  return (


    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Topbar />


        <main className="inventory-page">


          <div className="inventory-header">


            <div>

              <h1>

                Movimientos de Inventario

              </h1>


              <p>

                Historial de entradas y salidas de productos.

              </p>

            </div>


          </div>





          {

            loading ? (

              <p>

                Cargando movimientos...

              </p>

            ) : (

              <div className="inventory-table-container">


                <table className="inventory-table">


                  <thead>


                    <tr>

                      <th>

                        Fecha

                      </th>


                      <th>

                        Producto

                      </th>


                      <th>

                        Tipo

                      </th>


                      <th>

                        Cantidad

                      </th>


                      <th>

                        Stock anterior

                      </th>


                      <th>

                        Stock nuevo

                      </th>


                      <th>

                        Motivo

                      </th>


                    </tr>


                  </thead>


                  <tbody>


                    {

                      movements.length === 0 ? (

                        <tr>

                          <td colSpan="7">

                            No hay movimientos registrados.

                          </td>

                        </tr>

                      ) : (

                        movements.map((movement) => (

                          <tr key={movement.id}>


                            <td>

                              {formatDate(

                                movement.createdAt

                              )}

                            </td>


                            <td>

                              {movement.productName}

                            </td>


                            <td>

                              <span

                                className={

                                  movement.type === "ENTRADA"

                                    ? "stock-success"

                                    : "stock-danger"

                                }

                              >

                                {

                                  movement.type === "ENTRADA"

                                    ? "Entrada"

                                    : "Salida"

                                }

                              </span>

                            </td>


                            <td>

                              {movement.quantity}

                            </td>


                            <td>

                              {movement.previousStock}

                            </td>


                            <td>

                              {movement.newStock}

                            </td>


                            <td>

                              {movement.reason}

                            </td>


                          </tr>

                        ))

                      )

                    }


                  </tbody>


                </table>


              </div>

            )

          }


        </main>


      </div>


    </div>

  );

}


export default InventoryMovements;