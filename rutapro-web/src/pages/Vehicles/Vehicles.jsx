import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import Modal from "../../components/ui/Modal/Modal";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";

import VehicleForm from "./VehicleForm";

import { getVehicles } from "../../services/vehicles/vehicleService";

import { useAuth } from "../../context/AuthContext";

import "./Vehicles.css";

function Vehicles() {
  const { profile } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    if (profile?.companyId) {
      loadVehicles();
    }
  }, [profile?.companyId]);

  const loadVehicles = async () => {
    try {
      const data = await getVehicles(profile.companyId);
      setVehicles(data);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleSuccess = async () => {
    setOpenModal(false);
    setSelectedVehicle(null);
    await loadVehicles();
  };

  const columns = [
    {
      key: "plate",
      label: "Placa",
    },
    {
      key: "brand",
      label: "Marca",
    },
    {
      key: "model",
      label: "Modelo",
    },
    {
      key: "capacity",
      label: "Capacidad",
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

        <main className="vehicles-page">
          <div className="vehicles-header">
            <div>
              <h1>Vehículos</h1>
              <p>Gestiona los vehículos de tu empresa.</p>
            </div>

            <button
              className="add-vehicle-button"
              onClick={() => {
                setSelectedVehicle(null);
                setOpenModal(true);
              }}
            >
              + Nuevo vehículo
            </button>
          </div>

          {loading ? (
            <p>Cargando vehículos...</p>
          ) : (
            <Table
              columns={columns}
              data={vehicles}
              actions={(vehicle) => (
                <ButtonIcon
                  icon={<Pencil size={18} />}
                  type="edit"
                  title="Editar"
                  onClick={() => {
                    setSelectedVehicle(vehicle);
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
          setSelectedVehicle(null);
        }}
      >
        <VehicleForm
          vehicle={selectedVehicle}
          onSuccess={handleVehicleSuccess}
        />
      </Modal>
    </div>
  );
}

export default Vehicles;