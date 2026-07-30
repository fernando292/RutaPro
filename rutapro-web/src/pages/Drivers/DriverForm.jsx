import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  addDriver,
  updateDriver
} from "../../services/drivers/driverService";

import "./DriverForm.css";

function DriverForm({

  onSuccess,

  driver

}) {

  const { profile } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    fullName: "",

    document: "",

    phone: "",

    licenseNumber: "",

    licenseCategory: "B1",

    licenseExpiration: "",

    status: "Activo"

  });

  useEffect(() => {

    if (driver) {

      setForm({

        fullName: driver.fullName || "",

        document: driver.document || "",

        phone: driver.phone || "",

        licenseNumber: driver.licenseNumber || "",

        licenseCategory: driver.licenseCategory || "B1",

        licenseExpiration: driver.licenseExpiration || "",

        status: driver.status || "Activo"

      });

    }

  }, [driver]);

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

      if (driver) {

        await updateDriver(

          driver.id,

          form

        );

      } else {

        await addDriver(

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

        "Error guardando conductor:",

        error

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form

      className="driver-form"

      onSubmit={handleSubmit}

    >

      <h2>

        {

          driver

            ? "Editar conductor"

            : "Nuevo conductor"

        }

      </h2>

      <input
        name="fullName"
        placeholder="Nombre completo"
        value={form.fullName}
        onChange={handleChange}
        required
      />

      <input
        name="document"
        placeholder="Documento"
        value={form.document}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        name="licenseNumber"
        placeholder="Número de licencia"
        value={form.licenseNumber}
        onChange={handleChange}
        required
      />

      <select
        name="licenseCategory"
        value={form.licenseCategory}
        onChange={handleChange}
      >

        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="B3">B3</option>
        <option value="C1">C1</option>
        <option value="C2">C2</option>
        <option value="C3">C3</option>

      </select>

      <input
        type="date"
        name="licenseExpiration"
        value={form.licenseExpiration}
        onChange={handleChange}
        required
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

            : driver

              ? "Actualizar conductor"

              : "Guardar conductor"

        }

      </button>

    </form>

  );

}

export default DriverForm;