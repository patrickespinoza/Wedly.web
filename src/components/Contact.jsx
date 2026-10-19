
import { useMemo } from "react";
import styles from "./Contact.module.css";

import {
  PLAN_LEVEL,
  formatMoney,
  normalizeExtras,
} from "../data/catalog";

const WHATSAPP_PHONE = "522224649120";

export default function Contact({
  eventType = "boda",
  selectedPlan,
  selectedExtras = [],
}) {
  const celebration =
    eventType === "xv" ? "XV años" : "Boda";

  const selection = useMemo(() => {
    if (!selectedPlan) return null;

    const level =
      PLAN_LEVEL[selectedPlan.id] || 0;

    const extras = normalizeExtras(
      selectedExtras,
      level,
      eventType
    );

    const extrasTotal = extras.reduce(
      (sum, extra) => sum + extra.precio,
      0
    );

    return {
      extras,
      total: Number(selectedPlan.price) + extrasTotal,
    };
  }, [selectedPlan, selectedExtras, eventType]);

  const whatsappUrl = useMemo(() => {
    if (!selectedPlan || !selection) {
      const message =
        `Hola, equipo Wedly. Me gustaría recibir información sobre una invitación digital para ${celebration}.`;

      return (
        `https://wa.me/${WHATSAPP_PHONE}` +
        `?text=${encodeURIComponent(message)}`
      );
    }

    const extrasText = selection.extras.length
      ? selection.extras
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
      "📦 PAQUETE SELECCIONADO",
      `${selectedPlan.name}: ${formatMoney(selectedPlan.price)}`,
      "",
      "✨ COMPLEMENTOS",
      extrasText,
      "",
      `💰 TOTAL ESTIMADO: ${formatMoney(selection.total)}`,
      "",
      "¿Me pueden ayudar con los siguientes pasos?",
    ].join("\n");

    return (
      `https://wa.me/${WHATSAPP_PHONE}` +
      `?text=${encodeURIComponent(message)}`
    );
  }, [
    selectedPlan,
    selection,
    celebration,
  ]);

  return (
    <section
      className={styles.section}
      id="contacto"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>ESTAMOS PARA TI</span>
            <span className={styles.eyebrowLine} />
          </div>

          <h2 className={styles.title}>
            Comencemos a
            <br />
            <em>crear tu historia.</em>
          </h2>

          <p className={styles.desc}>
            Cada celebración merece una invitación
            especial. Cuéntanos cómo imaginas la tuya
            y te ayudaremos a crearla con atención
            a cada detalle.
          </p>

          <div className={styles.eventTypes}>
            <span>BODAS</span>
            <span className={styles.separator}>
              ✦
            </span>
            <span>XV AÑOS</span>
          </div>
        </header>

        <div className={styles.cards}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card} ${styles.primaryCard}`}
          >
            <span className={styles.cardNumber}>
              01 / CONTACTO DIRECTO
            </span>

            <div className={styles.icon}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                <path d="M9 9.5c.7 2.2 2.3 3.8 4.5 4.5l1.5-1.3 2.1 1.1c-.3 1.6-1.4 2.4-2.7 2.4-4.3-.2-7.2-3.1-7.4-7.4 0-1.3.8-2.4 2.4-2.7L9 9.5Z" />
              </svg>
            </div>

            <h3>WhatsApp</h3>

            <p>
              Hablemos de tu invitación y resolvamos
              tus dudas de manera personalizada.
            </p>

            {selectedPlan && (
              <span className={styles.selectedHint}>
                Tu selección: {celebration} ·{" "}
                {selectedPlan.name}
              </span>
            )}

            <span className={styles.link}>
              Iniciar conversación
              <span aria-hidden="true">↗</span>
            </span>
          </a>

          <a
            href="https://instagram.com/wedly_invitaciones"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.cardNumber}>
              02 / INSPIRACIÓN
            </span>

            <div className={styles.icon}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />
                <circle
                  cx="17.7"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>

            <h3>Instagram</h3>

            <p>
              Descubre nuestros diseños, detalles
              e inspiración para bodas y XV años.
            </p>

            <span className={styles.account}>
              @wedly_invitaciones
            </span>

            <span className={styles.link}>
              Explorar Instagram
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>

        <div className={styles.emailSection}>
          <span className={styles.emailLabel}>
            ¿PREFIERES ESCRIBIRNOS POR CORREO?
          </span>

          <a
            href="mailto:wedly680@gmail.com"
            className={styles.email}
          >
            wedly680@gmail.com
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.bottomNote}>
          <span aria-hidden="true">✧</span>

          <p>
            Diseños personalizados para momentos inolvidables.
          </p>

          <span aria-hidden="true">✧</span>
        </div>
      </div>
    </section>
  );
}
