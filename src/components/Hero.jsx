import styles from './Hero.module.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.ornament} />

      {/* TAG */}
      <p className={styles.tag}>
        Invitaciones digitales de boda
      </p>

      {/* TITULO */}
      <h1 className={styles.heading}>
        Cada amor <br />
        merece una <br />
        <em>historia única</em>
      </h1>

      {/* SUBTEXTO */}
      <p className={styles.sub}>
        Creamos invitaciones web elegantes y personalizadas
        que reflejan la esencia de tu gran día.
      </p>

      {/* DIVIDER */}
      <div className={styles.divider}>
        <span />
        <i>✧</i>
        <span />
      </div>

      {/* BOTONES */}
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
          Contacto
        </button>
      </div>

      {/* SCROLL */}
      <div className={styles.scroll}>
        <span>Descubrir</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}