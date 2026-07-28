import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import {
  getCompany,
  addCompany,
  updateCompany
} from "../../services/companies/companyService";


import "./Settings.css";



function Settings() {


  const [companyId, setCompanyId] = useState(null);


  const [loading, setLoading] = useState(false);



  const [form, setForm] = useState({

    name: "",
    nit: "",
    phone: "",
    address: "",
    email: "",

  });





  useEffect(() => {

    loadCompany();

  }, []);





  const loadCompany = async () => {


    const data = await getCompany();



    if(data){


      setCompanyId(data.id);


      setForm({

        name: data.name || "",
        nit: data.nit || "",
        phone: data.phone || "",
        address: data.address || "",
        email: data.email || "",

      });


    }


  };





  const handleChange = (e) => {


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  };





  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      setLoading(true);



      if(companyId){


        await updateCompany(

          companyId,

          form

        );


      } else {


        await addCompany(

          form

        );


      }



      alert(
        "Configuración guardada correctamente"
      );



      await loadCompany();



    } catch(error){


      console.error(

        "Error guardando empresa:",

        error

      );


    } finally {


      setLoading(false);


    }


  };





  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Topbar />



        <main className="settings-page">


          <h1>
            Configuración
          </h1>


          <p>
            Administra la información de tu empresa.
          </p>




          <form

            className="settings-form"

            onSubmit={handleSubmit}

          >


            <input

              name="name"

              placeholder="Nombre empresa"

              value={form.name}

              onChange={handleChange}

              required

            />



            <input

              name="nit"

              placeholder="NIT"

              value={form.nit}

              onChange={handleChange}

            />



            <input

              name="phone"

              placeholder="Teléfono"

              value={form.phone}

              onChange={handleChange}

            />



            <input

              name="address"

              placeholder="Dirección"

              value={form.address}

              onChange={handleChange}

            />



            <input

              name="email"

              placeholder="Correo"

              value={form.email}

              onChange={handleChange}

            />




            <button

              type="submit"

              disabled={loading}

            >

              {
                loading
                ? "Guardando..."
                : "Guardar configuración"
              }


            </button>



          </form>



        </main>


      </div>


    </div>

  );

}


export default Settings;