import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function ProtectedRoute({ children, roles }) {


  const {
    user,
    profile,
    loading
  } = useAuth();



  console.log(
    "PROTECTED ROUTE:",
    {
      loading,
      user,
      profile,
      roles
    }
  );



  if (loading) {

    return (
      <div>
        Cargando sesión...
      </div>
    );

  }





  if (!user) {

    console.log(
      "Sin usuario, enviando a login"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }





  if (!profile) {

    console.log(
      "Usuario sin perfil todavía"
    );

    return (
      <div>
        Cargando perfil...
      </div>
    );

  }





  if (
    roles &&
    !roles.includes(profile.role)
  ) {


    console.log(
      "ROL BLOQUEADO:",
      {
        rolActual: profile.role,
        rolesPermitidos: roles
      }
    );


    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );


  }





  console.log(
    "ACCESO PERMITIDO:",
    profile.role
  );



  return children;


}


export default ProtectedRoute;