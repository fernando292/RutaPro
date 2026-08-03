import {
  getOrders
} from "../orders/orderService";

import {
  getClients
} from "../clients/clientService";

import {
  getProducts
} from "../products/productService";

import {
  getRoutes
} from "../routes/routeService";

import {
  getDrivers
} from "../drivers/driverService";

import {
  getVehicles
} from "../vehicles/vehicleService";



export const getDashboardStats = async(companyId)=>{


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





  const parseDate = (value)=>{


    if(value?.seconds){

      return new Date(
        value.seconds * 1000
      );

    }


    if(value){

      return new Date(value);

    }


    return null;


  };






  const isSameDay = (date1,date2)=>{


    return (

      date1.getDate() === date2.getDate() &&

      date1.getMonth() === date2.getMonth() &&

      date1.getFullYear() === date2.getFullYear()

    );


  };







  const todayOrders = orders.filter(order=>{


    const date = parseDate(
      order.createdAt
    );


    return date && isSameDay(
      date,
      today
    );


  });








  const todaySales = todayOrders.reduce(

    (sum,order)=>

      sum + Number(
        order.total || 0
      ),

    0

  );







  const salesLast7Days=[];



  for(let i=6;i>=0;i--){


    const date = new Date();


    date.setDate(
      today.getDate()-i
    );



    const sales = orders

      .filter(order=>{


        const orderDate = parseDate(
          order.createdAt
        );


        return (

          orderDate &&

          isSameDay(
            orderDate,
            date
          )

        );


      })


      .reduce(

        (sum,order)=>

          sum + Number(
            order.total || 0
          ),

        0

      );




    salesLast7Days.push({

      day:
      date.toLocaleDateString(
        "es-CO",
        {
          weekday:"short"
        }
      ),

      sales


    });


  }









  const pendingDeliveries = orders.filter(order=>

    [

      "Pendiente",

      "Preparando",

      "En ruta"

    ].includes(
      order.status
    )

  ).length;









  const statusCounter={};



  orders.forEach(order=>{


    const status =
      order.status || "Sin estado";


    statusCounter[status] =
      (statusCounter[status] || 0)+1;


  });






  const ordersByStatus =
    Object.entries(statusCounter)
    .map(([name,value])=>({

      name,

      value

    }));









  const lowStockProducts =
    products

    .filter(product=>

      Number(product.stock || 0)<=10

    )

    .sort((a,b)=>

      Number(a.stock || 0)
      -
      Number(b.stock || 0)

    )

    .slice(0,5);









  return {


    todayOrders:
      todayOrders.length,


    activeClients:
      clients.length,


    pendingDeliveries,


    todaySales,


    totalProducts:
      products.length,


    totalRoutes:
      routes.length,


    totalDrivers:
      drivers.length,


    totalVehicles:
      vehicles.length,


    salesLast7Days,


    ordersByStatus,


    recentOrders:
      orders
      .sort(
        (a,b)=>
          parseDate(b.createdAt)
          -
          parseDate(a.createdAt)
      )
      .slice(0,5),



    lowStockProducts


  };


};