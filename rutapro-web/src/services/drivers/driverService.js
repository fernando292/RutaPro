import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { db } from "../../config/firebase";

const driversCollection = collection(
  db,
  "drivers"
);

// Obtener conductores de la empresa
export const getDrivers = async (companyId) => {

  const q = query(

    driversCollection,

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

// Crear conductor
export const addDriver = async (

  driver,

  companyId

) => {

  try {

    const response = await addDoc(

      driversCollection,

      {

        ...driver,

        companyId

      }

    );

    console.log(
      "Conductor creado:",
      response.id
    );

    return response;

  } catch (error) {

    console.error(
      "Error creando conductor:",
      error
    );

    throw error;

  }

};

// Actualizar conductor
export const updateDriver = async (

  id,

  driver

) => {

  const driverRef = doc(

    db,

    "drivers",

    id

  );

  return await updateDoc(

    driverRef,

    driver

  );

};