import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";

import { getUserProfile } from "../services/user/userService";
import { getCompanyById } from "../services/companies/companyService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        try {

          setLoading(true);

          if (!currentUser) {

            setUser(null);
            setProfile(null);
            setCompany(null);

            return;

          }

          const userData = await getUserProfile(
            currentUser.uid
          );

          setUser(currentUser);
          setProfile(userData);

          if (userData?.companyId) {

            const companyData = await getCompanyById(
              userData.companyId
            );

            setCompany(companyData);

          } else {

            setCompany(null);

          }

        } catch (error) {

          console.error(
            "Error cargando autenticación:",
            error
          );

          setUser(null);
          setProfile(null);
          setCompany(null);

        } finally {

          setLoading(false);

        }

      }
    );

    return unsubscribe;

  }, []);

  const value = useMemo(() => ({

    user,

    profile,

    company,

    loading

  }), [

    user,

    profile,

    company,

    loading

  ]);

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}