import "./footerStyle.css";

export default function Footer(params) {
    return (
<footer>
  <div className="foot-container">
    <div className="row">
      <div className="col-md-4">
        <h4>Nosotros</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      </div>
      <div className="col-md-4">
        <h4>Contacto</h4> 
        <p>Av. Siempre Viva 123, Springfield</p>
        <p>Teléfono: (123) 456-7890</p>
        <p>Email: info@ejemplo.com</p>
      </div>
      <div className="col-md-4">
        <h4>Síguenos</h4>
        <ul className="social-icons">
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    )
}