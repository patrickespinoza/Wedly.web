import styles from './Gallery.module.css'

const invitations = [
  {
    id: 1,
    name: 'Colección Marfil',
    tag: 'Clásica',
    desc: 'Elegancia atemporal · Tipografía serif',
    bg: '#0e0d09',
    preview: (
      <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="320" fill="#0e0d09"/>
        <rect x="20" y="20" width="240" height="280" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.3"/>
        <rect x="30" y="30" width="220" height="260" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.2"/>
        <text x="140" y="100" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#c9a96e" opacity="0.6" letterSpacing="4">SAVE THE DATE</text>
        <text x="140" y="145" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill="#e8e2d9" fontStyle="italic">Sofía</text>
        <text x="140" y="162" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#c9a96e" opacity="0.5">&amp;</text>
        <text x="140" y="185" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill="#e8e2d9" fontStyle="italic">Alejandro</text>
        <line x1="80" y1="205" x2="200" y2="205" stroke="#c9a96e" strokeWidth="0.5" opacity="0.4"/>
        <text x="140" y="225" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#7a7068" letterSpacing="3">15 · JUNIO · 2025</text>
        <text x="140" y="244" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="#7a7068" letterSpacing="2">CIUDAD DE MÉXICO</text>
        <circle cx="140" cy="78" r="6" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5"/>
        <circle cx="140" cy="78" r="3" fill="#c9a96e" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Colección Selva',
    tag: 'Botánica',
    desc: 'Naturaleza y frescura · Tonos esmeralda',
    bg: '#080c0b',
    preview: (
      <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="320" fill="#080c0b"/>
        <circle cx="140" cy="160" r="110" fill="none" stroke="#1d9e75" strokeWidth="0.4" opacity="0.2"/>
        <circle cx="140" cy="160" r="85" fill="none" stroke="#1d9e75" strokeWidth="0.3" opacity="0.15"/>
        <text x="140" y="90" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="#5dcaa5" opacity="0.7" letterSpacing="5">BODA</text>
        <text x="140" y="140" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fill="#e8e2d9" fontStyle="italic">Valentina</text>
        <text x="140" y="155" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#5dcaa5" opacity="0.5">&amp;</text>
        <text x="140" y="178" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fill="#e8e2d9" fontStyle="italic">Rodrigo</text>
        <line x1="110" y1="197" x2="170" y2="197" stroke="#5dcaa5" strokeWidth="0.4" opacity="0.4"/>
        <text x="140" y="217" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="#7a7068" letterSpacing="3">22 · MARZO · 2025</text>
        <path d="M120,68 C130,50 150,50 160,68" fill="none" stroke="#5dcaa5" strokeWidth="0.5" opacity="0.35"/>
        <path d="M115,72 C125,55 155,55 165,72" fill="none" stroke="#5dcaa5" strokeWidth="0.3" opacity="0.2"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Colección Violeta',
    tag: 'Nocturna',
    desc: 'Sofisticación profunda · Tonos amatista',
    bg: '#0c090e',
    preview: (
      <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="320" fill="#0c090e"/>
        <rect x="25" y="25" width="230" height="270" fill="none" stroke="#7f77dd" strokeWidth="0.4" opacity="0.2"/>
        <line x1="25" y1="80" x2="255" y2="80" stroke="#7f77dd" strokeWidth="0.3" opacity="0.15"/>
        <line x1="25" y1="240" x2="255" y2="240" stroke="#7f77dd" strokeWidth="0.3" opacity="0.15"/>
        <text x="140" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7" fill="#afa9ec" opacity="0.7" letterSpacing="6">TE INVITAMOS A CELEBRAR</text>
        <text x="140" y="150" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fill="#e8e2d9" fontStyle="italic">Isabella</text>
        <text x="140" y="168" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#afa9ec" opacity="0.5">&amp;</text>
        <text x="140" y="192" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fill="#e8e2d9" fontStyle="italic">Marcos</text>
        <line x1="70" y1="210" x2="210" y2="210" stroke="#7f77dd" strokeWidth="0.5" opacity="0.3"/>
        <text x="140" y="228" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="#7a7068" letterSpacing="3">08 · OCTUBRE · 2025</text>
        <rect x="55" y="250" width="170" height="28" fill="none" stroke="#7f77dd" strokeWidth="0.3" opacity="0.2"/>
        <text x="140" y="269" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7" fill="#afa9ec" opacity="0.5" letterSpacing="3">CONFIRMAR ASISTENCIA</text>
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
          <div key={inv.id} className={styles.card}>
            <div className={styles.cardImg} style={{ background: inv.bg }}>
              {inv.preview}
              <span className={styles.badge}>{inv.tag}</span>
            </div>
            <div className={styles.cardInfo}>
              <h3>{inv.name}</h3>
              <p>{inv.desc}</p>
            </div>
            <span className={styles.arrow}>→</span>
          </div>
        ))}
      </div>
    </section>
  )
}
