import "./Button.css";

function Button({

  children,

  variant = "primary",

  size = "md",

  loading = false,

  disabled = false,

  type = "button",

  className = "",

  ...props

}) {

  return (

    <button

      type={type}

      disabled={disabled || loading}

      className={`rp-button rp-${variant} rp-${size} ${className}`}

      {...props}

    >

      {loading ? "Cargando..." : children}

    </button>

  );

}

export default Button;