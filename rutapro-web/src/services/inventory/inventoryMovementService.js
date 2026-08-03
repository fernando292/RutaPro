import {
  doc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";

import { db } from "../../config/firebase";

const productsCollection = "products";

const movementsCollection = collection(
  db,
  "inventoryMovements"
);

// =========================
// Obtener producto
// =========================

const getProduct = async (productId) => {

  const productRef = doc(
    db,
    productsCollection,
    productId
  );

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {

    throw new Error(
      "Producto no encontrado."
    );

  }

  return {

    id: snapshot.id,

    ...snapshot.data()

  };

};

// =========================
// Actualizar stock
// =========================

const updateStock = async (

  productId,

  newStock

) => {

  const productRef = doc(

    db,

    productsCollection,

    productId

  );

  await updateDoc(

    productRef,

    {

      stock: newStock,

      updatedAt: serverTimestamp()

    }

  );

};

// =========================
// Registrar movimiento
// =========================

const registerMovement = async (

  companyId,

  product,

  quantity,

  type,

  previousStock,

  newStock,

  reason

) => {

  await addDoc(

    movementsCollection,

    {

      companyId,

      productId: product.id,

      productName: product.name,

      type,

      quantity,

      previousStock,

      newStock,

      reason,

      createdAt: serverTimestamp()

    }

  );

};

// =========================
// Procesar movimiento
// =========================

const processMovement = async (

  items,

  companyId,

  type,

  reason

) => {

  if (!companyId) {

    throw new Error(
      "No existe companyId."
    );

  }

  for (const item of items) {

    const product = await getProduct(
      item.productId
    );

    const currentStock = Number(
      product.stock || 0
    );

    const quantity = Number(
      item.quantity || 0
    );

    let newStock;

    if (type === "SALIDA") {

      if (currentStock < quantity) {

        throw new Error(
          `Stock insuficiente para ${product.name}`
        );

      }

      newStock = currentStock - quantity;

    } else {

      newStock = currentStock + quantity;

    }

    await updateStock(

      product.id,

      newStock

    );

    await registerMovement(

      companyId,

      product,

      quantity,

      type,

      currentStock,

      newStock,

      reason

    );

  }

};

// =========================
// Salida por pedido
// =========================

export const discountStock = async (

  items,

  companyId

) => {

  await processMovement(

    items,

    companyId,

    "SALIDA",

    "Salida por pedido"

  );

};

// =========================
// Entrada de inventario
// =========================

export const increaseStock = async (

  items,

  companyId,

  reason = "Entrada de inventario"

) => {

  await processMovement(

    items,

    companyId,

    "ENTRADA",

    reason

  );

};