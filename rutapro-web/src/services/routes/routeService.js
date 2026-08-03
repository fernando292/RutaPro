import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../../config/firebase";

const routesCollection = collection(
  db,
  "routes"
);

// ===================================
// CACHE
// ===================================

const cache = new Map();

export const clearRoutesCache = (companyId) => {

  cache.delete(companyId);

};

// ===================================
// OBTENER RUTAS
// ===================================

export const getRoutes = async (
  companyId,
  forceRefresh = false
) => {

  if (!companyId) return [];

  if (!forceRefresh && cache.has(companyId)) {

    return cache.get(companyId);

  }

  const q = query(
    routesCollection,
    where(
      "companyId",
      "==",
      companyId
    )
  );

  const snapshot = await getDocs(q);

  const routes = snapshot.docs.map((item) => ({

    id: item.id,

    ...item.data()

  }));

  cache.set(
    companyId,
    routes
  );

  return routes;

};

// ===================================
// CREAR RUTA
// ===================================

export const addRoute = async (
  route,
  companyId
) => {

  const response = await addDoc(
    routesCollection,
    {

      ...route,

      companyId,

      createdAt: serverTimestamp()

    }
  );

  clearRoutesCache(companyId);

  return response;

};

// ===================================
// ACTUALIZAR RUTA
// ===================================

export const updateRoute = async (
  id,
  route
) => {

  const routeRef = doc(
    db,
    "routes",
    id
  );

  await updateDoc(
    routeRef,
    {

      ...route,

      updatedAt: serverTimestamp()

    }
  );

  clearRoutesCache(route.companyId);

};

// ===================================
// ELIMINAR RUTA
// ===================================

export const deleteRoute = async (
  id,
  companyId
) => {

  const routeRef = doc(
    db,
    "routes",
    id
  );

  await deleteDoc(routeRef);

  if (companyId) {

    clearRoutesCache(companyId);

  }

};