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

const clientsCollection = collection(
  db,
  "clients"
);

// ===============================
// CACHE
// ===============================

const cache = new Map();

export const clearClientsCache = (companyId) => {

  cache.delete(companyId);

};

// ===============================
// OBTENER CLIENTES
// ===============================

export const getClients = async (
  companyId,
  forceRefresh = false
) => {

  if (!companyId) return [];

  if (!forceRefresh && cache.has(companyId)) {

    return cache.get(companyId);

  }

  const q = query(
    clientsCollection,
    where(
      "companyId",
      "==",
      companyId
    )
  );

  const snapshot = await getDocs(q);

  const clients = snapshot.docs.map((item) => ({

    id: item.id,

    ...item.data()

  }));

  cache.set(
    companyId,
    clients
  );

  return clients;

};

// ===============================
// CREAR CLIENTE
// ===============================

export const addClient = async (
  client,
  companyId
) => {

  const response = await addDoc(
    clientsCollection,
    {

      ...client,

      companyId

    }
  );

  clearClientsCache(companyId);

  return response;

};

// ===============================
// ACTUALIZAR CLIENTE
// ===============================

export const updateClient = async (
  id,
  client
) => {

  const clientRef = doc(
    db,
    "clients",
    id
  );

  await updateDoc(
    clientRef,
    client
  );

  clearClientsCache(client.companyId);

};

// ===============================
// ELIMINAR CLIENTE
// ===============================

export const deleteClient = async (
  id,
  companyId
) => {

  const clientRef = doc(
    db,
    "clients",
    id
  );

  await deleteDoc(clientRef);

  clearClientsCache(companyId);

};