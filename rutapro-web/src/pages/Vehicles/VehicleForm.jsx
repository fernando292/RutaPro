import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  addVehicle,
  updateVehicle
} from "../../services/vehicles/vehicleService";

import "./VehicleForm.css";

function VehicleForm({

  vehicle,

  onSuccess

}) {

  const { profile } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    plate: "",

    brand: "",

    model: "",

    year: "",

    capacity: "",

    driverId: "",

    driverName: "",

    status: "Activo"

  });

  useEffect(() => {

    if (vehicle) {

      setForm({

        plate: vehicle.plate || "",

        brand: vehicle.brand || "",

        model: vehicle.model || "",

        year: vehicle.year || "",

        capacity: vehicle.capacity || "",

        driverId: vehicle.driverId || "",

        driverName: vehicle.driverName || "",

        status: vehicle.status || "Activo"

      });

    }

  }, [vehicle]);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    try {

      setLoading(true);

      if (vehicle) {

        await updateVehicle(

          vehicle.id,

          form

        );

      } else {

        await addVehicle(

          {

            ...form,

            createdAt: new Date()

          },

          profile.companyId

        );

      }

      onSuccess();

    } catch (error) {

      console.error(

        "Error guardando vehículo:",

        error

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form

      className="vehicle-form"

      onSubmit={handleSubmit}

    >

      <h2>

        {

          vehicle

            ? "Editar vehículo"

            : "Nuevo vehículo"

        }

      </h2>

      <input
        name="plate"
        placeholder="Placa"
        value={form.plate}
        onChange={handleChange}
        required
      />

      <input
        name="brand"
        placeholder="Marca"
        value={form.brand}
        onChange={handleChange}
        required
      />

      <input
        name="model"
        placeholder="Modelo"
        value={form.model}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Año"
        value={form.year}
        onChange={handleChange}
      />

      <input
        type="number"
        name="capacity"
        placeholder="Capacidad (kg)"
        value={form.capacity}
        onChange={handleChange}
      />

      <select

        name="status"

        value={form.status}

        onChange={handleChange}

      >

        <option value="Activo">

          Activo

        </option>

        <option value="Inactivo">

          Inactivo

        </option>

      </select>

      <button

        type="submit"

        disabled={loading}

      >

        {

          loading

            ? "Guardando..."

            : vehicle

              ? "Actualizar vehículo"

              : "Guardar vehículo"

        }

      </button>

    </form>

  );

}

export default VehicleForm;