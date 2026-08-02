import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  storage
} from "../../config/firebase";



// Subir logo de empresa

export const uploadCompanyLogo = async (

  file,

  companyId

) => {


  if(!file || !companyId){

    throw new Error(
      "Archivo o empresa no válidos"
    );

  }



  const fileExtension =

    file.name.split(".").pop();



  const fileName =

    `logo.${fileExtension}`;



  const storageRef = ref(

    storage,

    `companies/${companyId}/branding/${fileName}`

  );



  await uploadBytes(

    storageRef,

    file

  );



  const url = await getDownloadURL(

    storageRef

  );



  return url;


};