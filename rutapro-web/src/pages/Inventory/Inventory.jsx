import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import { getProducts } from "../../services/productService";

import "./Inventory.css";


function Inventory() {

  const { profile } = useAuth();

  console.log("EMPRESA INVENTARIO:", profile);

  const [products, setProducts] = useState([]);


  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if (profile && profile.companyId) {
      loadInventory();

    } 

  }, [profile?.companyId]);




  const loadInventory = async () => {


    try {


      const data = await getProducts(
        profile.companyId
       );


      setProducts(data);



    } catch(error) {


      console.error(
        "Error cargando inventario:",
        error
      );


    } finally {


      setLoading(false);


    }


  };





  const getStockStatus = (stock) => {


    if (stock === 0) {


      return {
        text: "Agotado",
        className: "stock-danger"
      };


    }


    if (stock <= 10) {


      return {
        text: "Stock bajo",
        className: "stock-warning"
      };


    }



    return {

      text: "Disponible",

      className: "stock-success"

    };


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
                Inventario
              </h1>


              <p>
                Controla las existencias de tus productos.
              </p>


            </div>


          </div>





          {

            loading ? (

              <p>
                Cargando inventario...
              </p>


            ) : (


              <div className="inventory-table-container">


                <table className="inventory-table">


                  <thead>

                    <tr>

                      <th>
                        Producto
                      </th>


                      <th>
                        Categoría
                      </th>


                      <th>
                        Precio
                      </th>


                      <th>
                        Stock
                      </th>


                      <th>
                        Estado
                      </th>


                    </tr>


                  </thead>





                  <tbody>


                    {


                      products.map((product) => {


                        const status = getStockStatus(

                          Number(product.stock)

                        );



                        return (


                          <tr key={product.id}>


                            <td>
                              {product.name}
                            </td>


                            <td>
                              {product.category}
                            </td>


                            <td>

                              ${Number(product.price).toLocaleString("es-CO")}

                            </td>


                            <td>
                              {product.stock}
                            </td>


                            <td>

                              <span className={status.className}>

                                {status.text}

                              </span>


                            </td>


                          </tr>


                        );


                      })


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


export default Inventory;