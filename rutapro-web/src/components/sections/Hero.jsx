import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          🚚 Gestión inteligente de distribución
        </span>

        <h1>
          La forma inteligente
          <br />
          de gestionar pedidos
        </h1>

        <p>
          RutaPro ayuda a distribuidores y tiendas
          a organizar pedidos, inventario y entregas
          desde un solo lugar.
        </p>


        <div className="hero-buttons">

          <button
            style={{
              background: "#2563EB",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            Comenzar ahora
          </button>


          <button className="btn-secondary">
            Ver demo
          </button>

        </div>

      </div>


      <div className="hero-image">

        <div className="dashboard-card">
          Panel RutaPro
        </div>

      </div>


    </section>
  );
}

export default Hero;