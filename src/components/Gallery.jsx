"use client";

import styles from './Gallery.module.css'

const invitations = [
  {
    id: 1,
    url: "https://invitacion-web-01-b69a.vercel.app/",
    name: 'Colección Marfil',
    tag: 'Clásica',
    desc: 'Elegancia atemporal · Tipografía serif',
    bg: '#0e0d09',
    preview: (
      <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="320" fill="#0e0d09"/>
        <rect x="20" y="20" width="240" height="280" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.3"/>
        <rect x="30" y="30" width="220" height="260" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.2"/>
        <text x="140" y="100" textAnchor="middle" fontSize="10" fill="#c9a96e">SAVE THE DATE</text>
      </svg>
    ),
  },
  {
    id: 2,
    url: "https://invitacion-web-02.vercel.app/",
    name: 'Colección Selva',
    tag: 'Botánica',
    desc: 'Naturaleza y frescura · Tonos esmeralda',
    bg: '#080c0b',
    preview: (
      <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="320" fill="#080c0b"/>
      </svg>
    ),
  },
  {
    id: 3,
    url: "https://invitacion-web-03.vercel.app/",
    name: 'Colección Violeta',
    tag: 'Nocturna',
    desc: 'Sofisticación profunda · Tonos amatista',
    bg: '#0c090e',
    preview: (
      <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="320" fill="#0c090e"/>
      </svg>
    ),
  },
]

export default function Gallery() {
  return (
    <section className={styles.section} id="galeria">
      <div className={styles.titleRow}>
        <div>
          <span className="section-label">Colección 2025</span>
          <h2 className="section-title">
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
            <div className={styles.cardImg} style={{ background: inv.bg }}>
              {inv.preview}
              <span className={styles.badge}>{inv.tag}</span>
            </div>

            <div className={styles.cardInfo}>
              <h3>{inv.name}</h3>
              <p>{inv.desc}</p>
            </div>

            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}