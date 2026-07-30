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

const vehiclesCollection = collection(
  db,
  "vehicles"
);



// Obtener vehículos

export const getVehicles = async (companyId) => {

  const q = query(

    vehiclesCollection,

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




// Crear vehículo

export const addVehicle = async (

  vehicle,

  companyId

) => {

  try {

    const response = await addDoc(

      vehiclesCollection,

      {

        ...vehicle,

        companyId

      }

    );

    return response;

  } catch (error) {

    console.error(

      "Error creando vehículo:",

      error

    );

    throw error;

  }

};




// Actualizar vehículo

export const updateVehicle = async (

  id,

  vehicle

) => {

  const vehicleRef = doc(

    db,

    "vehicles",

    id

  );

  return await updateDoc(

    vehicleRef,

    vehicle

  );

};