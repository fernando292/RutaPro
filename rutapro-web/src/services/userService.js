import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit
} from "firebase/firestore";


import { db } from "../config/firebase";


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



  if(snapshot.empty){

    return null;

  }



  const data = snapshot.docs[0];


  return {

    id:data.id,

    ...data.data()

  };


};