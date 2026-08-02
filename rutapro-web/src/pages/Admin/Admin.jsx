import { useEffect, useState } from "react";

import {
  Users
} from "lucide-react";


import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Modal from "../../components/ui/Modal/Modal";

import UserForm from "./UserForm";


import { useAuth } from "../../context/AuthContext";

import {
  getUsersByCompany
} from "../../services/user/userService";


import "./Admin.css";



function Admin() {


  const { profile } = useAuth();


  const [users,setUsers] = useState([]);

  const [openModal,setOpenModal] = useState(false);



  useEffect(()=>{


    if(profile?.companyId){

      loadUsers();

    }


  },[profile?.companyId]);



  const loadUsers = async()=>{


    const data = await getUsersByCompany(

      profile.companyId

    );


    setUsers(data);


  };



  const handleSuccess = async()=>{


    setOpenModal(false);


    await loadUsers();


  };



  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Topbar />


        <main className="admin-page">


          <div className="admin-header">


            <div>

              <h1>

                Usuarios

              </h1>


              <p>

                Gestiona los usuarios de tu empresa.

              </p>


            </div>



            <button

              className="add-user-button"

              onClick={()=>setOpenModal(true)}

            >

              + Nuevo usuario

            </button>


          </div>



          <div className="users-card">


            {

              users.length === 0 ? (

                <p>

                  No hay usuarios registrados.

                </p>

              ) : (


                users.map((user)=>(


                  <div

                    className="user-item"

                    key={user.id}

                  >


                    <Users size={24}/>


                    <div>


                      <h3>

                        {user.name}

                      </h3>


                      <span>

                        {user.email}

                      </span>


                      <small>

                        {user.role}

                      </small>


                    </div>


                  </div>


                ))

              )

            }


          </div>



        </main>


      </div>



      <Modal

        isOpen={openModal}

        onClose={()=>setOpenModal(false)}

      >


        <UserForm

          companyId={profile?.companyId}

          onSuccess={handleSuccess}

        />


      </Modal>



    </div>

  );

}


export default Admin;