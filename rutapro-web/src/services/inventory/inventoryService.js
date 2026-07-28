import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
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


  const ref = doc(

    db,

    "products",

    productId

  );



  const snapshot = await getDoc(ref);



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






// Actualizar stock del producto

const updateStock = async (

  productId,

  newStock

) => {


  const ref = doc(

    db,

    "products",

    productId

  );



  await updateDoc(

    ref,

    {

      stock:newStock

    }

  );


};








// Registrar movimiento de inventario

const registerMovement = async (

  companyId,

  product,

  quantity,

  type,

  reference,

  previousStock,

  newStock

) => {



  await addDoc(

    movementsCollection,

    {


      companyId,


      productId: product.id,


      productName: product.name,


      quantity,


      type,


      previousStock,


      newStock,


      reason:
      type === "SALIDA"
      ? "Salida por pedido"
      : "Entrada de inventario",


      reference,


      createdAt: serverTimestamp()


    }

  );


};









// Descontar inventario por pedido

export const discountInventory = async (

  companyId,

  items,

  orderId

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

        `No hay suficiente stock de ${product.name}`

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

      orderId,

      currentStock,

      newStock

    );



  }



};









// Obtener movimientos de inventario por empresa

export const getInventoryMovements = async (

  companyId

) => {



  if (!companyId) {


    throw new Error(

      "No existe companyId"

    );


  }






  const q = query(


    movementsCollection,


    where(

      "companyId",

      "==",

      companyId

    )


  );






  const snapshot = await getDocs(q);






  return snapshot.docs.map((doc) => ({



    id: doc.id,


    ...doc.data()



  }));



};