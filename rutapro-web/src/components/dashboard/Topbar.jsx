import { useState } from "react";

import {
  Search,
  UserCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import NotificationBell from "./notifications/NotificationBell";
import NotificationPanel from "./notifications/NotificationPanel";

import "./Topbar.css";

function Topbar() {

  const { user } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [

    {

      title: "Stock bajo",

      message: "Hay productos con menos de 10 unidades."

    },

    {

      title: "Nuevo pedido",

      message: "Se registró un nuevo pedido."

    },

    {

      title: "Ruta creada",

      message: "Hay una nueva ruta pendiente de despacho."

    }

  ];

  return (

    <header className="topbar">

      <div className="topbar-search">

        <Search size={20} />

        <input
          type="text"
          placeholder="Buscar..."
        />

      </div>

      <div className="topbar-right">

        <div
          style={{
            position: "relative"
          }}
        >

          <NotificationBell

            count={notifications.length}

            onClick={() =>

              setShowNotifications(

                !showNotifications

              )

            }

          />

          {

            showNotifications && (

              <NotificationPanel

                notifications={notifications}

              />

            )

          }

        </div>

        <div className="user-info">

          <UserCircle size={36} />

          <div>

            <p className="user-name">

              {user?.email || "Usuario"}

            </p>

            <span>

              Administrador

            </span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Topbar;