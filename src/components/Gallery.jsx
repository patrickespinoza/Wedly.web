"use client";

import styles from './Gallery.module.css'

const invitations = [
  {
    id: 1,
    url: "https://invitacion-web-01-b69a.vercel.app/",
    name: 'Clasica',
    tag: 'Clasico',
    desc: 'Elegancia clasica',
    image: "./Invitacion-01.png",
  },
  {
    id: 2,
    url: "https://invitacion-web-02.vercel.app/",
    name: 'Completo',
    tag: 'Elegance',
    desc: 'Elegance',
    image: "./Invitacion-02.png",
  },
  {
    id: 3,
    url: "https://invitacion-web-03.vercel.app/",
    name: 'Premium',
    tag: 'Luxe',
    desc: 'Luxe',
    image: "./Invitacion-03.png",
  },
]

export default function Gallery() {
  return (
    <section className={styles.section} id="galeria">
      
      <div className={styles.titleRow}>
        <div>
          <h2 className={styles.title}>
            Nuestras <em>invitaciones</em>
          </h2>
        </div>

        <p className={styles.desc}>
          Cada diseño está pensado para reflejar la personalidad única de cada pareja.
        </p>
      </div>

      <div className={styles.grid}>
        {invitations.map((inv) => (
          <a
            key={inv.id}
            href={inv.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            {/* IMAGEN */}
            <div className={styles.cardImg}>
              <img 
                src={inv.image} 
                alt={inv.name} 
                className={styles.image}
              />

              <span className={styles.badge}>
                {inv.tag}
              </span>
            </div>

            {/* INFO */}
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>{inv.name}</h3>
              <p className={styles.cardText}>{inv.desc}</p>
            </div>

            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}