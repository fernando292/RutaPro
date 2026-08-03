import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";


import { db } from "../../config/firebase";



const ordersCollection = collection(
  db,
  "orders"
);





// Obtener pedidos empresa

export const getOrders = async(companyId)=>{


  try{


    if(!companyId){

      console.warn(
        "companyId vacío"
      );

      return [];

    }



    const q = query(

      ordersCollection,

      where(
        "companyId",
        "==",
        companyId
      )

    );




    const snapshot = await getDocs(q);



    return snapshot.docs.map(doc=>({

      id:doc.id,

      ...doc.data()

    }));



  }catch(error){


    console.error(
      "Error obteniendo pedidos:",
      error
    );


    throw error;


  }


};









// Pedidos recientes dashboard

export const getRecentOrders = async(

 companyId,

 limitNumber=5

)=>{


  try{


    if(!companyId){

      return [];

    }




    const q = query(

      ordersCollection,

      where(
        "companyId",
        "==",
        companyId
      ),

      orderBy(
        "createdAt",
        "desc"
      ),

      limit(
        limitNumber
      )

    );





    const snapshot = await getDocs(q);



    return snapshot.docs.map(doc=>({

      id:doc.id,

      ...doc.data()

    }));




  }catch(error){


    console.error(

      "Error pedidos recientes:",

      error

    );


    return [];

  }


};









// Crear pedido

export const addOrder = async(

 order,

 companyId

)=>{


 try{


  if(!companyId){

    throw new Error(
      "No existe companyId"
    );

  }



  const data={


    ...order,


    companyId,


    status:
      order.status || "Pendiente",


    createdAt:
      serverTimestamp(),


    orderNumber:
      Date.now()



  };




  const response =
    await addDoc(

      ordersCollection,

      data

    );



  return response;



 }catch(error){


  console.error(

    "Error creando pedido:",

    error

  );


  throw error;


 }


};









// Actualizar pedido

export const updateOrder = async(

 id,

 order

)=>{


 const ref = doc(

   db,

   "orders",

   id

 );



 return updateDoc(

   ref,

   {

    ...order,

    updatedAt:
      serverTimestamp()

   }

 );


};









// Eliminar pedido

export const deleteOrder = async(id)=>{


 const ref = doc(

   db,

   "orders",

   id

 );


 return deleteDoc(ref);


};









// Obtener pedidos por IDs

export const getOrdersByIds = async(ids)=>{


 try{


  if(
    !ids ||
    ids.length===0
  ){

    return [];

  }



  const result=[];



  for(const id of ids){


    const ref =
      doc(

        db,

        "orders",

        id

      );



    const snapshot =
      await getDocs(
        query(
          ordersCollection,
          where(
            "__name__",
            "==",
            id
          )
        )
      );



    snapshot.forEach(item=>{


      result.push({

        id:item.id,

        ...item.data()

      });


    });


  }




  return result;



 }catch(error){


  console.error(

    "Error buscando pedidos:",

    error

  );


  throw error;


 }


};