
import styles from "./Footer.module.css";

const WHATSAPP_PHONE = "522224649120";

const whatsappMessage = encodeURIComponent(
  "Hola, equipo Wedly. Me gustaría recibir información sobre sus invitaciones digitales."
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* IDENTIDAD DE MARCA */}
        <div className={styles.brand}>
          <a href="#inicio" className={styles.logo}>
            Wedly<span>.</span>
          </a>

          <span className={styles.brandLabel}>
            INVITACIONES DIGITALES
          </span>

          <p className={styles.brandDescription}>
            Cada historia merece una invitación única.
            Creamos experiencias digitales elegantes
            para bodas y XV años.
          </p>
        </div>

        {/* NAVEGACIÓN Y CONTACTO */}
        <div className={styles.columns}>
          <nav
            className={styles.column}
            aria-label="Navegación del pie de página"
          >
            <h3>EXPLORA</h3>

            <a href="#inicio">Inicio</a>

            <a href="#galeria">
              Nuestros diseños
            </a>

            <a href="#invitaciones-reales">
              Invitaciones reales
            </a>

            <a href="#precios">
              Paquetes
            </a>

            <a href="#extras">
              Complementos
            </a>

            <a href="#contacto">
              Contacto
            </a>
          </nav>

          <div className={styles.column}>
            <h3>CONTÁCTANOS</h3>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>

            <a
              href="https://instagram.com/wedly_invitaciones"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>

            <a href="mailto:wedly680@gmail.com">
              Correo electrónico ↗
            </a>

            <a
              href="https://wedly.my/"
              target="_blank"
              rel="noopener noreferrer"
            >
              wedly.my ↗
            </a>
          </div>
        </div>

        {/* PARTE INFERIOR */}
        <div className={styles.bottom}>
          <p>
            © {year} Wedly. Todos los derechos reservados.
          </p>

          <p>
            Invitaciones digitales para bodas y XV años
            <span className={styles.dot}>✦</span>
            Puebla, México
          </p>
        </div>
      </div>
    </footer>
  );
}
