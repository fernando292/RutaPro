import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  limit,
  query
} from "firebase/firestore";

import { db } from "../config/firebase";


const companiesCollection = collection(
  db,
  "companies"
);



// Obtener empresa principal

export const getCompany = async () => {


  const q = query(
    companiesCollection,
    limit(1)
  );


  const snapshot = await getDocs(q);



  if (snapshot.empty) {

    return null;

  }



  const company = snapshot.docs[0];


  return {

    id: company.id,

    ...company.data()

  };


};




// Crear empresa

export const addCompany = async (company) => {


  const response = await addDoc(

    companiesCollection,

    company

  );


  console.log(
    "Empresa creada:",
    response.id
  );


  return response;


};





// Actualizar empresa

export const updateCompany = async (

  id,

  company

) => {


  const companyRef = doc(

    db,

    "companies",

    id

  );



  return await updateDoc(

    companyRef,

    company

  );


};