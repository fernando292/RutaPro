import "./HowItWorks.css";

function HowItWorks() {

  const steps = [
    {
      number: "01",
      icon: "🏪",
      title: "La tienda realiza su pedido",
      description:
        "Las tiendas pueden solicitar productos fácilmente desde la plataforma."
    },
    {
      number: "02",
      icon: "📦",
      title: "El distribuidor gestiona",
      description:
        "El administrador recibe pedidos, organiza inventario y prepara entregas."
    },
    {
      number: "03",
      icon: "🚚",
      title: "Entrega inteligente",
      description:
        "Los repartidores siguen rutas organizadas y actualizan el estado del pedido."
    }
  ];


  return (
    <section 

      id="funciones"
      className="how-it-works"
      
    >

      <div className="how-header">

        <span>
          Cómo funciona
        </span>

        <h2>
          Todo el proceso
          en un solo lugar
        </h2>

        <p>
          RutaPro conecta tiendas,
          distribuidores y repartidores
          para hacer la distribución más eficiente.
        </p>

      </div>


      <div className="steps-container">

        {steps.map((step, index) => (

          <div className="step-card" key={index}>

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

        ))}

      </div>


    </section>
  );
}

export default HowItWorks;