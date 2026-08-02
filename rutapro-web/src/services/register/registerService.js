import { updateProfile } from "firebase/auth";

import { register } from "../auth/authService";
import { addCompany } from "../companies/companyService";
import { createUserProfile } from "../user/userService";

export const registerCompany = async (form) => {

  const userCredential = await register(

    form.email,

    form.password

  );

  const firebaseUser = userCredential.user;

  await updateProfile(

    firebaseUser,

    {

      displayName: form.adminName

    }

  );

  const company = await addCompany({

    name: form.companyName,

    phone: form.phone,

    email: form.email,

    ownerUid: firebaseUser.uid,

    active: true,

    plan: "free"

  });

  await createUserProfile({

    uid: firebaseUser.uid,

    companyId: company.id,

    name: form.adminName,

    email: form.email,

    role: "Administrador",

    active: true,

    createdAt: new Date()

  });

  return {

    user: firebaseUser,

    companyId: company.id

  };

};