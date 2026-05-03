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
          {/* WHATSAPP */}
          <a
            href="https://wa.me/522224649120"
            target="_blank"
            rel="noreferrer"
            className={styles.card}
          >
            <div className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>

            <h4>WhatsApp</h4>
            <p>Respuesta inmediata</p>

            <span className={styles.link}>Escribir mensaje →</span>
          </a>

        
  {/* INSTAGRAM */}
<a
  href="https://instagram.com/wedly_680"
  target="_blank"
  rel="noreferrer"
  className={styles.card}
>
  <div className={styles.icon}>
    {/* ICONO INSTAGRAM */}
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#000" 
      strokeWidth="1.5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17" cy="7" r="1.5"/>
    </svg>
  </div>

  <h4>Instragram</h4>
  <p>@Wedly6</p>

  <span className={styles.link}>Ir a Instragram →</span>
</a>
        </div>


        {/* CORREO ABAJO */}
        <p className={styles.social}>
          Correo:{" "}
          <a href="mailto:wedly680@gmail.com">
            <strong>wedly680@gmail.com</strong>
          </a>
        </p>
      </div>
    </section>
  )
}