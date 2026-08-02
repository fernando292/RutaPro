import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";



const firebaseConfig = {

  apiKey: "AIzaSyAK8RZkdLkA6ilU9d-0JFG8C_Rq_KSWwUo",

  authDomain: "rutapro-b4f9c.firebaseapp.com",

  projectId: "rutapro-b4f9c",

  storageBucket: "rutapro-b4f9c.firebasestorage.app",

  messagingSenderId: "166677189261",

  appId: "1:166677189261:web:7547b3351cfa141dbf48c4",

};



const app = initializeApp(firebaseConfig);



const auth = getAuth(app);


const db = getFirestore(app);


const storage = getStorage(app);



export {

  auth,

  db,

  storage

};



export default app;