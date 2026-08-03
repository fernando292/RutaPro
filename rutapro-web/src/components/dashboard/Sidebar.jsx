import { memo, useMemo, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth/authService";

import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  const { profile, company } = useAuth();

  const role = profile?.role;

  const handleLogout = useCallback(async () => {

    try {

      await logout();

      navigate("/login");

    } catch (error) {

      console.error(
        "Error cerrando sesión:",
        error
      );

    }

  }, [navigate]);

  const brandName = useMemo(() => (

    company?.branding?.commercialName ||

    company?.name ||

    "RutaPro"

  ), [company]);

  const logo = useMemo(() => (

    company?.branding?.logo || ""

  ), [company]);

  const color = useMemo(() => (

    company?.branding?.primaryColor ||

    "#2563eb"

  ), [company]);

  const menuItems = useMemo(() => [

    {
      path: "/dashboard",
      label: "📊 Dashboard",
      roles: [
        "Administrador",
        "Vendedor",
        "Bodega",
        "Conductor"
      ]
    },

    {
      path: "/clients",
      label: "👥 Clientes",
      roles: [
        "Administrador",
        "Vendedor"
      ]
    },

    {
      path: "/orders",
      label: "📦 Pedidos",
      roles: [
        "Administrador",
        "Vendedor"
      ]
    },

    {
      path: "/products",
      label: "📋 Productos",
      roles: [
        "Administrador",
        "Bodega"
      ]
    },

    {
      path: "/inventory",
      label: "📦 Inventario",
      roles: [
        "Administrador",
        "Bodega"
      ]
    },

    {
      path: "/drivers",
      label: "🚚 Conductores",
      roles: [
        "Administrador"
      ]
    },

    {
      path: "/vehicles",
      label: "🚛 Vehículos",
      roles: [
        "Administrador"
      ]
    },

    {
      path: "/routes",
      label: "🗺️ Rutas",
      roles: [
        "Administrador",
        "Conductor"
      ]
    },

    {
      path: "/map",
      label: "🗺️ Mapa logístico",
      roles: [
        "Administrador",
        "Conductor"
      ]
    },

    {
      path: "/reports",
      label: "📈 Reportes",
      roles: [
        "Administrador"
      ]
    },

    {
      path: "/settings",
      label: "⚙️ Configuración",
      roles: [
        "Administrador"
      ]
    },

    {
      path: "/admin",
      label: "👤 Usuarios",
      roles: [
        "Administrador"
      ]
    }

  ], []);

  const visibleMenu = useMemo(() => (

    menuItems.filter(item =>
      item.roles.includes(role)
    )

  ), [menuItems, role]);

  return (

    <aside
      className="sidebar"
      style={{
        "--primary-color": color
      }}
    >

      <div className="sidebar-logo">

        {

          logo ? (

            <img
              src={logo}
              alt={brandName}
              className="company-logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

          ) : (

            <div className="company-letter">

              {brandName.charAt(0).toUpperCase()}

            </div>

          )

        }

        <h2>

          {brandName}

        </h2>

      </div>

      <nav className="sidebar-menu">

        {

          visibleMenu.map(item => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              {item.label}

            </NavLink>

          ))

        }

      </nav>

      <button
        className="logout-button"
        onClick={handleLogout}
      >

        Cerrar sesión

      </button>

    </aside>

  );

}

export default memo(Sidebar);