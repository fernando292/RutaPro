import "./Header.css";

function Header() {
  return (
    <header className="header">
      
      <div className="logo">
        Ruta<span>Pro</span>
      </div>

      <nav className="nav">
        <a href="#">Inicio</a>
        <a href="#">Soluciones</a>
        <a href="#">Funciones</a>
        <a href="#">Contacto</a>
      </nav>

      <div className="header-buttons">

        <button className="btn-login">
          Iniciar sesión
        </button>

        <button 
          className="btn-primary"
          style={{
            background: "#2563EB",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600"
          }}
        >
          Comenzar
        </button>

      </div>

    </header>
  );
}

export default Header;