import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth/authService";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";


function Login() {


  const navigate = useNavigate();

  const { user, profile } = useAuth();



  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  useEffect(() => {


    if (user && profile) {


      navigate("/dashboard");


    }


  }, [user, profile, navigate]);




  const handleSubmit = async (e) => {


    e.preventDefault();


    setError("");



    try {


      setLoading(true);



      await login(

        email,

        password

      );



    } catch(error) {


      console.error(error);


      setError(

        "Correo o contraseña incorrectos."

      );


    } finally {


      setLoading(false);

    }


  };



  return (

    <div className="login-container">

      <div className="login-card">


        <h1>

          Ruta<span>Pro</span>

        </h1>


        <p>

          Inicia sesión para continuar

        </p>



        <form onSubmit={handleSubmit}>


          <input

            type="email"

            placeholder="Correo electrónico"

            value={email}

            onChange={(e)=>

              setEmail(e.target.value)

            }

            required

          />


          <input

            type="password"

            placeholder="Contraseña"

            value={password}

            onChange={(e)=>

              setPassword(e.target.value)

            }

            required

          />



          {

            error && (

              <p className="error">

                {error}

              </p>

            )

          }



          <button

            type="submit"

            disabled={loading}

          >

            {

              loading

              ? "Ingresando..."

              : "Iniciar sesión"

            }

          </button>


        </form>


      </div>

    </div>

  );

}


export default Login;