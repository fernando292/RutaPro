import "./Benefits.css";


function Benefits() {


  const benefits = [

    {
      icon:"📦",
      title:"Gestión inteligente de pedidos",
      description:
      "Recibe, organiza y controla pedidos de tus clientes desde una sola plataforma."
    },


    {
      icon:"🏪",
      title:"Clientes centralizados",
      description:
      "Administra tiendas, información comercial e historial de pedidos fácilmente."
    },


    {
      icon:"📊",
      title:"Información para decidir",
      description:
      "Visualiza ventas, inventario y comportamiento de tu operación en tiempo real."
    },


    {
      icon:"🚚",
      title:"Distribución optimizada",
      description:
      "Planea rutas de entrega y mejora los tiempos de operación logística."
    }

  ];



  return (


    <section

      id="soluciones"

      className="benefits"

    >



      <div className="benefits-header">


        <span>

          Soluciones empresariales

        </span>



        <h2>

          Todo tu negocio logístico

          en una sola plataforma

        </h2>



        <p>

          RutaPro conecta pedidos, clientes,

          inventario y distribución para ayudarte

          a operar de forma más eficiente.

        </p>


      </div>





      <div className="benefits-grid">


        {

          benefits.map((item,index)=>(


            <div

              className="benefit-card"

              key={index}

            >



              <div className="benefit-icon">

                {item.icon}

              </div>




              <h3>

                {item.title}

              </h3>




              <p>

                {item.description}

              </p>



            </div>


          ))

        }


      </div>



    </section>


  );


}


export default Benefits;