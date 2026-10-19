
import { useState } from "react";
import styles from "./Gallery.module.css";

const invitations = {
  boda: [
    {
      id: 1,
      name: "Esencial",
      tag: "BODA · ESENCIAL",
      desc: "Elegancia que permanece en el tiempo.",
      image: "/Invitacion-01.jpg",
      url: "https://invitacion-web-01-b69a.vercel.app/",
    },
    {
      id: 2,
      name: "Plus",
      tag: "BODA · PLUS",
      desc: "Cada detalle cuenta una historia.",
      image: "/Invitacion-02.jpg",
      url: "https://invitacion-web-02.vercel.app/",
    },
    {
      id: 3,
      name: "Premium",
      tag: "BODA · PREMIUM",
      desc: "Una experiencia hecha para recordar.",
      image: "/Invitacion-03.jpg",
      url: "https://invitacion-web-03.vercel.app/",
    },
    {
      id: 4,
      name: "Luxe",
      tag: "BODA · LUXE",
      desc: "Sofisticación en cada momento.",
      image: "/Invitacion-04.jpg",
      url: "https://invitacion-web-04.vercel.app/",
    },
  ],

  xv: [
  
    {
      id: 1,
      name: "Esencial",
      tag: "XV AÑOS · ESENCIAL",
      desc: "El comienzo de una celebración inolvidable.",
      image: "/Invitacion-xv-01.jpg",
      url: "https://invitacion-xv-01.vercel.app/",
    },
    {
      id: 2,
      name: "Plus",
      tag: "XV AÑOS · PLUS",
      desc: "Un día especial merece cada detalle.",
      image: "InvitacionXV-02.jpg",
      url: "https://invitacion-xv-02.vercel.app/",
    },
    {
      id: 3,
      name: "Premium",
      tag: "XV AÑOS · PREMIUM",
      desc: "Una experiencia diseñada para recordar.",
      image: "/InvitacionXV-03.jpg",
      url: "https://prueba2-rho-one.vercel.app/",
    },
    {
      id: 4,
      name: "Luxe",
      tag: "XV AÑOS · LUXE",
      desc: "Una celebración extraordinaria.",
      image: "/InvitacionXV-04.jpg",
      url: "https://prueba-mu-ivory.vercel.app/",
    },
  ],
};

export default function Gallery() {
  const [eventType, setEventType] = useState("boda");

  const currentInvitations = invitations[eventType];
  const isWedding = eventType === "boda";

  return (
    <section
      className={styles.section}
      id="galeria"
      aria-labelledby="titulo-galeria"
    >
      <div className={styles.container}>
        {/* ENCABEZADO PRINCIPAL */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>WEDLY · NUESTROS DISEÑOS</span>
            <span className={styles.line} />
          </div>

          <h2
            className={styles.title}
            id="titulo-galeria"
          >
            Explora nuestros
            <br />
            <em>paquetes.</em>
          </h2>

          <p className={styles.subtitle}>
            Conoce algunos ejemplos de nuestras invitaciones
            digitales. Cada diseño puede personalizarse para
            reflejar tu estilo y hacer única tu celebración.
          </p>

          {/* SELECTOR DE CELEBRACIÓN */}
          <div
            className={styles.eventSelector}
            role="group"
            aria-label="Seleccionar tipo de celebración"
          >
            <button
              type="button"
              className={`${styles.eventButton} ${
                isWedding ? styles.eventButtonActive : ""
              }`}
              onClick={() => setEventType("boda")}
              aria-pressed={isWedding}
            >
              Bodas
            </button>

            <button
              type="button"
              className={`${styles.eventButton} ${
                !isWedding ? styles.eventButtonActive : ""
              }`}
              onClick={() => setEventType("xv")}
              aria-pressed={!isWedding}
            >
              XV años
            </button>
          </div>
        </header>

        {/* ENCABEZADO DE COLECCIÓN */}
        <div className={styles.collectionHeader}>
          <div className={styles.collectionHeading}>
            <span className={styles.collectionLabel}>
              {isWedding
                ? "COLECCIÓN BODAS"
                : "COLECCIÓN XV AÑOS"}
            </span>

            <h3 className={styles.collectionTitle}>
              {isWedding ? (
                <>
                  Paquetes de <em>boda.</em>
                </>
              ) : (
                <>
                  Paquetes de <em>XV años.</em>
                </>
              )}
            </h3>
          </div>

          <p className={styles.collectionCount}>
            04 DISEÑOS
          </p>
        </div>

        {/* GALERÍA */}
        <div
          className={styles.grid}
          key={eventType}
        >
          {currentInvitations.map((inv, index) => {
            const available = Boolean(inv.image && inv.url);

            const content = (
              <>
                <div className={styles.cardImg}>
                  {available ? (
                    <img
                      src={inv.image}
                      alt={`Vista previa del paquete ${inv.name}`}
                      className={styles.image}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      <span className={styles.placeholderLine} />

                      <span className={styles.placeholderInitial}>
                        XV
                      </span>

                      <span className={styles.placeholderTitle}>
                        {inv.name}
                      </span>

                      <span className={styles.placeholderText}>
                        PRÓXIMAMENTE
                      </span>

                      <span className={styles.placeholderLine} />
                    </div>
                  )}

                  <span className={styles.badge}>
                    {inv.tag}
                  </span>

                  <span className={styles.imageNumber}>
                    {String(index + 1).padStart(2, "0")}
                    {" / "}
                    04
                  </span>
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.cardTextGroup}>
                    <span className={styles.cardEyebrow}>
                      EJEMPLO DE INVITACIÓN
                    </span>

                    <h4 className={styles.cardTitle}>
                      {inv.name}
                    </h4>

                    <p className={styles.cardText}>
                      {inv.desc}
                    </p>
                  </div>

                  {available && (
                    <span
                      className={styles.arrow}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  )}
                </div>

                <span className={styles.viewLink}>
                  {available
                    ? "VER EJEMPLO INTERACTIVO"
                    : "DISEÑO EN PREPARACIÓN"}

                  {available && (
                    <span aria-hidden="true">→</span>
                  )}
                </span>
              </>
            );

            return available ? (
              <a
                key={`${eventType}-${inv.id}`}
                href={inv.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`Ver ejemplo interactivo del paquete ${inv.name}`}
              >
                {content}
              </a>
            ) : (
              <article
                key={`${eventType}-${inv.id}`}
                className={`${styles.card} ${styles.comingSoonCard}`}
              >
                {content}
              </article>
            );
          })}
        </div>

        {/* NOTA INFERIOR */}
        <p className={styles.bottomNote}>
          Los diseños mostrados son ejemplos.
          La personalización y las funciones disponibles
          dependen del paquete contratado.
        </p>
      </div>
    </section>
  );
}
