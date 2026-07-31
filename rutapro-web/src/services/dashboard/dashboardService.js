import { getOrders } from "../orders/orderService";
import { getClients } from "../clients/clientService";
import { getProducts } from "../products/productService";
import { getRoutes } from "../routes/routeService";
import { getDrivers } from "../drivers/driverService";
import { getVehicles } from "../vehicles/vehicleService";

export const getDashboardStats = async (companyId) => {

  const [
    orders,
    clients,
    products,
    routes,
    drivers,
    vehicles
  ] = await Promise.all([
    getOrders(companyId),
    getClients(companyId),
    getProducts(companyId),
    getRoutes(companyId),
    getDrivers(companyId),
    getVehicles(companyId)
  ]);

  const today = new Date();

  const todayOrders = orders.filter((order) => {

    let orderDate;

    if (order.createdAt?.seconds) {

      orderDate = new Date(
        order.createdAt.seconds * 1000
      );

    } else if (order.createdAt) {

      orderDate = new Date(order.createdAt);

    } else {

      return false;

    }

    return (

      orderDate.getDate() === today.getDate() &&

      orderDate.getMonth() === today.getMonth() &&

      orderDate.getFullYear() === today.getFullYear()

    );

  });

  const pendingDeliveries = orders.filter((order) =>

    ["Pendiente", "Preparando", "En ruta"].includes(order.status)

  );

  const todaySales = todayOrders.reduce(

    (total, order) => total + Number(order.total || 0),

    0

  );

  return {

    todayOrders: todayOrders.length,

    activeClients: clients.length,

    pendingDeliveries: pendingDeliveries.length,

    todaySales,

    totalProducts: products.length,

    totalRoutes: routes.length,

    totalDrivers: drivers.length,

    totalVehicles: vehicles.length

  };

};