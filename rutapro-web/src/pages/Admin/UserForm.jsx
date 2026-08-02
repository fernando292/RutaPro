import { useState } from "react";

import {
  createCompanyUser
} from "../../services/user/createUserService";

import "./UserForm.css";


function UserForm({

  companyId,

  onSuccess

}) {


  const [form,setForm] = useState({

    name:"",

    email:"",

    password:"",

    role:"Vendedor"

  });


  const [loading,setLoading] = useState(false);



  const handleChange = (e)=>{


    const {name,value}=e.target;


    setForm((prev)=>({

      ...prev,

      [name]:value

    }));

  };



  const handleSubmit = async(e)=>{


    e.preventDefault();


    setLoading(true);


    try{


      await createCompanyUser({

        ...form,

        companyId

      });


      onSuccess();


    }catch(error){


      console.error(

        "Error creando usuario:",

        error

      );


      alert(error.message);


    }finally{


      setLoading(false);


    }


  };



  return (

    <form

      className="user-form"

      onSubmit={handleSubmit}

    >


      <h2>

        Nuevo usuario

      </h2>



      <input

        name="name"

        placeholder="Nombre completo"

        value={form.name}

        onChange={handleChange}

        required

      />



      <input

        name="email"

        type="email"

        placeholder="Correo electrónico"

        value={form.email}

        onChange={handleChange}

        required

      />



      <input

        name="password"

        type="password"

        placeholder="Contraseña"

        value={form.password}

        onChange={handleChange}

        required

      />



      <select

        name="role"

        value={form.role}

        onChange={handleChange}

      >

        <option value="Administrador">

          Administrador

        </option>


        <option value="Vendedor">

          Vendedor

        </option>


        <option value="Bodega">

          Bodega

        </option>


        <option value="Conductor">

          Conductor

        </option>


      </select>



      <button

        disabled={loading}

      >

        {

          loading

          ? "Creando..."

          : "Crear usuario"

        }

      </button>



    </form>

  );

}


export default UserForm;