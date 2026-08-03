"use client";

import styles from "./Pricing.module.css";

const plans = [
  {
    id: "XV Digital",
    name: "XV Digital",
    price: 550,
    featured: false,
    features: [
      { text: "Invitación digital lista para enviar por WhatsApp", active: true },
      { text: "Musíca Personalizada", active: true },
      { text: "Portada Personalizada", active: true },
      { text: "Cuenta Regresiva", active: true },
      { text: "Información del evento: fecha, hora y ubicación por Google Maps", active: true },
      { text: "Itinerario", active: true },
      { text: "Codigo de Vestimenta", active: true },
      { text: "Galeria de Fotos", active: true },
      { text: "Mesa de regalos, Cuenta de deposito o lluvia de sobres", active: true },
      { text: "Confirmación de asistencia por excel", active: true },
    ],
  },
  {
    id: "XV Premium",
    name: "XV Premium",
    price: 800,
    featured: true,
    badge: "Más popular",
    features: [
      { text: "Invitación digital lista para enviar por WhatsApp", active: true },
      { text: "Sobre de invitacion personalizado con numero de pases", active: true },
      { text: "Musica Personalizada", active: true },
      { text: "Cuenta Regresiva", active: true },
      { text: "Frase de la Quinceañera", active: true },
      { text: "Información del evento: fecha, hora y ubicación por Google Maps", active: true },
      { text: "Detalles del evento: código de vestimenta", active: true },
      { text: "Galeria de fotos", active: true },
      { text: "Itinerario", active: true },
      { text: "Álbum compartido", active: true },
      { text: "Mesa de regalos, cuenta para depósito o lluvia de sobres", active: true },
      { text: "Confirmación por WhatsApp y lista de Excel", active: true },
      { text: "Generador de invitaciones", active: true },
    ],
  },
];

const getPlanPrice = (plan) => {
  return typeof plan.price === "object" ? plan.price.discount : plan.price;
};

export default function PricingXV({ selectedPlan, setSelectedPlan }) {
  return (
    <section className={styles.section} id="precios">
      <div className={styles.titleCenter}>
        <span className={styles.label}>Planes para XV años</span>
      </div>

      <div className={styles.grid}>
        {plans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              className={`
  ${styles.plan} 
  ${plan.featured ? styles.featured : ""} 
  ${isSelected ? styles.planSelected : ""}
`}
              style={
                isSelected
                  ? {
                      borderColor: "#b89b5e",
                      boxShadow: "0 22px 55px rgba(94, 102, 80, 0.22)",
                    }
                  : {}
              }
            >
              {plan.badge && (
                <div className={styles.popularBadge}>{plan.badge}</div>
              )}

              {isSelected && (
                <div className={styles.popularBadge}>
                  Seleccionado
                </div>
              )}

              <p className={styles.planName}>{plan.name}</p>

              <div className={styles.planPrice}>
                {typeof plan.price === "object" ? (
                  (() => {
                    const { original, discount } = plan.price;
                    const percent = Math.round(
                      ((original - discount) / original) * 100
                    );

                    return (
                      <div className={styles.priceBox}>
                        <span className={styles.old}>
                          <sup>$</sup>
                          {original}
                        </span>

                        <span className={styles.new}>
                          <sup>$</sup>
                          {discount}
                        </span>

                        <span className={styles.badgeOff}>
                          -{percent}% OFF
                        </span>
                      </div>
                    );
                  })()
                ) : (
                  <span>
                    <sup>$</sup>
                    {plan.price}
                  </span>
                )}
              </div>

              <ul className={styles.features}>
                {plan.features.map((f, i) => (
                  <li key={i} className={f.active ? styles.active : ""}>
                    {f.text}
                  </li>
                ))}
              </ul>

             <button
  className={styles.planBtn}
  onClick={() => {
    setSelectedPlan({
      id: plan.id,
      name: plan.name,
      price: getPlanPrice(plan),
    });

    setTimeout(() => {
      document.getElementById("resumen")?.scrollIntoView({
  behavior: "smooth",
  block: "center",
});
    }, 200);
  }}
>
  {isSelected ? "Paquete seleccionado" : "Seleccionar paquete"}
</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}