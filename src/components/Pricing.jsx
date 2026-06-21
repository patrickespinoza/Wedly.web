"use client";

import styles from "./Pricing.module.css";

const plans = [
  {
    id: "basico",
    tag: "Esencial",
    name: "Básico",
    price: 300,
    featured: false,
    features: [
      { text: "Invitación digital lista para enviar por WhatsApp", active: true },
      { text: "Personalización foto de portada", active: true },
      { text: "Información de los padres", active: true },
      { text: "Información del evento: fecha, hora y ubicación por Google Maps", active: true },
      { text: "Código de vestimenta", active: true },
      { text: "Itinerario", active: true },
      { text: "Confirmación de asistencia por Google Forms", active: true },
    ],
  },
  {
    id: "elegance",
    tag: "Completo",
    name: "Elegance",
    price: {
      original: 800,
      discount: 500,
    },
    featured: true,
    badge: "Más popular",
    features: [
      { text: "Invitación digital lista para enviar por WhatsApp", active: true },
      { text: "Imágenes personalizadas y diseño", active: true },
      { text: "Cuenta regresiva", active: true },
      { text: "Información del evento: fecha, hora y ubicación por Google Maps", active: true },
      { text: "Detalles del evento: código de vestimenta", active: true },
      { text: "Carrusel de fotos", active: true },
      { text: "Mesa de regalos o cuenta para depósito", active: true },
      { text: "Confirmación por WhatsApp y lista de Excel", active: true },
    ],
  },
  {
    id: "premium",
    tag: "Premium",
    name: "Premium",
    price: {
      original: 1000,
      discount: 800,
    },
    featured: false,
    features: [
      { text: "Invitación digital lista para enviar por WhatsApp", active: true },
      { text: "Invitación con música", active: true },
      { text: "Imágenes personalizadas y diseño", active: true },
      { text: "Cuenta regresiva", active: true },
      { text: "Información del evento: fecha, hora y ubicación por Google Maps", active: true },
      { text: "Carrusel de fotos", active: true },
      { text: "Itinerario del evento", active: true },
      { text: "Detalles del evento: código de vestimenta", active: true },
      { text: "Álbum compartido Wedshoots", active: true },
      { text: "Encuesta de cuánto conocen a los novios con ranking", active: true },
      { text: "Mesa de regalos o cuenta depósito", active: true },
      { text: "Confirmación de asistencia personalizada", active: true },
    ],
  },
  {
    id: "luxe",
    tag: "Premium",
    name: "Luxe",
    price: {
      original: 1400,
      discount: 1000,
    },
    featured: false,
    features: [
      { text: "Invitación digital personalizada con número de pases", active: true },
      { text: "Portada con sobre interactivo", active: true },
      { text: "Invitación con música", active: true },
      { text: "Imágenes personalizadas y diseño", active: true },
      { text: "Cuenta regresiva", active: true },
      { text: "Información del evento: fecha, hora y ubicación por Google Maps", active: true },
      { text: "Carrusel de fotos", active: true },
      { text: "Itinerario del evento", active: true },
      { text: "Detalles del evento: código de vestimenta", active: true },
      { text: "Álbum compartido Wedshoots", active: true },
      { text: "Encuesta de cuánto conocen a los novios con ranking", active: true },
      { text: "Mesa de regalos o cuenta depósito", active: true },
      { text: "Confirmación de asistencia personalizada", active: true },
    ],
  },
];

const getPlanPrice = (plan) => {
  return typeof plan.price === "object" ? plan.price.discount : plan.price;
};

export default function Pricing({ selectedPlan, setSelectedPlan }) {
  return (
    <section className={styles.section} id="precios">
      <div className={styles.titleCenter}>
        <span className={styles.label}>Planes</span>

        <h2 className={styles.title}>
          Elige tu <em>experiencia</em>
        </h2>
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

              <span className={styles.planTag}>{plan.tag}</span>

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
      tag: plan.tag,
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