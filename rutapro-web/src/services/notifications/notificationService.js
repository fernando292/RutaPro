import { getOrders } from "../orders/orderService";
import { getProducts } from "../products/productService";
import { getRoutes } from "../routes/routeService";
import { getDrivers } from "../drivers/driverService";
import { getVehicles } from "../vehicles/vehicleService";

export const getNotifications = async (companyId) => {

  const notifications = [];

  const [

    orders,

    products,

    routes,

    drivers,

    vehicles

  ] = await Promise.all([

    getOrders(companyId),

    getProducts(companyId),

    getRoutes(companyId),

    getDrivers(companyId),

    getVehicles(companyId)

  ]);

  // STOCK BAJO

  products.forEach((product) => {

    if (Number(product.stock || 0) <= 10) {

      notifications.push({

        type: "warning",

        title: "Stock bajo",

        message: `${product.name} tiene ${product.stock} unidades.`

      });

    }

  });

  // PEDIDOS PENDIENTES

  orders.forEach((order) => {

    if (order.status === "Pendiente") {

      notifications.push({

        type: "info",

        title: "Pedido pendiente",

        message: `Pedido #${order.orderNumber} está pendiente.`

      });

    }

  });

  // RUTAS SIN CONDUCTOR

  routes.forEach((route) => {

    if (!route.driverId) {

      notifications.push({

        type: "warning",

        title: "Ruta sin conductor",

        message: `${route.routeNumber} aún no tiene conductor.`

      });

    }

  });

  // VEHÍCULOS INACTIVOS

  vehicles.forEach((vehicle) => {

    if (vehicle.status === "Inactivo") {

      notifications.push({

        type: "info",

        title: "Vehículo inactivo",

        message: `${vehicle.plate} está inactivo.`

      });

    }

  });

  // CONDUCTORES INACTIVOS

  drivers.forEach((driver) => {

    if (driver.status === "Inactivo") {

      notifications.push({

        type: "info",

        title: "Conductor inactivo",

        message: `${driver.name} está inactivo.`

      });

    }

  });

  return notifications;

};