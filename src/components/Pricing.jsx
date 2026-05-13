"use client";

import styles from './Pricing.module.css'

const plans = [
  {
    tag: 'Esencial',
    name: 'Básico',
    price: '300',
    featured: false,
    features: [
      { text: 'Invitacion digital lista para enviar por WhatsApp', active: true },
      { text: 'Personalizacion foto de portada', active: true },
      { text: 'Informacion del evento (Fecha, Hora, Ubicacion por Google Maps)', active: true },
      { text: 'Codigo de Vestimenta', active: true },
      { text: 'Itinerario', active: true },
      { text: 'Confirmacion de asistencia por Google Forms', active: true },
    ],
  },
  {
    tag: 'Completo',
    name: 'Elegance',
    price: {
      original: 800,
      discount: 500
    },
    featured: true,
    badge: 'Más popular',
    features: [
      { text: 'Invitacion digital lista para enviar por WhatsApp', active: true },
      { text: 'Imagenes Personalizadas y Diseño', active: true },
      { text: 'Cuenta Regresiva', active: true },
      { text: 'Informacion del evento (Fecha, Hora, Ubicacion por Google Maps)', active: true },
      { text: 'Detalles del Evento (Codigo de vestimenta)', active: true },
      { text: 'Carrusel de Fotos', active: true },
      { text: 'Mesa de Regalos o Cuenta para deposito', active: true },
      { text: 'Confirmacion de asistencia por Whatsap y Lista de Excel', active: true },
    ],
  },
  {
    tag: 'Premium',
    name: 'Premium',
    price: {
      original: 1000,
      discount: 800
    },
    featured: false,
    features: [
      { text: 'Invitacion digital lista para enviar por WhatsApp', active: true },
      { text: 'Invitacion con Musica', active: true },
      { text: 'Imagenes Personalizadas y Diseño', active: true },
      { text: 'Cuenta Regresiva', active: true },
      { text: 'Informacion del evento (Fecha, Hora, Ubicacion por Google Maps)', active: true },
      { text: 'Carrusel de Fotos', active: true },
      { text: 'Itinerario del Evento', active: true },
      { text: 'Detalles del Evento (Codigo de vestimenta)', active: true },
      { text: 'Album Compartido (Wedshoots tus invitados pueden tomar fotos y compartirlas en un albun contigo, para no perder ningun momento)', active: true },
      { text: 'Encuesta de Cuanto conocen a los novios con ranking de mayor acertados por invitado', active: true },
      { text: 'Mesa de regalos o Cuenta deposito', active: true },
      { text: 'Confirmacion de asistencia (Nombre, confirmacion, numero de invitados y mensaje para novios)', active: true },
    ],
  },
  {
    tag: 'Premium',
    name: 'Luxe',
    price: {
      original: 1400,
      discount: 1000
    },
    featured: false,
    features: [
      { text: 'Invitacion digital personalizada con numero de pases lista para enviar por WhatsApp', active: true },
      { text: 'Portada con sobre interactivo', active: true },
      { text: 'Invitacion con Musica', active: true },
      { text: 'Imagenes Personalizadas y Diseño', active: true },
      { text: 'Cuenta Regresiva', active: true },
      { text: 'Informacion del evento (Fecha, Hora, Ubicacion por Google Maps)', active: true },
      { text: 'Carrusel de Fotos', active: true },
      { text: 'Itinerario del Evento', active: true },
      { text: 'Detalles del Evento (Codigo de vestimenta)', active: true },
      { text: 'Album Compartido (Wedshoots tus invitados pueden tomar fotos y compartirlas en un albun contigo, para no perder ningun momento)', active: true },
      { text: 'Encuesta de Cuanto conocen a los novios con ranking de mayor acertados por invitado', active: true },
      { text: 'Mesa de regalos o Cuenta deposito', active: true },
      { text: 'Confirmacion de asistencia (Nombre, confirmacion, numero de invitados y mensaje para novios)', active: true },
    ],
  },
]

export default function Pricing() {

  // 👉 FUNCIÓN PARA WHATSAPP
  const sendToWhatsApp = (plan) => {
    const phone = "522214105012";

    const priceText =
      typeof plan.price === "object"
        ? plan.price.discount
        : plan.price;

    const message = `Hola 👋, me interesa el plan *${plan.name}* ($${priceText} MXN).

¿Podrías ayudarme con más información? 😊`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <section className={styles.section} id="precios">
      
      {/* HEADER */}
      <div className={styles.titleCenter}>
        <span className={styles.label}>Planes</span>

        <h2 className={styles.title}>
          Elige tu <em>experiencia</em>
        </h2>
      </div>

      {/* CARDS */}
      <div className={styles.grid}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`${styles.plan} ${plan.featured ? styles.featured : ''}`}
          >
            
            {/* BADGE */}
            {plan.badge && (
              <div className={styles.popularBadge}>
                {plan.badge}
              </div>
            )}

            {/* INFO */}
            <span className={styles.planTag}>{plan.tag}</span>

            <p className={styles.planName}>{plan.name}</p>

            {/* 💰 PRECIO */}
<p className={styles.planPrice}>
  {typeof plan.price === "object" ? (
    <>
      {(() => {
        const { original, discount } = plan.price;
        const percent = Math.round(((original - discount) / original) * 100);
        const ahorro = original - discount;

        return (
          <div className={styles.priceBox}>
            <span className={styles.old}>
              <sup>$</sup>{original}
            </span>

            <span className={styles.new}>
              <sup>$</sup>{discount}
            </span>

            <span className={styles.badgeOff}>
              -{percent}% OFF
            </span>
          </div>
        );
      })()}
    </>
  ) : (
    <>
      <sup>$</sup>{plan.price}
    </>
  )}
</p>

            {/* FEATURES */}
            <ul className={styles.features}>
              {plan.features.map((f, i) => (
                <li 
                  key={i} 
                  className={f.active ? styles.active : ''}
                >
                  {f.text}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button 
              className={styles.planBtn} 
              onClick={() => sendToWhatsApp(plan)}
            >
              Reservar este plan
            </button>

          </div>
        ))}
      </div>

    </section>
  )
}