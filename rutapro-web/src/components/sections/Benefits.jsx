import "./Benefits.css";

function Benefits() {

  const benefits = [
    {
      icon: "📦",
      title: "Pedidos inteligentes",
      description:
        "Gestiona pedidos de tus tiendas de forma rápida y organizada."
    },
    {
      icon: "🏪",
      title: "Control de clientes",
      description:
        "Administra todas tus tiendas y clientes desde un solo lugar."
    },
    {
      icon: "📊",
      title: "Reportes y análisis",
      description:
        "Conoce tus ventas, productos más vendidos y crecimiento."
    },
    {
      icon: "🚚",
      title: "Rutas optimizadas",
      description:
        "Organiza entregas y mejora los tiempos de distribución."
    }
  ];


  return (
    <section
    
     id="soluciones"
     className="benefits"
     
    >

      <div className="benefits-header">

        <span>
          Todo lo que necesitas
        </span>

        <h2>
          Una plataforma creada
          para distribuidores modernos
        </h2>

        <p>
          RutaPro centraliza pedidos,
          inventario y entregas para que
          tu negocio crezca.
        </p>

      </div>


      <div className="benefits-grid">

        {benefits.map((item, index) => (

          <div className="benefit-card" key={index}>

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

        ))}

      </div>


    </section>
  );
}

export default Benefits;