import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../../config/firebase";

const productsCollection = collection(
  db,
  "products"
);

const movementsCollection = collection(
  db,
  "inventoryMovements"
);

// ===============================
// CACHE
// ===============================

const cache = new Map();

export const clearProductsCache = (companyId) => {
  cache.delete(companyId);
};

// ===============================
// OBTENER PRODUCTOS
// ===============================

export const getProducts = async (
  companyId,
  forceRefresh = false
) => {

  if (!companyId) return [];

  if (!forceRefresh && cache.has(companyId)) {
    return cache.get(companyId);
  }

  const q = query(
    productsCollection,
    where(
      "companyId",
      "==",
      companyId
    )
  );

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));

  cache.set(companyId, products);

  return products;
};

// ===============================
// CREAR PRODUCTO
// ===============================

export const addProduct = async (
  product,
  companyId
) => {

  const productRef = await addDoc(
    productsCollection,
    {
      ...product,
      companyId
    }
  );

  if (Number(product.stock) > 0) {

    await addDoc(
      movementsCollection,
      {
        companyId,
        productId: productRef.id,
        productName: product.name,
        type: "ENTRADA",
        quantity: Number(product.stock),
        previousStock: 0,
        newStock: Number(product.stock),
        reason: "Stock inicial",
        createdAt: serverTimestamp()
      }
    );

  }

  clearProductsCache(companyId);

  return productRef;
};

// ===============================
// ACTUALIZAR PRODUCTO
// ===============================

export const updateProduct = async (
  id,
  product
) => {

  const productRef = doc(
    db,
    "products",
    id
  );

  await updateDoc(
    productRef,
    product
  );

  clearProductsCache(product.companyId);

};

// ===============================
// ELIMINAR PRODUCTO
// ===============================

export const deleteProduct = async (
  id,
  companyId
) => {

  const productRef = doc(
    db,
    "products",
    id
  );

  await deleteDoc(productRef);

  clearProductsCache(companyId);

};