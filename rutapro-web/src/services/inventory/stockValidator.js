import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../../config/firebase";


export const validateStock = async (
  items,
  companyId
) => {


  if (!companyId) {

    return {

      valid:false,

      message:"Empresa no identificada."

    };

  }



  for (const item of items) {


    const q = query(

      collection(db,"products"),

      where(
        "companyId",
        "==",
        companyId
      )

    );



    const snapshot = await getDocs(q);



    const product = snapshot.docs.find(

      doc => doc.id === item.productId

    );



    if (!product) {


      return {

        valid:false,

        message:
        `Producto no encontrado: ${item.productName}`

      };


    }



    const data = product.data();



    if (
      Number(data.stock || 0)
      <
      Number(item.quantity)
    ) {


      return {

        valid:false,

        message:
        `Stock insuficiente para ${data.name}`

      };


    }


  }



  return {

    valid:true

  };


};