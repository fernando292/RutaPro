import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { db } from "../../config/firebase";

const routesCollection = collection(
  db,
  "routes"
);



// Obtener rutas

export const getRoutes = async (companyId) => {

  const q = query(

    routesCollection,

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

};




// Crear ruta

export const addRoute = async (

  route,

  companyId

) => {

  return await addDoc(

    routesCollection,

    {

      ...route,

      companyId,

      createdAt: new Date()

    }

  );

};




// Actualizar ruta

export const updateRoute = async (

  id,

  route

) => {

  const routeRef = doc(

    db,

    "routes",

    id

  );

  return await updateDoc(

    routeRef,

    route

  );

};




// Eliminar ruta

export const deleteRoute = async (id) => {

  const routeRef = doc(

    db,

    "routes",

    id

  );

  return await deleteDoc(

    routeRef

  );

};