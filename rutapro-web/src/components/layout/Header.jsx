import { useNavigate } from "react-router-dom";

import "./Header.css";


function Header() {


  const navigate = useNavigate();



  return (


    <header className="header">



      <div

        className="logo"

        onClick={()=>navigate("/")}

      >

        Ruta<span>Pro</span>


      </div>








      <nav className="nav">


        <a href="#inicio">

          Inicio

        </a>



        <a href="#soluciones">

          Soluciones

        </a>



        <a href="#funciones">

          Funciones

        </a>



        <a href="#contacto">

          Contacto

        </a>


      </nav>








      <div className="header-buttons">



        <button

          className="btn-login"

          onClick={()=>navigate("/login")}

        >

          Iniciar sesión

        </button>





        <button

          className="btn-register"

          onClick={()=>navigate("/register")}

        >

          Crear empresa

        </button>



      </div>





    </header>


  );


}



export default Header;