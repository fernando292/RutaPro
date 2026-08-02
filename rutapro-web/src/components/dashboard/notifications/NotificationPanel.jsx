import "./NotificationPanel.css";


function NotificationPanel({

  notifications = []

}) {



  return (


    <div className="notification-panel">


      <h3>

        Notificaciones

      </h3>



      <div className="notification-count">

        {notifications.length}

      </div>



      {


        notifications.length === 0 ? (


          <div className="notification-empty">

            No hay notificaciones.

          </div>


        ) : (



          notifications.map((item, index) => (


            <div

              key={index}

              className="notification-item"

            >


              <strong>

                {item.title}

              </strong>



              <p>

                {item.message}

              </p>



            </div>


          ))


        )


      }



    </div>


  );

}


export default NotificationPanel;