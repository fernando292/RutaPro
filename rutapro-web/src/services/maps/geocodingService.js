export const getCoordinates = async (address, city) => {

  try {


    const query = `${address}, ${city}, Antioquia, Colombia`;



    console.log(
      "BUSCANDO:",
      query
    );



    const response = await fetch(

      `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=co&q=${encodeURIComponent(query)}`

    );



    const data = await response.json();



    console.log(
      "RESPUESTA NOMINATIM:",
      data
    );



    if (!data.length) {


      return null;


    }



    return {


      latitude: Number(data[0].lat),


      longitude: Number(data[0].lon)


    };



  } catch(error) {


    console.error(

      "Error obteniendo coordenadas:",

      error

    );


    return null;


  }

};