import { Bell } from "lucide-react";

import "./NotificationBell.css";

function NotificationBell({

  count = 0,

  onClick

}) {

  return (

    <button

      className="notification-bell"

      onClick={onClick}

    >

      <Bell size={22} />

      {

        count > 0 && (

          <span className="notification-count">

            {count}

          </span>

        )

      }

    </button>

  );

}

export default NotificationBell;