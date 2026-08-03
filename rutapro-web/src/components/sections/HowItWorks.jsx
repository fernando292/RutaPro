import "./HowItWorks.css";


function HowItWorks() {


  const steps = [


    {
      number:"01",
      icon:"🏪",
      title:"Tus clientes realizan pedidos",
      description:
      "Las tiendas solicitan productos de forma rápida y organizada desde la plataforma."
    },


    {
      number:"02",
      icon:"📦",
      title:"Tu equipo administra la operación",
      description:
      "Gestiona pedidos, inventario y preparación de entregas desde un solo sistema."
    },


    {
      number:"03",
      icon:"🚚",
      title:"Realiza entregas eficientes",
      description:
      "Organiza rutas, controla estados y mejora los tiempos de distribución."
    }


  ];




  return (


    <section

      className="how-it-works"

    >




      <div className="how-header">



        <span>

          Cómo funciona RutaPro

        </span>




        <h2>

          Digitaliza tu proceso

          de distribución

        </h2>




        <p>

          Conecta clientes, pedidos,

          inventario y entregas en un flujo

          simple y eficiente.

        </p>



      </div>







      <div className="steps-container">


        {

          steps.map((step,index)=>(


            <div

              className="step-card"

              key={index}

            >




              <div className="step-number">

                {step.number}

              </div>





              <div className="step-icon">

                {step.icon}

              </div>





              <h3>

                {step.title}

              </h3>





              <p>

                {step.description}

              </p>



            </div>


          ))

        }



      </div>





    </section>


  );


}


export default HowItWorks;