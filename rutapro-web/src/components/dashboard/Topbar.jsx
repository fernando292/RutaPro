import {
  Bell,
  Search,
  UserCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./Topbar.css";

function Topbar() {
  const { user } = useAuth();

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

        <button className="notification-button">
          <Bell size={22} />
        </button>

        <div className="user-info">

          <UserCircle size={36} />

          <div>
            <p className="user-name">
              {user?.email || "Usuario"}
            </p>

            <span>Administrador</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;