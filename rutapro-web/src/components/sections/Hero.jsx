import { useNavigate } from "react-router-dom";

import Button from "../UI/Button/Button";

import "./Hero.css";

function Hero() {

  const navigate = useNavigate();

  return (
    <section id="inicio" className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          🚚 Gestión inteligente de distribución
        </span>

        <h1>
          Controla toda tu operación logística
          <br />
          desde un solo lugar
        </h1>

        <p>
          RutaPro conecta pedidos, inventario,
          clientes y rutas de entrega en una
          plataforma diseñada para empresas
          distribuidoras.
        </p>

        <div className="hero-buttons">

          <Button onClick={() => navigate("/register")}>
            Crear empresa gratis
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Ver plataforma
          </Button>

        </div>

      </div>

    </section>
  );
}

export default Hero;