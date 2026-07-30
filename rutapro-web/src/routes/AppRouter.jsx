import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Clients from "../pages/Clients/Clients";
import Orders from "../pages/Orders/Orders";

import Inventory from "../pages/Inventory/Inventory";
import Drivers from "../pages/Drivers/Drivers";
import Vehicles from "../pages/Vehicles/Vehicles";
import RoutesPage from "../pages/Routes/Routes";

import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";
import Admin from "../pages/Admin/Admin";
import NotFound from "../pages/NotFound/NotFound";



function AppRouter() {


  return (

    <BrowserRouter>


      <Routes>


        {/* PUBLICAS */}


        <Route

          path="/"

          element={<Home />}

        />



        <Route

          path="/login"

          element={<Login />}

        />



        <Route

          path="/register"

          element={<Register />}

        />





        {/* PROTEGIDAS */}




        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />





        <Route

          path="/products"

          element={

            <ProtectedRoute>

              <Products />

            </ProtectedRoute>

          }

        />





        <Route

          path="/clients"

          element={

            <ProtectedRoute>

              <Clients />

            </ProtectedRoute>

          }

        />





        <Route

          path="/orders"

          element={

            <ProtectedRoute>

              <Orders />

            </ProtectedRoute>

          }

        />





        <Route

          path="/inventory"

          element={

            <ProtectedRoute>

              <Inventory />

            </ProtectedRoute>

          }

        />

        

        <Route

          path="/drivers"

          element={

            <ProtectedRoute>

             <Drivers />

            </ProtectedRoute>

          }

        />

        <Route

          path="/vehicles" 
          
          element={

            <ProtectedRoute>

              <Vehicles />

            </ProtectedRoute>

          }

        />  

        <Route

          path="/routes"

          element={

            <ProtectedRoute>

              <RoutesPage />

            </ProtectedRoute>

          }

        />    


        <Route

          path="/reports"

          element={

            <ProtectedRoute>

              <Reports />

            </ProtectedRoute>

          }

        />





        <Route

          path="/settings"

          element={

            <ProtectedRoute>

              <Settings />

            </ProtectedRoute>

          }

        />





        <Route

          path="/admin"

          element={

            <ProtectedRoute>

              <Admin />

            </ProtectedRoute>

          }

        />





        {/* RUTA NO ENCONTRADA */}


        <Route

          path="*"

          element={<NotFound />}

        />



      </Routes>


    </BrowserRouter>

  );

}


export default AppRouter;