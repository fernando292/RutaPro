import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../config/firebase";


const clientsCollection = collection(
  db,
  "clients"
);




// Obtener clientes

export const getClients = async () => {


  const snapshot = await getDocs(
    clientsCollection
  );


  return snapshot.docs.map((item) => ({

    id: item.id,

    ...item.data(),

  }));

};





// Crear cliente

export const addClient = async (client) => {


  try {


    const response = await addDoc(

      clientsCollection,

      client

    );


    console.log(
      "Cliente creado:",
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





// Actualizar cliente

export const updateClient = async (
  id,
  client
) => {


  const clientRef = doc(

    db,

    "clients",

    id

  );


  return await updateDoc(

    clientRef,

    client

  );


};





// Eliminar cliente

export const deleteClient = async (id) => {


  const clientRef = doc(

    db,

    "clients",

    id

  );


  return await deleteDoc(

    clientRef

  );


};