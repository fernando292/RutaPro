import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";


const productsCollection = collection(db, "products");



export const getProducts = async () => {

  const snapshot = await getDocs(productsCollection);


  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

};



export const addProduct = async (product) => {

  try {

    const response = await addDoc(
      productsCollection,
      product
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



export const deleteProduct = async (id) => {

  const productRef = doc(
    db,
    "products",
    id
  );


  return await deleteDoc(productRef);

};