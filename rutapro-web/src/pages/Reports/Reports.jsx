import { useEffect, useState } from "react";

import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";


import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import Table from "../../components/ui/Table/Table";


import { getOrders } from "../../services/orderService";
import { getClients } from "../../services/clientService";
import { getProducts } from "../../services/productService";


import "./Reports.css";



function Reports() {


  const [stats, setStats] = useState({

    sales: 0,

    orders: 0,

    clients: 0,

    products: 0,

  });



  const [orders, setOrders] = useState([]);




  useEffect(() => {

    loadReports();

  }, []);





  const loadReports = async () => {


    try {


      const ordersData = await getOrders();

      const clientsData = await getClients();

      const productsData = await getProducts();




      const totalSales = ordersData.reduce(

        (total, order) =>

          total + Number(order.total || 0),

        0

      );





      setStats({

        sales: totalSales,

        orders: ordersData.length,

        clients: clientsData.length,

        products: productsData.length,

      });





      setOrders(ordersData.slice(0,5));



    } catch(error) {


      console.error(

        "Error cargando reportes:",

        error

      );


    }


  };





  const columns = [


    {
      key:"orderNumber",
      label:"Pedido"
    },


    {
      key:"clientName",
      label:"Cliente"
    },


    {
      key:"status",
      label:"Estado"
    },


    {
      key:"total",
      label:"Total"
    }


  ];





  return (

    <div className="dashboard-layout">


      <Sidebar />



      <div className="dashboard-main">


        <Topbar />



        <main className="reports-page">


          <h1>
            Reportes
          </h1>


          <p className="reports-subtitle">

            Resumen general de la actividad de tu empresa.

          </p>





          <div className="stats-grid">



            <StatCard

              title="Ventas totales"

              value={`$${stats.sales.toLocaleString("es-CO")}`}

              color="#8b5cf6"

              icon={<DollarSign size={28}/>}

            />




            <StatCard

              title="Pedidos realizados"

              value={stats.orders}

              color="#2563eb"

              icon={<ShoppingCart size={28}/>}

            />




            <StatCard

              title="Clientes registrados"

              value={stats.clients}

              color="#10b981"

              icon={<Users size={28}/>}

            />




            <StatCard

              title="Productos registrados"

              value={stats.products}

              color="#f59e0b"

              icon={<Package size={28}/>}

            />



          </div>





          <section className="reports-table">


            <h2>
              Últimos pedidos
            </h2>



            <Table

              columns={columns}

              data={orders}

            />



          </section>





        </main>


      </div>


    </div>


  );

}


export default Reports;