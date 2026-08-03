import "./Input.css";

function Input({

  label,

  error,

  icon,

  className = "",

  ...props

}) {

  return (

    <div className={`rp-input-group ${className}`}>

      {label && (

        <label className="rp-input-label">

          {label}

        </label>

      )}


      <div className="rp-input-wrapper">

        {icon && (

          <span className="rp-input-icon">

            {icon}

          </span>

        )}


        <input

          className={`rp-input ${error ? "rp-input-error" : ""}`}

          {...props}

        />


      </div>


      {error && (

        <span className="rp-input-message">

          {error}

        </span>

      )}

    </div>

  );

}

export default Input;