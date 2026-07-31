import { useEffect, useState } from "react";

import {
  Package,
  Users,
  Truck,
  DollarSign,
  Boxes,
  Route,
  Car,
  UserRound
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/dashboard/dashboardService";

import "./Dashboard.css";

function Dashboard() {

  const { profile } = useAuth();

  const [stats, setStats] = useState({

    todayOrders: 0,

    activeClients: 0,

    pendingDeliveries: 0,

    todaySales: 0,

    totalProducts: 0,

    totalRoutes: 0,

    totalDrivers: 0,

    totalVehicles: 0

  });

  useEffect(() => {

    if (profile?.companyId) {

      loadDashboard();

    }

  }, [profile?.companyId]);

  const loadDashboard = async () => {

    try {

      const dashboardStats = await getDashboardStats(
        profile.companyId
      );

      setStats(dashboardStats);

    } catch (error) {

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
              icon={<Package size={28} />}
            />

            <StatCard
              title="Clientes activos"
              value={stats.activeClients}
              icon={<Users size={28} />}
            />

            <StatCard
              title="Entregas pendientes"
              value={stats.pendingDeliveries}
              icon={<Truck size={28} />}
            />

            <StatCard
              title="Ventas del día"
              value={`$${stats.todaySales.toLocaleString("es-CO")}`}
              icon={<DollarSign size={28} />}
            />

            <StatCard
              title="Productos"
              value={stats.totalProducts}
              icon={<Boxes size={28} />}
            />

            <StatCard
              title="Rutas"
              value={stats.totalRoutes}
              icon={<Route size={28} />}
            />

            <StatCard
              title="Vehículos"
              value={stats.totalVehicles}
              icon={<Car size={28} />}
            />

            <StatCard
              title="Conductores"
              value={stats.totalDrivers}
              icon={<UserRound size={28} />}
            />

          </div>

        </main>

      </div>

    </div>

  );

}

export default Dashboard;