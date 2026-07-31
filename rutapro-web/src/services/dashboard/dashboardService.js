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

  const salesLast7Days = [];

  for (let i = 6; i >= 0; i--) {

    const date = new Date();

    date.setDate(today.getDate() - i);

    const dayOrders = orders.filter((order) => {

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

        orderDate.getDate() === date.getDate() &&
        orderDate.getMonth() === date.getMonth() &&
        orderDate.getFullYear() === date.getFullYear()

      );

    });

    const sales = dayOrders.reduce(

      (total, order) => total + Number(order.total || 0),

      0

    );

    salesLast7Days.push({

      day: date.toLocaleDateString("es-CO", {
        weekday: "short"
      }),

      sales

    });

  }

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

  const statusCounter = {};

  orders.forEach((order) => {

    const status = order.status || "Sin estado";

    statusCounter[status] = (statusCounter[status] || 0) + 1;

  });

  const ordersByStatus = Object.entries(statusCounter).map(

    ([name, value]) => ({

      name,

      value

    })

  );

  const lowStockProducts = [...products]

    .filter(

      (product) => Number(product.stock || 0) <= 10

    )

    .sort(

      (a, b) => Number(a.stock) - Number(b.stock)

    )

    .slice(0, 5);

  const recentOrders = [...orders]

    .sort((a, b) => {

      const dateA = a.createdAt?.seconds
        ? a.createdAt.seconds
        : new Date(a.createdAt).getTime() / 1000;

      const dateB = b.createdAt?.seconds
        ? b.createdAt.seconds
        : new Date(b.createdAt).getTime() / 1000;

      return dateB - dateA;

    })

    .slice(0, 5);

  return {

    todayOrders: todayOrders.length,

    activeClients: clients.length,

    pendingDeliveries: pendingDeliveries.length,

    todaySales,

    totalProducts: products.length,

    totalRoutes: routes.length,

    totalDrivers: drivers.length,

    totalVehicles: vehicles.length,

    salesLast7Days,

    ordersByStatus,

    recentOrders,

    lowStockProducts

  };

};