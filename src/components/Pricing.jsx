
import styles from "./Pricing.module.css";
import { PLANS } from "../data/catalog";

// Formatear precios
const formatPrice = (price) =>
  new Intl.NumberFormat("es-MX").format(price);

export default function Pricing({
  eventType = "boda",
  setEventType,
  selectedPlan,
  setSelectedPlan,
}) {
  // Obtener los paquetes según la celebración
  const currentEventType =
    eventType === "xv" ? "xv" : "boda";

  const plans = PLANS[currentEventType];

  // Cambiar tipo de celebración
  const handleEventChange = (type) => {
    if (type === currentEventType) return;

    if (typeof setEventType === "function") {
      setEventType(type);
    } else {
      console.error(
        "Pricing: falta conectar setEventType desde App.jsx"
      );
    }
  };

  // Seleccionar paquete
  const selectPlan = (plan) => {
    setSelectedPlan({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      eventType: currentEventType,
    });

    // Desplazarse a complementos o resumen
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
    >
      <div className={styles.container}>
        {/* ENCABEZADO */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />

            <span>COLECCIÓN WEDLY</span>

            <span className={styles.eyebrowLine} />
          </div>

          <h2 className={styles.title}>
            Una experiencia
            <br />
            <em>para cada historia.</em>
          </h2>

          <p className={styles.subtitle}>
            Cuatro maneras de hacer especial tu
            celebración. Cada invitación se diseña
            con tu estilo, tus fotografías y los
            detalles que hacen única tu historia.
          </p>

          {/* SELECTOR BODAS / XV AÑOS */}
          <div
            className={styles.eventSelector}
            role="group"
            aria-label="Selecciona el tipo de celebración"
          >
            <button
              type="button"
              className={[
                styles.eventButton,
                currentEventType === "boda"
                  ? styles.eventButtonActive
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
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
              className={[
                styles.eventButton,
                currentEventType === "xv"
                  ? styles.eventButtonActive
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
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

        {/* TARJETAS DE PAQUETES */}
        <div
          className={styles.grid}
          key={currentEventType}
        >
          {plans.map((plan) => {
            const isSelected =
              selectedPlan?.id === plan.id &&
              selectedPlan?.eventType ===
                currentEventType;

            return (
              <article
                key={`${currentEventType}-${plan.id}`}
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

                  <p className={styles.tagline}>
                    {plan.tagline}
                  </p>
                </div>

                {/* PRECIO */}
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

                <div className={styles.rule} />

                {/* DESCRIPCIÓN */}
                <p className={styles.description}>
                  {plan.description}
                </p>

                {/* FUNCIONES */}
                <div className={styles.featuresHeading}>
                  <span>LO QUE INCLUYE</span>

                  <span aria-hidden="true">
                    ✧
                  </span>
                </div>

                {/* FUNCIONES HEREDADAS */}
                {plan.inheritedFrom && (
                  <div className={styles.inheritedBox}>
                    <span
                      className={styles.inheritedIcon}
                      aria-hidden="true"
                    >
                      +
                    </span>

                    <div className={styles.inheritedText}>
                      <span
                        className={styles.inheritedLabel}
                      >
                        INCLUYE TAMBIÉN
                      </span>

                      <strong>
                        Todo lo incluido en el paquete{" "}
                        <span
                          className={styles.inheritedName}
                        >
                          {plan.inheritedFrom}
                        </span>
                      </strong>
                    </div>
                  </div>
                )}

                {/* LISTADO DE FUNCIONES */}
                <ul className={styles.features}>
                  {plan.features.map(
                    (feature, index) => (
                      <li
                        key={`${currentEventType}-${plan.id}-${index}`}
                      >
                        <span
                          className={styles.featureIcon}
                          aria-hidden="true"
                        >
                          ✓
                        </span>

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>

                {/* NOTA */}
                <p className={styles.note}>
                  {plan.note}
                </p>

                {/* BOTÓN */}
                <button
                  type="button"
                  className={styles.button}
                  onClick={() =>
                    selectPlan(plan)
                  }
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
      
{/* INFORMACIÓN INFERIOR */}
<div className={styles.bottomInfo}>
  <span
    className={styles.bottomOrnament}
    aria-hidden="true"
  >
    ✧
  </span>

  <p>
    Todos nuestros paquetes incluyen diseño personalizado.
    Cada paquete superior incorpora todas las funciones
    de los anteriores.
  </p>

  {/* BENEFICIO DE DISPONIBILIDAD */}
  <div
    style={{
      margin: "28px auto 0",
      maxWidth: "650px",
      padding: "26px 24px",
      backgroundColor: "#F0E9DC",
      border: "1px solid #C6AD83",
      borderLeft: "3px solid #A88A5B",
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: "23px",
        color: "#A88A5B",
        marginBottom: "12px",
      }}
      aria-hidden="true"
    >
      ✧
    </div>

    <h3
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "clamp(19px, 3vw, 25px)",
        fontWeight: "400",
        color: "#292522",
        lineHeight: "1.4",
        marginBottom: "14px",
      }}
    >
      Tu invitación, disponible para cada momento
    </h3>

    <p
      style={{
        fontSize: "14px",
        lineHeight: "1.9",
        color: "#625B52",
        margin: 0,
      }}
    >
      Tu invitación estará disponible desde el momento
      de su entrega y permanecerá activa
      <strong
        style={{
          color: "#8B6D42",
          fontWeight: "600",
        }}
      >
        {" "}hasta 30 días después de tu evento
      </strong>
      , para que puedas compartirla con tus invitados
      y seguir disfrutándola después de tu celebración.
    </p>

    <div
      style={{
        width: "55px",
        height: "1px",
        backgroundColor: "#B89B5E",
        margin: "20px auto 14px",
      }}
    />

    <span
      style={{
        fontSize: "10px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontWeight: "600",
        color: "#927449",
      }}
    >
      Incluido en todos nuestros paquetes
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
