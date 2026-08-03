import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../../config/firebase";


const usersCollection = collection(
  db,
  "users"
);


// Crear perfil de usuario

export const createUserProfile = async (user) => {

  return await addDoc(
    usersCollection,
    user
  );

};



// Buscar usuario por uid

export const getUserProfile = async (uid) => {


  let attempts = 0;


  while(attempts < 5){


    const q = query(

      usersCollection,

      where(
        "uid",
        "==",
        uid
      ),

      limit(1)

    );


    const snapshot = await getDocs(q);



    if(!snapshot.empty){


      const data = snapshot.docs[0];


      return {

        id:data.id,

        ...data.data()

      };


    }



    attempts++;


    await new Promise(

      resolve => setTimeout(resolve,1000)

    );


  }



  return null;


};



// Obtener usuarios de una empresa

export const getUsersByCompany = async (companyId) => {


  const q = query(

    usersCollection,

    where(
      "companyId",
      "==",
      companyId
    )

  );


  const snapshot = await getDocs(q);



  return snapshot.docs.map((item)=>({

    id:item.id,

    ...item.data()

  }));

};



// Actualizar usuario

export const updateUserProfile = async (

  id,

  data

)=>{


  const userRef = doc(

    db,

    "users",

    id

  );


  return await updateDoc(

    userRef,

    data

  );


};