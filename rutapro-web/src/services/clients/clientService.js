import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebase";

const clientsCollection = collection(
  db,
  "clients"
);



// Obtener clientes de la empresa

export const getClients = async (companyId) => {

  const q = query(

    clientsCollection,

    where(
      "companyId",
      "==",
      companyId
    )

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({

    id: item.id,

    ...item.data(),

  }));

};





// Crear cliente

export const addClient = async (

  client,
  companyId

) => {

  try {

    const response = await addDoc(

      clientsCollection,

      {

        ...client,

        companyId,

      }

    );

    console.log(
      "Cliente creado:",
      response.id
    );

    return response;

  } catch (error) {

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