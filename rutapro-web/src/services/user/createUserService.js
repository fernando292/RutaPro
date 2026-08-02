import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "../../config/firebase";

import {
  createUserProfile
} from "./userService";



export const createCompanyUser = async (data) => {


  const userCredential = await createUserWithEmailAndPassword(

    auth,

    data.email,

    data.password

  );


  const user = userCredential.user;



  await createUserProfile({

    uid:user.uid,

    companyId:data.companyId,

    name:data.name,

    email:data.email,

    role:data.role,

    active:true,

    createdAt:new Date()

  });



  return user;


};