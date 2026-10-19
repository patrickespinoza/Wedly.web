
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./Extras.module.css";

import {
  EXTRAS,
  PLAN_LEVEL,
  formatMoney,
  isIncluded,
  isAvailable,
  normalizeExtras,
} from "../data/catalog";

const WHATSAPP_PHONE = "522224649120";

export default function Extras({
  eventType = "boda",
  selectedPlan,
  selectedExtras = [],
  setSelectedExtras,
}) {
  const [showSummary, setShowSummary] = useState(false);
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  const planLevel = PLAN_LEVEL[selectedPlan?.id] || 0;

  const availableExtras = useMemo(
    () =>
      EXTRAS.filter(
        (extra) =>
          isAvailable(extra, eventType) &&
          !isIncluded(extra, planLevel)
      ),
    [eventType, planLevel]
  );

  const effectiveExtras = useMemo(
    () =>
      normalizeExtras(
        selectedExtras,
        planLevel,
        eventType
      ),
    [selectedExtras, planLevel, eventType]
  );

  const extrasTotal = effectiveExtras.reduce(
    (sum, extra) => sum + extra.precio,
    0
  );

  const planTotal = selectedPlan?.price || 0;
  const total = planTotal + extrasTotal;

  useEffect(() => {
    const normalized = normalizeExtras(
      selectedExtras,
      planLevel,
      eventType
    );

    const currentIds = selectedExtras
      .map((item) => item.id)
      .join("|");

    const normalizedIds = normalized
      .map((item) => item.id)
      .join("|");

    const pricesChanged = selectedExtras.some((item) => {
      const canonical = EXTRAS.find(
        (extra) => extra.id === item.id
      );

      return (
        !canonical ||
        canonical.precio !== item.precio
      );
    });

    if (
      currentIds !== normalizedIds ||
      pricesChanged
    ) {
      setSelectedExtras(normalized);
    }
  }, [
    eventType,
    planLevel,
    selectedExtras,
    setSelectedExtras,
  ]);

  useEffect(() => {
    if (!showSummary) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowSummary(false);
      }

      if (
        event.key === "Tab" &&
        modalRef.current
      ) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled])'
          )
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showSummary]);

  const toggleExtra = (extra) => {
    if (!selectedPlan) return;

    if (
      !isAvailable(extra, eventType) ||
      isIncluded(extra, planLevel)
    ) {
      return;
    }

    const selectedIds = new Set(
      effectiveExtras.map((item) => item.id)
    );

    if (selectedIds.has(extra.id)) {
      selectedIds.delete(extra.id);

      if (extra.id === "control-invitados") {
        selectedIds.delete("qr");
      }
    } else {
      selectedIds.add(extra.id);

      if (
        extra.requires &&
        planLevel < 4
      ) {
        selectedIds.add(extra.requires);
      }
    }

    const nextExtras = EXTRAS.filter(
      (item) => selectedIds.has(item.id)
    );

    setSelectedExtras(
      normalizeExtras(
        nextExtras,
        planLevel,
        eventType
      )
    );
  };

  const sendToWhatsApp = () => {
    if (!selectedPlan) return;

    const celebration =
      eventType === "xv" ? "XV años" : "Boda";

    const extraLines = effectiveExtras.length
      ? effectiveExtras
          .map(
            (extra) =>
              `• ${extra.titulo}: ${formatMoney(extra.precio)}`
          )
          .join("\n")
      : "• Sin complementos adicionales";

    const message = [
      "Hola, equipo Wedly 👋",
      "",
      `Me gustaría solicitar información sobre una invitación digital para ${celebration}.`,
      "",
      "📦 PAQUETE",
      `${selectedPlan.name}: ${formatMoney(selectedPlan.price)}`,
      "",
      "✨ COMPLEMENTOS",
      extraLines,
      "",
      `💰 TOTAL ESTIMADO: ${formatMoney(total)}`,
      "",
      "¿Me pueden ayudar con los siguientes pasos?",
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_PHONE}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      className={styles.section}
      id="extras"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>PERSONALIZA TU EXPERIENCIA</span>
            <span className={styles.line} />
          </div>

          <h2 className={styles.title}>
            Los detalles hacen
            <br />
            <em>la diferencia.</em>
          </h2>

          <p className={styles.subtitle}>
            Añade funciones especiales a tu invitación.
            Te mostraremos únicamente los complementos
            que no están incluidos en tu paquete.
          </p>

          {!selectedPlan && (
            <div className={styles.notice}>
              Primero elige un paquete para ver
              los complementos disponibles.

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("precios")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Ver paquetes →
              </button>
            </div>
          )}
        </header>

        {selectedPlan && (
          <>
            <div className={styles.selectionInfo}>
              <div>
                <span className={styles.selectionLabel}>
                  TU PAQUETE ACTUAL
                </span>

                <strong>
                  {eventType === "xv"
                    ? "XV años"
                    : "Boda"}{" "}
                  · {selectedPlan.name}
                </strong>
              </div>

              <p>
                Las funciones que ya incluye
                tu paquete no generan cargos adicionales.
              </p>
            </div>

            <div className={styles.grid}>
              {availableExtras.map((extra) => {
                const isSelected = effectiveExtras.some(
                  (item) => item.id === extra.id
                );

                const isPersonalQR =
                  extra.id === "qr";

                const isGeneralQR =
                  extra.id === "qr-general";

                return (
                  <article
                    key={extra.id}
                    className={[
                      styles.card,
                      isSelected
                        ? styles.selectedCard
                        : "",
                    ].filter(Boolean).join(" ")}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.cardLabel}>
                        {extra.category}
                      </span>

                      <button
                        type="button"
                        className={[
                          styles.addButton,
                          isSelected
                            ? styles.addedButton
                            : "",
                        ].filter(Boolean).join(" ")}
                        onClick={() =>
                          toggleExtra(extra)
                        }
                        aria-label={
                          isSelected
                            ? `Quitar ${extra.titulo}`
                            : `Agregar ${extra.titulo}`
                        }
                        aria-pressed={isSelected}
                      >
                        {isSelected ? "✓" : "+"}
                      </button>
                    </div>

                    <h3 className={styles.cardTitle}>
                      {extra.titulo}
                    </h3>

                    <p className={styles.description}>
                      {extra.descripcion}
                    </p>

                    {isGeneralQR && (
                      <p className={styles.requirement}>
                        QR único para compartir la invitación.
                        No requiere control de invitados.
                      </p>
                    )}

                    {isPersonalQR &&
                      planLevel < 4 && (
                        <p className={styles.requirement}>
                          Requiere control de invitados.
                          Se agregará automáticamente
                          al seleccionarlo.
                        </p>
                      )}

                    <div className={styles.cardBottom}>
                      <span className={styles.price}>
                        +{formatMoney(extra.precio)}
                      </span>

                      <button
                        type="button"
                        className={styles.miniAction}
                        onClick={() =>
                          toggleExtra(extra)
                        }
                      >
                        {isSelected
                          ? "Quitar"
                          : "Agregar"}

                        <span aria-hidden="true">
                          {isSelected ? "−" : "+"}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {availableExtras.length === 0 && (
              <p className={styles.empty}>
                Tu paquete ya incluye todas
                las funciones disponibles.
              </p>
            )}

            <div
              className={styles.cartBox}
              id="resumen"
            >
              <div className={styles.cartContent}>
                <span className={styles.cartLabel}>
                  TU COTIZACIÓN
                </span>

                <strong>
                  {eventType === "xv"
                    ? "XV años"
                    : "Boda"}{" "}
                  · {selectedPlan.name}
                </strong>

                <p>
                  {effectiveExtras.length === 0
                    ? "Sin complementos adicionales"
                    : `${effectiveExtras.length} complemento(s) seleccionado(s)`}
                </p>

                <strong>
                  Total: {formatMoney(total)}
                </strong>
              </div>

              <div className={styles.cartActions}>
                <button
                  type="button"
                  className={styles.viewButton}
                  onClick={() =>
                    setShowSummary(true)
                  }
                >
                  Ver resumen
                </button>

                <button
                  type="button"
                  className={styles.extraButton}
                  onClick={sendToWhatsApp}
                >
                  Cotizar por WhatsApp ↗
                </button>
              </div>
            </div>
          </>
        )}

        {showSummary && selectedPlan && (
          <div
            className={styles.modalOverlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowSummary(false);
              }
            }}
          >
            <div
              className={styles.modal}
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="wedly-summary-title"
            >
              <button
                type="button"
                ref={closeRef}
                className={styles.closeButton}
                onClick={() =>
                  setShowSummary(false)
                }
                aria-label="Cerrar resumen"
              >
                ×
              </button>

              <span className={styles.modalLabel}>
                TU SELECCIÓN WEDLY
              </span>

              <h3 id="wedly-summary-title">
                Resumen de tu invitación
              </h3>

              <div className={styles.summaryBlock}>
                <div className={styles.summaryItem}>
                  <span>
                    {eventType === "xv"
                      ? "XV años"
                      : "Boda"}{" "}
                    · {selectedPlan.name}
                  </span>

                  <strong>
                    {formatMoney(planTotal)}
                  </strong>
                </div>

                {effectiveExtras.length > 0 ? (
                  effectiveExtras.map((extra) => (
                    <div
                      className={styles.summaryItem}
                      key={extra.id}
                    >
                      <span>{extra.titulo}</span>

                      <strong>
                        {formatMoney(extra.precio)}
                      </strong>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyText}>
                    Sin complementos adicionales.
                  </p>
                )}
              </div>

              <div className={styles.totalBox}>
                <span>TOTAL ESTIMADO</span>
                <strong>
                  {formatMoney(total)}
                </strong>
              </div>

              <p className={styles.disclaimer}>
                El precio corresponde a las funciones
                seleccionadas. Los detalles finales
                se confirman con el equipo Wedly.
              </p>

              <div className={styles.summaryActions}>
                <button
                  type="button"
                  className={styles.whatsappButton}
                  onClick={sendToWhatsApp}
                >
                  Enviar cotización por WhatsApp ↗
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
