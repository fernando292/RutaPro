import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>
          Ruta<span>Pro</span>
        </h2>

        <nav>
          <a href="#">📊 Dashboard</a>
          <a href="#">📦 Pedidos</a>
          <a href="#">🏪 Clientes</a>
          <a href="#">📋 Productos</a>
          <a href="#">🚚 Rutas</a>
          <a href="#">📈 Reportes</a>
          <a href="#">⚙️ Configuración</a>
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="content">
        <h1>Bienvenido a RutaPro</h1>

        <p>Ya tienes autenticación con Firebase funcionando.</p>
      </main>
    </div>
  );
}

export default Dashboard;