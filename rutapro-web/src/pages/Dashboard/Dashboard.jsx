import { useEffect, useState } from "react";

import {
  Package,
  Users,
  Truck,
  DollarSign,
} from "lucide-react";


import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";


import { getOrders } from "../../services/orderService";
import { getClients } from "../../services/clientService";


import "./Dashboard.css";



function Dashboard() {


  const [stats, setStats] = useState({

    todayOrders: 0,

    activeClients: 0,

    pendingDeliveries: 0,

    todaySales: 0

  });



  useEffect(() => {

    loadDashboard();

  }, []);





  const loadDashboard = async () => {


    try {


      const orders = await getOrders();

      const clients = await getClients();



      const today = new Date();



      const todayOrders = orders.filter((order) => {


        if (!order.createdAt?.seconds) return false;


        const orderDate = new Date(

          order.createdAt.seconds * 1000

        );


        return (

          orderDate.getDate() === today.getDate() &&

          orderDate.getMonth() === today.getMonth() &&

          orderDate.getFullYear() === today.getFullYear()

        );


      });






      const pendingDeliveries = orders.filter((order) =>

        order.status === "Pendiente" ||

        order.status === "Preparando" ||

        order.status === "En ruta"

      );





      const todaySales = todayOrders.reduce(

        (total, order) =>

          total + Number(order.total || 0),

        0

      );





      setStats({


        todayOrders: todayOrders.length,


        activeClients: clients.length,


        pendingDeliveries: pendingDeliveries.length,


        todaySales


      });





    } catch(error) {


      console.error(

        "Error cargando dashboard:",

        error

      );


    }


  };






  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Topbar />


        <main className="dashboard-content">


          <h1>
            Bienvenido a RutaPro 👋
          </h1>



          <p className="dashboard-subtitle">

            Aquí tienes un resumen de la actividad de tu empresa.

          </p>





          <div className="stats-grid">



            <StatCard

              title="Pedidos de hoy"

              value={stats.todayOrders}

              color="#2563eb"

              icon={<Package size={28} />}

            />





            <StatCard

              title="Clientes activos"

              value={stats.activeClients}

              color="#10b981"

              icon={<Users size={28} />}

            />





            <StatCard

              title="Entregas pendientes"

              value={stats.pendingDeliveries}

              color="#f59e0b"

              icon={<Truck size={28} />}

            />





            <StatCard

              title="Ventas del día"

              value={`$${stats.todaySales.toLocaleString("es-CO")}`}

              color="#8b5cf6"

              icon={<DollarSign size={28} />}

            />




          </div>



        </main>


      </div>


    </div>


  );

}


export default Dashboard;