import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../config/firebase";


const ordersCollection = collection(
  db,
  "orders"
);



// Obtener pedidos

export const getOrders = async () => {


  const snapshot = await getDocs(
    ordersCollection
  );


  return snapshot.docs.map((item) => ({


    id: item.id,


    ...item.data(),


  }));

};




// Crear pedido

export const addOrder = async (order) => {


  try {


    // Obtener pedidos existentes

    const snapshot = await getDocs(
      ordersCollection
    );


    const nextNumber =
      snapshot.size + 1;



    const newOrder = {


      ...order,


      orderNumber: nextNumber,


    };



    const response = await addDoc(

      ordersCollection,

      newOrder

    );



    console.log(

      "Pedido creado:",

      response.id

    );



    return response;



  } catch(error) {


    console.error(

      "Error Firebase:",

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



  return await updateDoc(

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



  return await deleteDoc(

    orderRef

  );


};