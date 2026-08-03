import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="page-loader">

      <div className="loader-card">

        <div className="loader-logo">

          🚚

        </div>

        <h2>RutaPro</h2>

        <p>Cargando módulo...</p>

        <div className="loader-bar">

          <div className="loader-progress"></div>

        </div>

      </div>

    </div>
  );
}

export default PageLoader;