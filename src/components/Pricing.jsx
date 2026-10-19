
import { useState } from "react";
import styles from "./Pricing.module.css";
import { PLANS } from "../data/catalog";

// Formato de precios mexicanos
const formatPrice = (price) =>
  new Intl.NumberFormat("es-MX").format(price);

export default function Pricing({
  eventType = "boda",
  setEventType,
  selectedPlan,
  setSelectedPlan,
}) {
  const [expandedPlans, setExpandedPlans] = useState({});

  const currentEventType =
    eventType === "xv" ? "xv" : "boda";

  const plans = PLANS[currentEventType] || [];

  // ==========================================
  // CAMBIAR TIPO DE CELEBRACIÓN
  // ==========================================

  const handleEventChange = (type) => {
    if (type === currentEventType) return;

    if (typeof setEventType === "function") {
      setEventType(type);
      setExpandedPlans({});
    } else {
      console.error(
        "Pricing: falta conectar setEventType desde App.jsx"
      );
    }
  };

  // ==========================================
  // MOSTRAR / OCULTAR CARACTERÍSTICAS
  // ==========================================

  const toggleDetails = (planId) => {
    const key = `${currentEventType}-${planId}`;

    setExpandedPlans((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  // ==========================================
  // SELECCIONAR PAQUETE
  // ==========================================

  const selectPlan = (plan) => {
    if (typeof setSelectedPlan !== "function") {
      console.error(
        "Pricing: falta conectar setSelectedPlan desde App.jsx"
      );
      return;
    }

    setSelectedPlan({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      eventType: currentEventType,
    });

    window.setTimeout(() => {
      const target =
        document.getElementById("resumen") ||
        document.getElementById("extras");

      target?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <section
      className={styles.section}
      id="precios"
      aria-labelledby="pricing-title"
    >
      <div className={styles.container}>

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />

            <span>COLECCIÓN WEDLY</span>

            <span className={styles.eyebrowLine} />
          </div>

          <h2
            className={styles.title}
            id="pricing-title"
          >
            Precios
            
          </h2>

          <p className={styles.subtitle}>
            Encuentra el paquete perfecto para tu
            celebración.
          </p>

          {/* SELECTOR BODAS / XV AÑOS */}

          <div
            className={styles.eventSelector}
            role="group"
            aria-label="Selecciona el tipo de celebración"
          >
            <button
              type="button"
              className={`${styles.eventButton} ${
                currentEventType === "boda"
                  ? styles.eventButtonActive
                  : ""
              }`}
              onClick={() =>
                handleEventChange("boda")
              }
              aria-pressed={
                currentEventType === "boda"
              }
            >
              Bodas
            </button>

            <button
              type="button"
              className={`${styles.eventButton} ${
                currentEventType === "xv"
                  ? styles.eventButtonActive
                  : ""
              }`}
              onClick={() =>
                handleEventChange("xv")
              }
              aria-pressed={
                currentEventType === "xv"
              }
            >
              XV años
            </button>
          </div>
        </header>

        {/* ======================================
            TARJETAS DE PRECIOS
        ====================================== */}

        <div
          className={styles.grid}
          key={currentEventType}
        >
          {plans.map((plan) => {
            const planKey =
              `${currentEventType}-${plan.id}`;

            const isExpanded =
              Boolean(expandedPlans[planKey]);

            const isSelected =
              selectedPlan?.id === plan.id &&
              selectedPlan?.eventType ===
                currentEventType;

            return (
              <article
                key={planKey}
                className={[
                  styles.card,
                  plan.featured
                    ? styles.featured
                    : "",
                  isSelected
                    ? styles.selected
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >

                {/* PARTE SUPERIOR */}

                <div className={styles.cardTop}>
                  <span className={styles.number}>
                    WEDLY / {plan.number}
                  </span>

                  {isSelected ? (
                    <span className={styles.badge}>
                      Seleccionado
                    </span>
                  ) : plan.badge ? (
                    <span className={styles.badge}>
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                {/* NOMBRE DEL PAQUETE */}

                <div className={styles.cardHeading}>
                  <h3 className={styles.planName}>
                    {plan.name}
                  </h3>

                  {plan.tagline && (
                    <p className={styles.tagline}>
                      {plan.tagline}
                    </p>
                  )}
                </div>

                {/* PRECIO PROTAGONISTA */}

                <div className={styles.priceBlock}>
                  <div className={styles.price}>
                    <span className={styles.currency}>
                      $
                    </span>

                    <span>
                      {formatPrice(plan.price)}
                    </span>

                    <span className={styles.mxn}>
                      MXN
                    </span>
                  </div>

                  <p className={styles.priceCaption}>
                    Precio por invitación digital
                  </p>
                </div>

                {/* SEPARADOR */}

                <div className={styles.rule} />

                {/* ==================================
                    BOTÓN DESPLEGABLE
                ================================== */}

                <button
                  type="button"
                  className={`${styles.detailsToggle} ${
                    isExpanded
                      ? styles.detailsToggleOpen
                      : ""
                  }`}
                  onClick={() =>
                    toggleDetails(plan.id)
                  }
                  aria-expanded={isExpanded}
                  aria-controls={
                    `details-${currentEventType}-${plan.id}`
                  }
                >
                  <span>
                    {isExpanded
                      ? "Ocultar características"
                      : "Ver qué incluye"}
                  </span>

                  <span
                    className={styles.toggleIcon}
                    aria-hidden="true"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {/* ==================================
                    CONTENIDO DESPLEGABLE
                ================================== */}

                <div
                  id={
                    `details-${currentEventType}-${plan.id}`
                  }
                  className={`${styles.detailsPanel} ${
                    isExpanded
                      ? styles.detailsPanelOpen
                      : ""
                  }`}
                  hidden={!isExpanded}
                >

                  {/* DESCRIPCIÓN */}

                  {plan.description && (
                    <p className={styles.description}>
                      {plan.description}
                    </p>
                  )}

                  {/* FUNCIONES HEREDADAS */}

                  {plan.inheritedFrom && (
                    <div
                      className={styles.inheritedBox}
                    >
                      <span
                        className={styles.inheritedIcon}
                        aria-hidden="true"
                      >
                        +
                      </span>

                      <div
                        className={styles.inheritedText}
                      >
                        <span
                          className={
                            styles.inheritedLabel
                          }
                        >
                          INCLUYE TAMBIÉN
                        </span>

                        <strong>
                          Todo lo incluido en el
                          paquete{" "}
                          <span
                            className={
                              styles.inheritedName
                            }
                          >
                            {plan.inheritedFrom}
                          </span>
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* LISTA DE FUNCIONES */}

                  {plan.features?.length > 0 && (
                    <>
                      <h4
                        className={
                          styles.featuresHeading
                        }
                      >
                        CARACTERÍSTICAS
                      </h4>

                      <ul className={styles.features}>
                        {plan.features.map(
                          (feature, index) => (
                            <li key={index}>
                              <span
                                className={
                                  styles.featureIcon
                                }
                                aria-hidden="true"
                              >
                                ✓
                              </span>

                              <span>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}

                  {/* NOTA DEL PAQUETE */}

                  {plan.note && (
                    <p className={styles.note}>
                      {plan.note}
                    </p>
                  )}
                </div>

                {/* ==================================
                    BOTÓN DE SELECCIÓN
                ================================== */}

                <button
                  type="button"
                  className={styles.button}
                  onClick={() => selectPlan(plan)}
                  aria-pressed={isSelected}
                >
                  {isSelected
                    ? "Paquete seleccionado"
                    : "Elegir este paquete"}

                  <span aria-hidden="true">
                    {isSelected ? "✓" : "↗"}
                  </span>
                </button>

              </article>
            );
          })}
        </div>

        {/* ======================================
            INFORMACIÓN INFERIOR
        ====================================== */}

        <div className={styles.bottomInfo}>
          <span
            className={styles.bottomOrnament}
            aria-hidden="true"
          >
            ✧
          </span>

          <p className={styles.bottomText}>
            Todos nuestros paquetes incluyen
            <strong> diseño personalizado.</strong>
            {" "}Cada paquete superior incorpora
            todas las funciones de los anteriores.
          </p>

          {/* VIGENCIA DE LA INVITACIÓN */}

          <div className={styles.availabilityBox}>
            <span
              className={styles.availabilityIcon}
              aria-hidden="true"
            >
              ✧
            </span>

            <h3 className={styles.availabilityTitle}>
              Tu invitación, disponible
              para cada momento
            </h3>

            <p className={styles.availabilityText}>
              Tu invitación estará disponible
              desde el momento de su entrega
              y permanecerá activa{" "}
              <strong>
                hasta 30 días después de tu evento
              </strong>
              , para que puedas compartirla
              con tus invitados y seguir
              disfrutándola después de
              tu celebración.
            </p>

            <div
              className={styles.availabilityRule}
            />

            <span
              className={styles.availabilityCaption}
            >
              INCLUIDO EN TODOS NUESTROS PAQUETES
            </span>
          </div>

          <span
            className={styles.bottomOrnament}
            aria-hidden="true"
          >
            ✧
          </span>
        </div>
      </div>
    </section>
  );
}
