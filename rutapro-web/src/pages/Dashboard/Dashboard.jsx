import {
  Package,
  Users,
  Truck,
  DollarSign,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">

          <h1>Bienvenido a RutaPro 👋</h1>

          <p className="dashboard-subtitle">
            Aquí tienes un resumen de la actividad de tu empresa.
          </p>

          <div className="stats-grid">

            <StatCard
              title="Pedidos de hoy"
              value="18"
              color="#2563eb"
              icon={<Package size={28} />}
            />

            <StatCard
              title="Clientes activos"
              value="246"
              color="#10b981"
              icon={<Users size={28} />}
            />

            <StatCard
              title="Entregas pendientes"
              value="12"
              color="#f59e0b"
              icon={<Truck size={28} />}
            />

            <StatCard
              title="Ventas del día"
              value="$8.450.000"
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