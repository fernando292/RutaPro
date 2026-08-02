import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  limit,
  query
} from "firebase/firestore";

import { db } from "../../config/firebase";



const companiesCollection = collection(
  db,
  "companies"
);





// =============================
// OBTENER PRIMERA EMPRESA
// =============================

export const getCompany = async () => {


  const q = query(

    companiesCollection,

    limit(1)

  );


  const snapshot = await getDocs(q);



  if(snapshot.empty){

    return null;

  }



  const companyDoc = snapshot.docs[0];

  const data = companyDoc.data();



  return normalizeCompany(
    companyDoc.id,
    data
  );


};








// =============================
// OBTENER EMPRESA POR ID
// =============================


export const getCompanyById = async(companyId)=>{


  if(!companyId){

    return null;

  }



  const companyRef = doc(

    db,

    "companies",

    companyId

  );



  const snapshot = await getDoc(companyRef);



  if(!snapshot.exists()){

    return null;

  }



  const data = snapshot.data();



  console.log(
    "DATOS FIRESTORE EMPRESA:",
    data
  );



  return normalizeCompany(

    snapshot.id,

    data

  );


};









// =============================
// NORMALIZAR EMPRESA
// =============================


const normalizeCompany = (

  id,

  data

)=>{


  return {


    id,


    ...data,



    settings:{


      currency:"COP",


      minimumStock:10,


      operationZone:"Colombia",


      ...(data.settings || {})


    },




    branding:{


      commercialName:

        data.branding?.commercialName ||

        data.name ||

        "",



      primaryColor:

        data.branding?.primaryColor ||

        "#2563eb",




      logo:

        data.branding?.logo ||

        ""



    }



  };


};









// =============================
// CREAR EMPRESA
// =============================


export const addCompany = async(company)=>{


  const response = await addDoc(

    companiesCollection,


    {


      ...company,



      settings:{


        currency:"COP",


        minimumStock:10,


        operationZone:"Colombia",


        ...(company.settings || {})


      },




      branding:{


        commercialName:

          company.branding?.commercialName ||

          company.name ||

          "",



        primaryColor:

          company.branding?.primaryColor ||

          "#2563eb",



        logo:

          company.branding?.logo ||

          ""



      },




      createdAt:new Date()


    }


  );



  console.log(

    "Empresa creada:",

    response.id

  );



  return response;


};









// =============================
// ACTUALIZAR EMPRESA
// =============================


export const updateCompany = async(

  id,

  company

)=>{


  const companyRef = doc(

    db,

    "companies",

    id

  );




  return await updateDoc(

    companyRef,


    {


      ...company,



      settings:{


        currency:"COP",


        minimumStock:10,


        operationZone:"Colombia",


        ...(company.settings || {})


      },




      branding:{


        commercialName:

          company.branding?.commercialName ||

          company.name ||

          "",




        primaryColor:

          company.branding?.primaryColor ||

          "#2563eb",




        logo:

          company.branding?.logo ||

          ""



      }


    }


  );


};