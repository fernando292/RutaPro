import { getOrders } from "../orders/orderService";
import { getProducts } from "../products/productService";
import { getRoutes } from "../routes/routeService";
import { getDrivers } from "../drivers/driverService";
import { getVehicles } from "../vehicles/vehicleService";

const MAX_NOTIFICATIONS = 10;


export const getNotifications = async (companyId)=>{

  const notifications=[];


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



  products.forEach((product)=>{

    if(
      notifications.length < MAX_NOTIFICATIONS &&
      Number(product.stock || 0) <= 10
    ){

      notifications.push({

        type:"warning",

        title:"Stock bajo",

        message:
        `${product.name} tiene ${product.stock} unidades.`

      });

    }

  });



  orders.forEach((order)=>{

    if(
      notifications.length < MAX_NOTIFICATIONS &&
      order.status === "Pendiente"
    ){

      notifications.push({

        type:"info",

        title:"Pedido pendiente",

        message:
        `Pedido #${order.orderNumber} está pendiente.`

      });

    }

  });



  routes.forEach((route)=>{

    if(
      notifications.length < MAX_NOTIFICATIONS &&
      !route.driverId
    ){

      notifications.push({

        type:"warning",

        title:"Ruta sin conductor",

        message:
        `${route.routeNumber} aún no tiene conductor.`

      });

    }

  });



  vehicles.forEach((vehicle)=>{

    if(
      notifications.length < MAX_NOTIFICATIONS &&
      vehicle.status === "Inactivo"
    ){

      notifications.push({

        type:"info",

        title:"Vehículo inactivo",

        message:
        `${vehicle.plate} está inactivo.`

      });

    }

  });



  drivers.forEach((driver)=>{

    if(
      notifications.length < MAX_NOTIFICATIONS &&
      driver.status === "Inactivo"
    ){

      notifications.push({

        type:"info",

        title:"Conductor inactivo",

        message:
        `${driver.name} está inactivo.`

      });

    }

  });



  return notifications;

};