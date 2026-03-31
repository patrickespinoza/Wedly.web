import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className={styles.section} id="contacto">
      <div className={styles.inner}>
        <span className="section-label">Contacto</span>
        <h2 className="section-title">
          Comencemos a <em>crear</em>
        </h2>
        <p className={styles.desc}>
          ¿Lista para hacer realidad tu invitación de ensueño? Escríbenos
          y con gusto te asesoramos sin costo.
        </p>

        <div className={styles.cards}>
          <a
            href="https://wa.me/522221234567"
            target="_blank"
            rel="noreferrer"
            className={styles.card}
          >
            <div className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h4>WhatsApp</h4>
            <p>Respuesta inmediata</p>
            <span className={styles.link}>Escribir mensaje →</span>
          </a>

          <a
            href="mailto:hola@wedly.mx"
            className={styles.card}
          >
            <div className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h4>Correo</h4>
            <p>hola@wedly.mx</p>
            <span className={styles.link}>Enviar correo →</span>
          </a>
        </div>

        <p className={styles.social}>
          También disponibles en Instagram · <strong>@wedly.mx</strong>
        </p>
      </div>
    </section>
  )
}
