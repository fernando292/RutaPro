import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../services/auth/authService";

import "./Sidebar.css";


function Sidebar() {


  const navigate = useNavigate();




  const handleLogout = async () => {


    try {


      await logout();

      navigate("/login");


    } catch(error) {


      console.error(error);


    }


  };






  return (

    <aside className="sidebar">


      <div className="sidebar-logo">

        <h2>
          Ruta<span>Pro</span>
        </h2>

      </div>






      <nav className="sidebar-menu">



        <NavLink to="/dashboard">

          📊 Dashboard

        </NavLink>




        <NavLink to="/clients">

          👥 Clientes

        </NavLink>




        <NavLink to="/orders">

          📦 Pedidos

        </NavLink>




        <NavLink to="/products">

          📋 Productos

        </NavLink>




        <NavLink to="/inventory">

          📦 Inventario

        </NavLink>

        <NavLink to="/drivers">

          🚚 Conductores

        </NavLink>

        <NavLink to="/vehicles">

          🚛 Vehículos

        </NavLink>

        <NavLink to="/routes">

         🗺️ Rutas

        </NavLink>

        <NavLink to="/map">

          🗺️ Mapa logístico

        </NavLink>



        <NavLink to="/reports">

          📈 Reportes

        </NavLink>




        <NavLink to="/settings">

          ⚙️ Configuración

        </NavLink>




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


export default Sidebar;