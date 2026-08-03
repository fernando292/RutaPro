import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerCompany } from "../../services/register/registerService";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

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

    const {
      name,
      value
    } = e.target;


    setForm((prev)=>({

      ...prev,

      [name]: value

    }));

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();


    if(
      !form.companyName ||
      !form.phone ||
      !form.adminName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ){

      alert("Completa todos los campos.");

      return;

    }



    if(form.password !== form.confirmPassword){

      alert("Las contraseñas no coinciden.");

      return;

    }



    try{

      setLoading(true);


      await registerCompany(form);


      // Firebase actualizará AuthContext automáticamente
      // No hacemos navigate aquí


    }catch(error){

      console.error(
        "Error registrando empresa:",
        error
      );


      alert(error.message);


    }finally{

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


          <Input

            type="text"

            name="companyName"

            placeholder="Nombre de la empresa"

            value={form.companyName}

            onChange={handleChange}

            required

          />



          <Input

            type="tel"

            name="phone"

            placeholder="Teléfono"

            value={form.phone}

            onChange={handleChange}

            required

          />



          <Input

            type="text"

            name="adminName"

            placeholder="Nombre del administrador"

            value={form.adminName}

            onChange={handleChange}

            required

          />



          <Input

            type="email"

            name="email"

            placeholder="Correo electrónico"

            value={form.email}

            onChange={handleChange}

            required

          />



          <Input

            type="password"

            name="password"

            placeholder="Contraseña"

            value={form.password}

            onChange={handleChange}

            required

          />



          <Input

            type="password"

            name="confirmPassword"

            placeholder="Confirmar contraseña"

            value={form.confirmPassword}

            onChange={handleChange}

            required

          />



          <Button

            type="submit"

            loading={loading}

          >

            Crear cuenta

          </Button>


        </form>




        <p className="register-login">


          ¿Ya tienes cuenta?


          <span

            onClick={()=>navigate("/login")}

          >

            Inicia sesión

          </span>


        </p>


      </div>


    </div>

  );

}


export default Register;