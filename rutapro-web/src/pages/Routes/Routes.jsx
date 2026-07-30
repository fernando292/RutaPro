import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import Modal from "../../components/ui/Modal/Modal";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";

import RouteForm from "./RouteForm";

import { getRoutes } from "../../services/routes/routeService";

import { useAuth } from "../../context/AuthContext";

import "./Routes.css";

function Routes() {
  const { profile } = useAuth();

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    if (profile?.companyId) {
      loadRoutes();
    }
  }, [profile?.companyId]);

  const loadRoutes = async () => {
    try {
      const data = await getRoutes(profile.companyId);
      setRoutes(data);

    } catch (error) {
      console.error("Error cargando rutas:", error);

    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async () => {
    setOpenModal(false);
    setSelectedRoute(null);

    await loadRoutes();
  };

  const columns = [
    {
      key: "routeNumber",
      label: "Ruta",
    },
    {
      key: "driverName",
      label: "Conductor",
    },
    {
      key: "vehiclePlate",
      label: "Vehículo",
    },
    {
      key: "status",
      label: "Estado",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="routes-page">
          <div className="routes-header">
            <div>
              <h1>Rutas</h1>
              <p>Gestiona las rutas de distribución.</p>
            </div>

            <button
              className="add-route-button"
              onClick={() => {
                setSelectedRoute(null);
                setOpenModal(true);
              }}
            >
              + Nueva ruta
            </button>
          </div>

          {loading ? (
            <p>Cargando rutas...</p>
          ) : (
            <Table
              columns={columns}
              data={routes}
              actions={(route) => (
                <ButtonIcon
                  icon={<Pencil size={18} />}
                  type="edit"
                  title="Editar"
                  onClick={() => {
                    setSelectedRoute(route);
                    setOpenModal(true);
                  }}
                />
              )}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedRoute(null);
        }}
      >
        <RouteForm
          route={selectedRoute}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default Routes;