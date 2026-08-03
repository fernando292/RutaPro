import "./Features.css";


function Features() {


  const features = [


    {
      icon:"📦",
      title:"Gestión de pedidos",
      description:
      "Administra pedidos, estados y seguimiento desde un panel centralizado."
    },


    {
      icon:"🏪",
      title:"Gestión de clientes",
      description:
      "Mantén organizada la información de tiendas y clientes comerciales."
    },


    {
      icon:"📊",
      title:"Reportes empresariales",
      description:
      "Obtén información clave sobre ventas, productos y rendimiento."
    },


    {
      icon:"📋",
      title:"Control de inventario",
      description:
      "Supervisa existencias y evita problemas de abastecimiento."
    },


    {
      icon:"🗺️",
      title:"Planificación de rutas",
      description:
      "Optimiza recorridos y mejora la eficiencia de las entregas."
    },


    {
      icon:"🔔",
      title:"Comunicación inteligente",
      description:
      "Mantén informados a clientes y equipos de distribución."
    }


  ];




  return (


    <section

      id="funciones"

      className="features"

    >



      <div className="features-header">


        <span>

          Funciones de RutaPro

        </span>




        <h2>

          Todas las herramientas

          para controlar tu operación

        </h2>




        <p>

          Una plataforma diseñada para empresas

          distribuidoras que buscan crecer y organizar

          su logística.

        </p>



      </div>






      <div className="features-grid">


        {

          features.map((feature,index)=>(


            <div

              className="feature-card"

              key={index}

            >



              <div className="feature-icon">

                {feature.icon}

              </div>




              <h3>

                {feature.title}

              </h3>




              <p>

                {feature.description}

              </p>



            </div>


          ))

        }


      </div>



    </section>


  );


}


export default Features;