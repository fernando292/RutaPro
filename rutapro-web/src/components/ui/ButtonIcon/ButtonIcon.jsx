import "./ButtonIcon.css";


function ButtonIcon({

  icon,

  onClick,

  type = "default",

  title

}) {


  return (


    <button

      className={`button-icon ${type}`}

      onClick={onClick}

      title={title}

      type="button"

    >


      {icon}


    </button>


  );


}


export default ButtonIcon;