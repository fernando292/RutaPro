import {
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where
} from "firebase/firestore";

import { db } from "../../config/firebase";




// Asignar pedidos a una ruta

export const assignOrdersToRoute = async (

  orderIds,

  routeId,

  companyId

) => {


  if (!companyId) {

    throw new Error(
      "No existe companyId"
    );

  }




  for (const orderId of orderIds) {


    const orderRef = doc(

      db,

      "orders",

      orderId

    );



    await updateDoc(

      orderRef,

      {

        routeId,

        status: "Preparando"

      }

    );


  }


};







// Obtener pedidos disponibles para ruta

export const getAvailableOrders = async (

  companyId,

  currentRouteId = null

) => {


  const ordersCollection = collection(

    db,

    "orders"

  );



  const q = query(

    ordersCollection,

    where(

      "companyId",

      "==",

      companyId

    )

  );



  const snapshot = await getDocs(q);



  return snapshot.docs

    .map((item) => ({


      id: item.id,


      ...item.data()


    }))


    .filter(order =>

      !order.routeId ||

      order.routeId === currentRouteId

    );


};