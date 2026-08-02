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

    name:"",
    nit:"",
    phone:"",
    address:"",
    email:"",


    settings:{


      currency:"COP",

      minimumStock:10,

      operationZone:"Colombia"


    },


    branding:{


      commercialName:"",

      primaryColor:"#2563eb",

      logo:""


    }


  });






  useEffect(()=>{

    loadCompany();

  },[]);








  const loadCompany = async()=>{


    try{


      const data = await getCompany();



      if(data){


        setCompanyId(data.id);



        setForm({


          name:data.name || "",

          nit:data.nit || "",

          phone:data.phone || "",

          address:data.address || "",

          email:data.email || "",




          settings:{


            currency:

            data.settings?.currency || "COP",


            minimumStock:

            data.settings?.minimumStock || 10,


            operationZone:

            data.settings?.operationZone || "Colombia"


          },




          branding:{


            commercialName:

            data.branding?.commercialName || "",


            primaryColor:

            data.branding?.primaryColor || "#2563eb",


            logo:

            data.branding?.logo || ""


          }



        });


      }



    }catch(error){


      console.error(

        "Error cargando configuración",

        error

      );


    }


  };









  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:e.target.value

    });


  };








  const handleNestedChange=(section,e)=>{


    setForm({


      ...form,


      [section]:{


        ...form[section],


        [e.target.name]:e.target.value


      }


    });


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();



    try{


      setLoading(true);



      if(companyId){


        await updateCompany(

          companyId,

          form

        );


      }else{


        await addCompany(

          form

        );


      }




      alert(

        "Configuración guardada correctamente"

      );



      await loadCompany();



    }catch(error){


      console.error(

        "Error guardando configuración",

        error

      );


    }finally{


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

            Administra la información y preferencias de tu empresa.

          </p>





          <div className="settings-container">


            <div className="settings-card">



              <form

                className="settings-form"

                onSubmit={handleSubmit}

              >





                <h2>

                  🏢 Información de empresa

                </h2>



                <input

                  name="name"

                  placeholder="Nombre empresa"

                  value={form.name}

                  onChange={handleChange}

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







                <h2>

                  ⚙️ Configuración operativa

                </h2>



                <input

                  name="currency"

                  placeholder="Moneda"

                  value={form.settings.currency}

                  onChange={(e)=>

                    handleNestedChange(

                      "settings",

                      e

                    )

                  }

                />



                <input

                  name="minimumStock"

                  type="number"

                  placeholder="Stock mínimo"

                  value={form.settings.minimumStock}

                  onChange={(e)=>

                    handleNestedChange(

                      "settings",

                      e

                    )

                  }

                />



                <input

                  name="operationZone"

                  placeholder="Zona operación"

                  value={form.settings.operationZone}

                  onChange={(e)=>

                    handleNestedChange(

                      "settings",

                      e

                    )

                  }

                />








                <h2>

                  🎨 Personalización

                </h2>



                <input

                  name="commercialName"

                  placeholder="Nombre comercial"

                  value={form.branding.commercialName}

                  onChange={(e)=>

                    handleNestedChange(

                      "branding",

                      e

                    )

                  }

                />




                <label>

                  Color principal

                </label>



                <input

                  type="color"

                  name="primaryColor"

                  value={form.branding.primaryColor}

                  onChange={(e)=>

                    handleNestedChange(

                      "branding",

                      e

                    )

                  }

                />





                <input

                  name="logo"

                  placeholder="URL del logo"

                  value={form.branding.logo}

                  onChange={(e)=>

                    handleNestedChange(

                      "branding",

                      e

                    )

                  }

                />






                <button

                  type="submit"

                  disabled={loading}

                >

                  {

                    loading

                    ? "Guardando..."

                    : "Guardar cambios"

                  }

                </button>



              </form>



            </div>



          </div>



        </main>



      </div>



    </div>


  );


}


export default Settings;