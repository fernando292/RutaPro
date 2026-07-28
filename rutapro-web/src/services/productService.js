import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

const productsCollection = collection(
  db,
  "products"
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

    ...item.data(),

  }));

};




// Crear producto

export const addProduct = async (

  product,
  companyId

) => {

  try {

    const response = await addDoc(

      productsCollection,

      {

        ...product,

        companyId,

      }

    );

    console.log(
      "Producto creado:",
      response.id
    );

    return response;

  } catch (error) {

    console.error(
      "Error Firebase:",
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

  return await updateDoc(

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

  return await deleteDoc(

    productRef

  );

};