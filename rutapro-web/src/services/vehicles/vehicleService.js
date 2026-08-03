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

// ===============================
// CACHE
// ===============================

const cache = new Map();

export const clearVehiclesCache = (companyId) => {

  cache.delete(companyId);

};

// ===============================
// OBTENER VEHÍCULOS
// ===============================

export const getVehicles = async (
  companyId,
  forceRefresh = false
) => {

  if (!companyId) return [];

  if (!forceRefresh && cache.has(companyId)) {

    return cache.get(companyId);

  }

  const q = query(
    vehiclesCollection,
    where(
      "companyId",
      "==",
      companyId
    )
  );

  const snapshot = await getDocs(q);

  const vehicles = snapshot.docs.map((item) => ({

    id: item.id,

    ...item.data()

  }));

  cache.set(
    companyId,
    vehicles
  );

  return vehicles;

};

// ===============================
// CREAR VEHÍCULO
// ===============================

export const addVehicle = async (
  vehicle,
  companyId
) => {

  const response = await addDoc(
    vehiclesCollection,
    {

      ...vehicle,

      companyId

    }
  );

  clearVehiclesCache(companyId);

  return response;

};

// ===============================
// ACTUALIZAR VEHÍCULO
// ===============================

export const updateVehicle = async (
  id,
  vehicle
) => {

  const vehicleRef = doc(
    db,
    "vehicles",
    id
  );

  await updateDoc(
    vehicleRef,
    vehicle
  );

  clearVehiclesCache(vehicle.companyId);

};