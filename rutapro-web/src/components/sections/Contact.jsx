import "./Contact.css";

function Contact() {

  return (

    <section
      id="contacto"
      className="contact"
    >

      <div className="contact-info">

        <span className="contact-tag">
          Solicita una demostración
        </span>

        <h2>
          Lleva tu empresa
          al siguiente nivel
        </h2>

        <p>
          Descubre cómo RutaPro puede ayudarte a
          organizar pedidos, inventario, clientes
          y rutas de distribución desde una sola
          plataforma.
        </p>

        <div className="contact-benefits">

          <div>✅ Implementación rápida</div>

          <div>✅ Soporte personalizado</div>

          <div>✅ Plataforma en la nube</div>

          <div>✅ Prueba gratuita</div>

        </div>

      </div>



      <form className="contact-form">

        <input
          type="text"
          placeholder="Nombre de la empresa"
        />

        <input
          type="text"
          placeholder="Nombre del contacto"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
        />

        <input
          type="tel"
          placeholder="Teléfono"
        />

        <input
          type="text"
          placeholder="Ciudad"
        />

        <textarea
          rows="5"
          placeholder="Cuéntanos sobre tu empresa..."
        ></textarea>

        <button type="submit">
          Solicitar demostración
        </button>

      </form>

    </section>

  );

}

export default Contact;