import styles from './Hero.module.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.ornament} />

      <p className={styles.tag}>Invitaciones digitales para bodas</p>

      <h1 className={styles.heading}>
        Cada amor<br />
        merece una<br />
        <em>historia única</em>
      </h1>

      <p className={styles.sub}>
        Invitaciones web elegantes y personalizadas que capturan
        la esencia de tu día especial.
      </p>

      <div className={styles.divider}>
        <span />
        <i>∿</i>
        <span />
      </div>

      <div className={styles.btns}>
        <button
          className={styles.btnPrimary}
          onClick={() => scrollTo('galeria')}
        >
          Ver invitaciones
        </button>
        <button
          className={styles.btnOutline}
          onClick={() => scrollTo('contacto')}
        >
          Contáctanos
        </button>
      </div>

      <div className={styles.scroll}>
        <span>Descubrir</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
