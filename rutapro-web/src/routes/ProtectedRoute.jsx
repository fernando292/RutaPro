import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function ProtectedRoute({children, roles}){


const {
user,
profile,
loading
}=useAuth();



if(loading){

return <div>Cargando sesión...</div>;

}



if(!user){

return <Navigate to="/login" replace/>;

}



if(!profile){

return <div>Cargando perfil...</div>;

}



if(
roles &&
!roles.includes(profile.role)
){

return <Navigate to="/dashboard" replace/>;

}



return children;


}


export default ProtectedRoute;