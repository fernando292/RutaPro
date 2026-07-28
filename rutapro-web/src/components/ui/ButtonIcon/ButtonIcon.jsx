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
    >

      {icon}

    </button>

  );

}


export default ButtonIcon;