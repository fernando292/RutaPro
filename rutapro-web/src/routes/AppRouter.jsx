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
import Map from "../pages/dashboard/Map";

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



        {/* DASHBOARD */}


        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />



        {/* PRODUCTOS */}


        <Route

          path="/products"

          element={

            <ProtectedRoute

              roles={[

                "Administrador",

                "Bodega"

              ]}

            >

              <Products />

            </ProtectedRoute>

          }

        />



        {/* CLIENTES */}


        <Route

          path="/clients"

          element={

            <ProtectedRoute

              roles={[

                "Administrador",

                "Vendedor"

              ]}

            >

              <Clients />

            </ProtectedRoute>

          }

        />



        {/* PEDIDOS */}


        <Route

          path="/orders"

          element={

            <ProtectedRoute

              roles={[

                "Administrador",

                "Vendedor"

              ]}

            >

              <Orders />

            </ProtectedRoute>

          }

        />



        {/* INVENTARIO */}


        <Route

          path="/inventory"

          element={

            <ProtectedRoute

              roles={[

                "Administrador",

                "Bodega"

              ]}

            >

              <Inventory />

            </ProtectedRoute>

          }

        />



        {/* CONDUCTORES */}


        <Route

          path="/drivers"

          element={

            <ProtectedRoute

              roles={[

                "Administrador"

              ]}

            >

              <Drivers />

            </ProtectedRoute>

          }

        />



        {/* VEHICULOS */}


        <Route

          path="/vehicles"

          element={

            <ProtectedRoute

              roles={[

                "Administrador"

              ]}

            >

              <Vehicles />

            </ProtectedRoute>

          }

        />



        {/* RUTAS */}


        <Route

          path="/routes"

          element={

            <ProtectedRoute

              roles={[

                "Administrador",

                "Conductor"

              ]}

            >

              <RoutesPage />

            </ProtectedRoute>

          }

        />



        {/* MAPA */}


        <Route

          path="/map"

          element={

            <ProtectedRoute

              roles={[

                "Administrador",

                "Conductor"

              ]}

            >

              <Map />

            </ProtectedRoute>

          }

        />



        {/* REPORTES */}


        <Route

          path="/reports"

          element={

            <ProtectedRoute

              roles={[

                "Administrador"

              ]}

            >

              <Reports />

            </ProtectedRoute>

          }

        />



        {/* CONFIGURACION */}


        <Route

          path="/settings"

          element={

            <ProtectedRoute

              roles={[

                "Administrador"

              ]}

            >

              <Settings />

            </ProtectedRoute>

          }

        />



        {/* ADMIN USUARIOS */}


        <Route

          path="/admin"

          element={

            <ProtectedRoute

              roles={[

                "Administrador"

              ]}

            >

              <Admin />

            </ProtectedRoute>

          }

        />



        {/* NO ENCONTRADA */}


        <Route

          path="*"

          element={<NotFound />}

        />


      </Routes>

    </BrowserRouter>

  );

}


export default AppRouter;