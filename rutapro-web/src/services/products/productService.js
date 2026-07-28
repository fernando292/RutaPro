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



// Obtener productos de la empresa

export const getProducts = async (companyId) => {

  const q = query(

    productsCollection,

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






// Crear producto

export const addProduct = async (

  product,

  companyId

) => {

  try {

    console.log("ENVIANDO PRODUCTO:", product);

    const productRef = await addDoc(

      productsCollection,

      {

        ...product,

        companyId

      }

    );


    // Registrar entrada inicial de inventario

    if (Number(product.stock) > 0) {

      console.log("CREANDO MOVIMIENTO ENTRADA:", {

        product: product.name,

        stock: product.stock,

        companyId

      });

      try {

        const movementRef = await addDoc(

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

        console.log(
          "MOVIMIENTO CREADO:",
          movementRef.id
        );

      } catch (error) {

        console.error(
          "ERROR CREANDO MOVIMIENTO:",
          error
        );

      }

    }

    console.log(
      "Producto creado:",
      productRef.id
    );

    return productRef;

  } catch (error) {

    console.error(
      "Error creando producto:",
      error
    );

    throw error;

  }

};






// Actualizar producto

export const updateProduct = async (

  id,

  product

) => {

  const productRef = doc(

    db,

    "products",

    id

  );

  return updateDoc(

    productRef,

    product

  );

};






// Eliminar producto

export const deleteProduct = async (id) => {

  const productRef = doc(

    db,

    "products",

    id

  );

  return deleteDoc(

    productRef

  );

};