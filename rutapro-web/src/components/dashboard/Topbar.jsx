import { useEffect, useState } from "react";

import {
  Search,
  UserCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getNotifications
} from "../../services/notifications/notificationService";

import NotificationBell from "./notifications/NotificationBell";
import NotificationPanel from "./notifications/NotificationPanel";

import "./Topbar.css";



function Topbar() {


  const { user, profile } = useAuth();



  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([]);



  useEffect(() => {


    if(profile?.companyId){


      loadNotifications();


    }


  }, [profile?.companyId]);




  const loadNotifications = async () => {


    try {


      const data = await getNotifications(

        profile.companyId

      );


      setNotifications(data);



    } catch(error) {


      console.error(

        "Error cargando notificaciones:",

        error

      );


    }


  };





  return (


    <header className="topbar">



      <div className="topbar-search">


        <Search size={20} />


        <input

          type="text"

          placeholder="Buscar..."

        />


      </div>





      <div className="topbar-right">



        <div

          style={{

            position: "relative"

          }}

        >



          <NotificationBell


            count={notifications.length}


            onClick={() =>


              setShowNotifications(

                !showNotifications

              )


            }


          />




          {


            showNotifications && (


              <NotificationPanel


                notifications={notifications}


              />


            )


          }



        </div>






        <div className="user-info">


          <UserCircle size={36} />



          <div>


            <p className="user-name">


              {

                profile?.name ||

                user?.email ||

                "Usuario"

              }


            </p>



            <span>


              {

                profile?.role ||

                "Usuario"

              }


            </span>



          </div>


        </div>



      </div>



    </header>


  );


}


export default Topbar;