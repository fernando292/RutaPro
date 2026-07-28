import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { db } from "../../config/firebase";


const ordersCollection = collection(
  db,
  "orders"
);




// Obtener pedidos por empresa

export const getOrders = async (companyId) => {

  try {


    if (!companyId) {

      console.warn(
        "getOrders recibió companyId vacío"
      );

      return [];

    }



    const q = query(

      ordersCollection,

      where(
        "companyId",
        "==",
        companyId
      )

    );



    const snapshot = await getDocs(q);



    return snapshot.docs.map((item) => ({


      id: item.id,


      ...item.data()


    }));



  } catch(error) {


    console.error(

      "Error obteniendo pedidos:",

      error

    );


    throw error;


  }


};







// Crear pedido

export const addOrder = async (

  order,

  companyId

) => {


  try {


    if (!companyId) {

      throw new Error(
        "No existe companyId para crear pedido"
      );

    }



    const newOrder = {


      ...order,


      companyId,


      createdAt: new Date(),


      orderNumber: Date.now()


    };



    const response = await addDoc(

      ordersCollection,

      newOrder

    );



    console.log(

      "Pedido creado correctamente:",

      response.id

    );



    return response;



  } catch(error) {


    console.error(

      "Error creando pedido:",

      error

    );


    throw error;


  }


};







// Actualizar pedido

export const updateOrder = async (

  id,

  order

) => {


  const orderRef = doc(

    db,

    "orders",

    id

  );



  return updateDoc(

    orderRef,

    order

  );


};







// Eliminar pedido

export const deleteOrder = async (id) => {


  const orderRef = doc(

    db,

    "orders",

    id

  );



  return deleteDoc(

    orderRef

  );


};