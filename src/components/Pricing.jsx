import styles from './Pricing.module.css'

const plans = [
  {
    tag: 'Esencial',
    name: 'Básico',
    price: '499',
    featured: false,
    features: [
      { text: '1 diseño de invitación', active: true },
      { text: 'Hasta 100 invitados', active: true },
      { text: 'Confirmación RSVP', active: true },
      { text: 'Galería de fotos', active: false },
      { text: 'Música de fondo', active: false },
      { text: 'Soporte prioritario', active: false },
    ],
  },
  {
    tag: 'Completo',
    name: 'Elegance',
    price: '899',
    featured: true,
    badge: 'Más popular',
    features: [
      { text: '1 diseño personalizado', active: true },
      { text: 'Invitados ilimitados', active: true },
      { text: 'Confirmación RSVP', active: true },
      { text: 'Galería de fotos', active: true },
      { text: 'Música de fondo', active: true },
      { text: 'Soporte prioritario', active: false },
    ],
  },
  {
    tag: 'Premium',
    name: 'Luxe',
    price: '1,399',
    featured: false,
    features: [
      { text: 'Diseño completamente a medida', active: true },
      { text: 'Invitados ilimitados', active: true },
      { text: 'Confirmación RSVP', active: true },
      { text: 'Galería de fotos premium', active: true },
      { text: 'Música de fondo', active: true },
      { text: 'Soporte prioritario 24/7', active: true },
    ],
  },
]

export default function Pricing() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.section} id="precios">
      <div className={styles.titleCenter}>
        <span className="section-label">Planes</span>
        <h2 className="section-title">
          Elige tu <em>experiencia</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`${styles.plan} ${plan.featured ? styles.featured : ''}`}
          >
            {plan.badge && (
              <div className={styles.popularBadge}>{plan.badge}</div>
            )}
            <span className={styles.planTag}>{plan.tag}</span>
            <p className={styles.planName}>{plan.name}</p>
            <p className={styles.planPrice}>
              <sup>$</sup>{plan.price}
            </p>
            <p className={styles.planPeriod}>pago único · MXN</p>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {plan.features.map((f, i) => (
                <li key={i} className={f.active ? styles.active : ''}>
                  {f.text}
                </li>
              ))}
            </ul>
            <button className={styles.planBtn} onClick={scrollToContact}>
              Elegir plan
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
