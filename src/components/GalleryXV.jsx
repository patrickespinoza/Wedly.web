"use client";

import styles from './Gallery.module.css'

const invitations = [
  {
    id: 1,
    url: "https://prueba2-rho-one.vercel.app/",
    name: 'XV Digital',
    tag: 'XV Digital',
    desc: 'XV Digital',
    image: "./InvitacionXV01.jpg", 
  },
  {
    id: 2,
    url: "https://prueba-mu-ivory.vercel.app/",
    name: 'XV Premium',
    tag: 'XV Premium',
    desc: 'XV Premium',
    image: "./InvitacionXV02.jpg",
  },
]

export default function GalleryXV() {
  return (
    <section className={styles.section} id="galeria">
      
      <div className={styles.titleRow}>
        <div>
          <h2 className={styles.title}>
            Nuestras <em>invitaciones de XV</em>
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