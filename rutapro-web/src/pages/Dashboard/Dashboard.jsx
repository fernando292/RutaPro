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


import { getOrders } from "../../services/orders/orderService";
import { getClients } from "../../services/clients/clientService";
import { useAuth } from "../../context/AuthContext";


import "./Dashboard.css";



function Dashboard() {


  const { profile } = useAuth();



  const [stats, setStats] = useState({

    todayOrders: 0,

    activeClients: 0,

    pendingDeliveries: 0,

    todaySales: 0

  });





  useEffect(() => {


    if(profile?.companyId){

      loadDashboard();

    }


  },[profile?.companyId]);






  const loadDashboard = async()=>{


    try{


      console.log(
        "Cargando dashboard empresa:",
        profile.companyId
      );



      const orders = await getOrders(
        profile.companyId
      );


      const clients = await getClients(
        profile.companyId
      );



      const today = new Date();



      const todayOrders = orders.filter(order=>{


        let orderDate;



        if(order.createdAt?.seconds){


          orderDate = new Date(
            order.createdAt.seconds * 1000
          );


        }

        else if(order.createdAt){


          orderDate = new Date(
            order.createdAt
          );


        }

        else{

          return false;

        }




        return (

          orderDate.getDate() === today.getDate()

          &&

          orderDate.getMonth() === today.getMonth()

          &&

          orderDate.getFullYear() === today.getFullYear()

        );


      });






      const pendingDeliveries = orders.filter(order=>


        order.status === "Pendiente"

        ||

        order.status === "Preparando"

        ||

        order.status === "En ruta"


      );






      const todaySales = todayOrders.reduce(

        (total,order)=>{


          return total + Number(
            order.total || 0
          );


        },

        0

      );






      setStats({


        todayOrders:
          todayOrders.length,


        activeClients:
          clients.length,


        pendingDeliveries:
          pendingDeliveries.length,


        todaySales


      });





    }catch(error){


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

icon={<Package size={28}/>}

/>




<StatCard

title="Clientes activos"

value={stats.activeClients}

icon={<Users size={28}/>}

/>





<StatCard

title="Entregas pendientes"

value={stats.pendingDeliveries}

icon={<Truck size={28}/>}

/>





<StatCard

title="Ventas del día"

value={`$${stats.todaySales.toLocaleString("es-CO")}`}

icon={<DollarSign size={28}/>}

/>




</div>



</main>


</div>


</div>


);


}



export default Dashboard;