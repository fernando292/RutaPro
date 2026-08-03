import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute";

import PageLoader from "../components/common/PageLoader";

// Públicas
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

// Dashboard
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

// Módulos
const Products = lazy(() => import("../pages/Products/Products"));
const Clients = lazy(() => import("../pages/Clients/Clients"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Inventory = lazy(() => import("../pages/Inventory/Inventory"));
const Drivers = lazy(() => import("../pages/Drivers/Drivers"));
const Vehicles = lazy(() => import("../pages/Vehicles/Vehicles"));
const RoutesPage = lazy(() => import("../pages/Routes/Routes"));
const Map = lazy(() => import("../pages/dashboard/Map"));
const Reports = lazy(() => import("../pages/Reports/Reports"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Admin = lazy(() => import("../pages/Admin/Admin"));

const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* PÚBLICAS */}
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
                  "Bodega",
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
                  "Vendedor",
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
                  "Vendedor",
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
                  "Bodega",
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
                  "Administrador",
                ]}
              >
                <Drivers />
              </ProtectedRoute>
            }
          />

          {/* VEHÍCULOS */}
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute
                roles={[
                  "Administrador",
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
                  "Conductor",
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
                  "Conductor",
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
                  "Administrador",
                ]}
              >
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* CONFIGURACIÓN */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                roles={[
                  "Administrador",
                ]}
              >
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                roles={[
                  "Administrador",
                ]}
              >
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;