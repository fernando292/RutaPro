import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


import {
  onAuthStateChanged
} from "firebase/auth";


import {
  auth
} from "../config/firebase";


import {
  getUserProfile
} from "../services/user/userService";


import {
  getCompanyById
} from "../services/companies/companyService";



const AuthContext = createContext();



export function AuthProvider({ children }) {


  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);





  useEffect(() => {


    const unsubscribe = onAuthStateChanged(

      auth,

      async(currentUser) => {


        try {


          setLoading(true);



          if(currentUser){


            console.log(
              "AUTH USER:",
              currentUser
            );



            const userData = await getUserProfile(

              currentUser.uid

            );



            console.log(
              "AUTH PROFILE:",
              userData
            );



            setUser(currentUser);

            setProfile(userData);





            if(userData?.companyId){



              const companyData = await getCompanyById(

                userData.companyId

              );



              console.log(
                "EMPRESA CONTEXTO:",
                companyData
              );



              setCompany(companyData);



            }else{


              setCompany(null);


            }





          }else{



            setUser(null);

            setProfile(null);

            setCompany(null);



          }



        }catch(error){


          console.error(

            "Error cargando autenticación:",

            error

          );



          setUser(null);

          setProfile(null);

          setCompany(null);



        }finally{


          setLoading(false);


        }


      }


    );



    return () => unsubscribe();



  }, []);







  return (


    <AuthContext.Provider


      value={{


        user,

        profile,

        company,

        loading


      }}


    >


      {children}


    </AuthContext.Provider>


  );


}







export function useAuth(){


  return useContext(AuthContext);


}