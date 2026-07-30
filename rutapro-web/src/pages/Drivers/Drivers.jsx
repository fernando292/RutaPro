import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import Modal from "../../components/ui/Modal/Modal";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";

import DriverForm from "./DriverForm";

import { getDrivers } from "../../services/drivers/driverService";

import { useAuth } from "../../context/AuthContext";

import "./Drivers.css";

function Drivers() {
  const { profile } = useAuth();

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    if (profile?.companyId) {
      loadDrivers();
    }
  }, [profile?.companyId]);

  const loadDrivers = async () => {
    try {
      const data = await getDrivers(profile.companyId);
      setDrivers(data);
    } catch (error) {
      console.error("Error cargando conductores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDriverSuccess = async () => {
    setOpenModal(false);
    setSelectedDriver(null);
    await loadDrivers();
  };

  const columns = [
    {
      key: "fullName",
      label: "Conductor",
    },
    {
      key: "document",
      label: "Documento",
    },
    {
      key: "phone",
      label: "Teléfono",
    },
    {
      key: "licenseCategory",
      label: "Categoría",
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

        <main className="drivers-page">
          <div className="drivers-header">
            <div>
              <h1>Conductores</h1>
              <p>Gestiona los conductores de tu empresa.</p>
            </div>

            <button
              className="add-driver-button"
              onClick={() => {
                setSelectedDriver(null);
                setOpenModal(true);
              }}
            >
              + Nuevo conductor
            </button>
          </div>

          {loading ? (
            <p>Cargando conductores...</p>
          ) : (
            <Table
              columns={columns}
              data={drivers}
              actions={(driver) => (
                <ButtonIcon
                  icon={<Pencil size={18} />}
                  type="edit"
                  title="Editar"
                  onClick={() => {
                    setSelectedDriver(driver);
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
          setSelectedDriver(null);
        }}
      >
        <DriverForm
          driver={selectedDriver}
          onSuccess={handleDriverSuccess}
        />
      </Modal>
    </div>
  );
}

export default Drivers;