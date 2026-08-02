import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerCompany } from "../../services/register/registerService";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    companyName: "",

    phone: "",

    adminName: "",

    email: "",

    password: "",

    confirmPassword: ""

  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value

    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !form.companyName ||

      !form.phone ||

      !form.adminName ||

      !form.email ||

      !form.password ||

      !form.confirmPassword

    ) {

      alert("Completa todos los campos.");

      return;

    }

    if (form.password !== form.confirmPassword) {

      alert("Las contraseñas no coinciden.");

      return;

    }

    setLoading(true);

    try {

      await registerCompany(form);

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>

          Crear empresa

        </h1>

        <p>

          Crea tu empresa y comienza a usar RutaPro.

        </p>

        <form

          className="register-form"

          onSubmit={handleSubmit}

        >

          <input

            type="text"

            name="companyName"

            placeholder="Nombre de la empresa"

            value={form.companyName}

            onChange={handleChange}

            required

          />

          <input

            type="tel"

            name="phone"

            placeholder="Teléfono"

            value={form.phone}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="adminName"

            placeholder="Nombre del administrador"

            value={form.adminName}

            onChange={handleChange}

            required

          />

          <input

            type="email"

            name="email"

            placeholder="Correo electrónico"

            value={form.email}

            onChange={handleChange}

            required

          />

          <input

            type="password"

            name="password"

            placeholder="Contraseña"

            value={form.password}

            onChange={handleChange}

            required

          />

          <input

            type="password"

            name="confirmPassword"

            placeholder="Confirmar contraseña"

            value={form.confirmPassword}

            onChange={handleChange}

            required

          />

          <button

            type="submit"

            disabled={loading}

          >

            {

              loading

                ? "Creando empresa..."

                : "Crear cuenta"

            }

          </button>

        </form>

        <p>

          ¿Ya tienes cuenta?

          <span

            onClick={() => navigate("/login")}

            style={{

              cursor: "pointer",

              color: "#2563EB",

              fontWeight: "600",

              marginLeft: "6px"

            }}

          >

            Inicia sesión

          </span>

        </p>

      </div>

    </div>

  );

}

export default Register;