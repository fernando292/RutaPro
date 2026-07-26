import "./Features.css";

function Features() {

  const features = [
    {
      icon: "📦",
      title: "Gestión de pedidos",
      description:
        "Recibe, organiza y controla pedidos desde un solo panel."
    },
    {
      icon: "🏪",
      title: "Administración de tiendas",
      description:
        "Gestiona clientes, tiendas y su historial de compras."
    },
    {
      icon: "📊",
      title: "Reportes inteligentes",
      description:
        "Analiza ventas, productos más vendidos y crecimiento."
    },
    {
      icon: "📋",
      title: "Control de inventario",
      description:
        "Conoce tus existencias y evita faltantes de productos."
    },
    {
      icon: "🗺️",
      title: "Rutas de entrega",
      description:
        "Organiza recorridos y mejora los tiempos de entrega."
    },
    {
      icon: "🔔",
      title: "Notificaciones",
      description:
        "Mantén informados a clientes y repartidores."
    }
  ];


  return (
    <section className="features">

      <div className="features-header">

        <span>
          Funciones del sistema
        </span>

        <h2>
          Todo lo que tu distribución necesita
        </h2>

        <p>
          Una plataforma completa para administrar
          pedidos, clientes e inventario.
        </p>

      </div>


      <div className="features-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

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

        ))}

      </div>


    </section>
  );
}

export default Features;