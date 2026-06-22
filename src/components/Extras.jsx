import React, { useMemo, useState } from "react";
import styles from "./Extras.module.css";

const WHATSAPP_PHONE = "522224649120";

const extras = [
  {
    id: "control-invitados",
    titulo: "Control de Invitados",
    precio: 270,
    descripcion:
      "Nombre personalizado, número de pases asignados y confirmación limitada para cada invitado.",
  },
  {
    id: "musica",
    titulo: "Música Personalizada",
    precio: 50,
    descripcion:
      "Agrega una canción especial para acompañar la experiencia de tu invitación.",
  },
  {
    id: "album",
    titulo: "Álbum Compartido",
    precio: 100,
    descripcion:
      "Tus invitados podrán subir fotografías y recuerdos del evento en un solo lugar.",
  },
  {
    id: "Contador",
    titulo: "Cuenta Regresiva",
    precio: 60,
    descripcion:
      "Contador con cuenta regresiva para la fecha del evento.",
  },
  {
    id: "Galeria",
    titulo: "Galeria de fotos",
    precio: 100,
    descripcion:
      "Agrega un carrusel de 5 a 6 fotos de los novios.",
  },
  {
    id: "mesa-regalos",
    titulo: "Mesa de Regalos Premium",
    precio: 60,
    descripcion:
      "Diseño elegante para Liverpool, sobres de regalo o cuentas bancarias.",
  },
  {
    id: "evento-adicional",
    titulo: "Evento Adicional",
    precio: 150,
    descripcion:
      "Ideal para combinar boda y bautizo, boda civil o cualquier celebración adicional.",
  },
  {
    id: "Itinerario",
    titulo: "Itinerario del Evento",
    precio: 70,
    descripcion:
      "Agrega itinerario de tu Evento con fechas y hora.",
  },
  {
    id: "Version impresa",
    titulo: "Versión impresa",
    precio: 50,
    descripcion:
      "Agrega imagen de tu invitacion , para recuerdo.",
  },
  {
    id: "Encuesta",
    titulo: "Encuesta de cuanto Conocen a los novios",
    precio: 100,
    descripcion:
      "Agrega una encuesta de 5 preguntas para que tus invitados respondan y puedas ver quienes conocemas mas su historia.",
  },
];

export default function Extras({
  selectedPlan,
  selectedExtras,
  setSelectedExtras,
}) {
  const [showSummary, setShowSummary] = useState(false);

  const toggleExtra = (extra) => {
    const exists = selectedExtras.some((item) => item.id === extra.id);

    if (exists) {
      setSelectedExtras(selectedExtras.filter((item) => item.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((total, item) => total + item.precio, 0);
  }, [selectedExtras]);

  const planTotal = selectedPlan ? selectedPlan.price : 0;
  const total = planTotal + extrasTotal;

  const sendToWhatsApp = () => {
    const planText = selectedPlan
      ? `📦 Paquete:\n• ${selectedPlan.name} - $${selectedPlan.price} MXN`
      : "📦 Paquete:\n• Aún no he seleccionado paquete";

    const extrasText =
      selectedExtras.length > 0
        ? selectedExtras
            .map((extra) => `• ${extra.titulo} - $${extra.precio} MXN`)
            .join("\n")
        : "• Sin extras seleccionados";

    const message = `Hola 👋

Quisiera cotizar mi invitación con esta selección:

${planText}

✨ Extras:
${extrasText}

💰 Total aproximado:
$${total} MXN

¿Podrían ayudarme con más información?`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const hasSelection = selectedPlan || selectedExtras.length > 0;

  return (
    <section className={styles.section} id="extras">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Personaliza tu experiencia</span>

          <h2 className={styles.title}>Mejora tu Invitación</h2>

          <div className={styles.line}></div>

          <p className={styles.subtitle}>
            Agrega funciones exclusivas para hacer tu invitación aún más
            especial, personalizada y memorable.
          </p>
        </div>

        <div className={styles.grid}>
          {extras.map((extra) => {
            const isSelected = selectedExtras.some(
              (item) => item.id === extra.id
            );

            return (
              <div
                className={`${styles.card} ${
                  isSelected ? styles.selectedCard : ""
                }`}
                key={extra.id}
              >
                <button
                  className={`${styles.addButton} ${
                    isSelected ? styles.addedButton : ""
                  }`}
                  onClick={() => toggleExtra(extra)}
                  aria-label={
                    isSelected
                      ? `Quitar ${extra.titulo}`
                      : `Agregar ${extra.titulo}`
                  }
                >
                  {isSelected ? "✓" : "+"}
                </button>

                <span className={styles.cardLabel}>
                  {isSelected ? "Agregado" : "Extra disponible"}
                </span>

                <h3 className={styles.cardTitle}>{extra.titulo}</h3>

                <p className={styles.description}>{extra.descripcion}</p>

                <div className={styles.smallLine}></div>

                <div className={styles.cardBottom}>
                  <p className={styles.price}>+${extra.precio} MXN</p>

                  <button
                    className={styles.miniAction}
                    onClick={() => toggleExtra(extra)}
                  >
                    {isSelected ? "Quitar" : "Agregar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.cartBox} id="resumen">
          <div>
            <span className={styles.cartLabel}>Tu selección</span>

            <h3>
              {hasSelection
                ? `$${total} MXN`
                : "Selecciona un paquete o extra"}
            </h3>

            <p>
  {selectedPlan
    ? `Elegiste el paquete ${selectedPlan.name}. ¿Te gustaría agregar algún extra?`
    : "Selecciona un paquete o agrega extras para armar tu invitación."}
</p>
          </div>

          <div className={styles.cartActions}>
  <button
    className={styles.extraButton}
    onClick={() =>
      document.getElementById("extras")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Agregar extras
  </button>

  <button
    className={styles.viewButton}
    onClick={() => setShowSummary(true)}
    disabled={!hasSelection}
  >
    Solicitar mi invitación
  </button>
</div>
        </div>

        {showSummary && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowSummary(false)}
          >
            <div
              className={styles.modal}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setShowSummary(false)}
              >
                ×
              </button>

              <span className={styles.modalLabel}>Resumen</span>

              <h3>Tu invitación personalizada</h3>

              <div className={styles.summaryBlock}>
                <h4>Paquete seleccionado</h4>

                {selectedPlan ? (
                  <div className={styles.summaryItem}>
                    <span>{selectedPlan.name}</span>
                    <strong>${selectedPlan.price} MXN</strong>
                  </div>
                ) : (
                  <p className={styles.emptyText}>
                    Aún no seleccionas un paquete.
                  </p>
                )}
              </div>

              <div className={styles.summaryBlock}>
                <h4>Extras agregados</h4>

                {selectedExtras.length > 0 ? (
                  selectedExtras.map((extra) => (
                    <div className={styles.summaryItem} key={extra.id}>
                      <span>{extra.titulo}</span>

                      <div className={styles.summaryActions}>
                        <strong>${extra.precio} MXN</strong>

                        <button onClick={() => toggleExtra(extra)}>
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyText}>
                    Aún no agregas extras.
                  </p>
                )}
              </div>

              <div className={styles.totalBox}>
                <span>Total aproximado</span>
                <strong>${total} MXN</strong>
              </div>

              <button className={styles.whatsappButton} onClick={sendToWhatsApp}>
                Enviar selección por WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}