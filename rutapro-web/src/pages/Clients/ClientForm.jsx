import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  addClient,
  updateClient
} from "../../services/clients/clientService";

import { getCoordinates } from "../../services/maps/geocodingService";

import "./ClientForm.css";


function ClientForm({
  onSuccess,
  client
}) {


  const { profile } = useAuth();


  const [loading, setLoading] = useState(false);



  const [form, setForm] = useState({

    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    status: "Activo",

  });





  useEffect(() => {


    if (client) {


      setForm({

        name: client.name || "",
        phone: client.phone || "",
        email: client.email || "",
        address: client.address || "",
        city: client.city || "",
        status: client.status || "Activo",

      });



    } else {


      setForm({

        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        status: "Activo",

      });


    }


  }, [client]);






  const handleChange = (e) => {


    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });


  };








  const handleSubmit = async (e) => {


    e.preventDefault();



    if (loading) return;



    try {


      setLoading(true);



      if (client) {



        await updateClient(

          client.id,

          form

        );



      } else {



        let coordinates = {

          latitude: null,

          longitude: null

        };



        if (form.address) {



          const result = await getCoordinates(

            form.address,

            form.city

          );

          console.log(
            "DIRECCION ENVIADA AL MAPA:",
            `${form.address}, ${form.city}, Colombia`
          );



          console.log(

            "Resultado coordenadas:",

            result

          );



          if (result) {


            coordinates = result;


          }


        }






        await addClient(


          {


            ...form,


            latitude: coordinates.latitude,


            longitude: coordinates.longitude,


            createdAt: new Date(),


          },


          profile.companyId


        );



      }





      onSuccess();



    } catch(error) {


      console.error(

        "Error guardando cliente:",

        error

      );



    } finally {


      setLoading(false);


    }


  };









  return (


    <form

      className="client-form"

      onSubmit={handleSubmit}

    >



      <h2>


        {

          client

          ? "Editar cliente"

          : "Nuevo cliente"

        }


      </h2>







      <input

        name="name"

        placeholder="Nombre completo"

        value={form.name}

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

        name="email"

        type="email"

        placeholder="Correo electrónico"

        value={form.email}

        onChange={handleChange}

      />







      <input

        name="address"

        placeholder="Dirección"

        value={form.address}

        onChange={handleChange}

      />







      <input

        name="city"

        placeholder="Ciudad"

        value={form.city}

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

          : client

            ? "Actualizar cliente"

            : "Guardar cliente"

        }



      </button>






    </form>


  );

}


export default ClientForm;