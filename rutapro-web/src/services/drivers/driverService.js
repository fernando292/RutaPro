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

// ===============================
// CACHE
// ===============================

const cache = new Map();

export const clearDriversCache = (companyId) => {

  cache.delete(companyId);

};

// ===============================
// OBTENER CONDUCTORES
// ===============================

export const getDrivers = async (
  companyId,
  forceRefresh = false
) => {

  if (!companyId) return [];

  if (!forceRefresh && cache.has(companyId)) {

    return cache.get(companyId);

  }

  const q = query(
    driversCollection,
    where(
      "companyId",
      "==",
      companyId
    )
  );

  const snapshot = await getDocs(q);

  const drivers = snapshot.docs.map((item) => ({

    id: item.id,

    ...item.data()

  }));

  cache.set(
    companyId,
    drivers
  );

  return drivers;

};

// ===============================
// CREAR CONDUCTOR
// ===============================

export const addDriver = async (
  driver,
  companyId
) => {

  const response = await addDoc(
    driversCollection,
    {

      ...driver,

      companyId

    }
  );

  clearDriversCache(companyId);

  return response;

};

// ===============================
// ACTUALIZAR CONDUCTOR
// ===============================

export const updateDriver = async (
  id,
  driver
) => {

  const driverRef = doc(
    db,
    "drivers",
    id
  );

  await updateDoc(
    driverRef,
    driver
  );

  clearDriversCache(driver.companyId);

};