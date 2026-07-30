import { useNavigate } from "react-router-dom";

import "./Hero.css";


function Hero() {

  const navigate = useNavigate();


  return (

    <section

      id="inicio"

      className="hero"

    >


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

            onClick={() => navigate("/register")}

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





          <button

            className="btn-secondary"

            onClick={() => navigate("/login")}

          >

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