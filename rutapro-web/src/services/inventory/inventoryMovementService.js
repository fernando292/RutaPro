import {
  doc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";


import { db } from "../../config/firebase";



const movementsCollection = collection(
  db,
  "inventoryMovements"
);





// Obtener producto

const getProduct = async (

  productId

) => {


  const productRef = doc(

    db,

    "products",

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








// Actualizar stock

const updateStock = async (

  productId,

  newStock

) => {


  const productRef = doc(

    db,

    "products",

    productId

  );



  await updateDoc(

    productRef,

    {

      stock:newStock

    }

  );


};









// Crear movimiento

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









// Descontar stock por pedido

export const discountStock = async (

  items,

  companyId

) => {


  if (!companyId) {

    throw new Error(
      "No existe companyId"
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




    if (currentStock < quantity) {


      throw new Error(

        `Stock insuficiente para ${product.name}`

      );


    }





    const newStock =

      currentStock - quantity;






    await updateStock(

      product.id,

      newStock

    );







    await registerMovement(

      companyId,

      product,

      quantity,

      "SALIDA",

      currentStock,

      newStock,

      "Salida por pedido"

    );



  }



};











// Aumentar stock

export const increaseStock = async (

  items,

  companyId,

  reason = "Entrada de inventario"

) => {


  if (!companyId) {

    throw new Error(
      "No existe companyId"
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





    const newStock =

      currentStock + quantity;







    await updateStock(

      product.id,

      newStock

    );







    await registerMovement(

      companyId,

      product,

      quantity,

      "ENTRADA",

      currentStock,

      newStock,

      reason

    );



  }



};