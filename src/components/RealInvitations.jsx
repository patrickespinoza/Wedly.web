
import { useState } from "react";
import styles from "./RealInvitations.module.css";

const invitations = [
  {
    id: 1,
    names: "Janeth & Josué",
    category: "boda",
    image: "/Janeth-Josue.jpg",
    url: "https://janeth-josu.vercel.app/",
  },
  {
    id: 2,
    names: "Andrea & Alfonso",
    category: "boda",
    image: "/Andrea-Alfonso.jpg",
    url: "https://andrea-Alfonso.vercel.app/",
  },
];

const filters = [
  { id: "todos", label: "Todos" },
  { id: "boda", label: "Bodas" },
  { id: "xv", label: "XV años" },
];

export default function RealInvitations() {
  const [activeFilter, setActiveFilter] = useState("todos");

  const visibleInvitations = invitations.filter(
    (invitation) =>
      activeFilter === "todos" ||
      invitation.category === activeFilter
  );

  return (
    <section
      className={styles.section}
      id="invitaciones-reales"
    >
      <div className={styles.container}>
        {/* ENCABEZADO */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>NUESTRO PORTAFOLIO</span>
            <span className={styles.line} />
          </div>

          <h2 className={styles.title}>
            Historias que hemos
            <br />
            <em>acompañado.</em>
          </h2>

          <p className={styles.description}>
            Cada celebración tiene su propia esencia.
            Descubre algunas de las invitaciones
            digitales que hemos creado con dedicación
            y atención a cada detalle.
          </p>
        </header>

        {/* FILTROS */}
        <div
          className={styles.filters}
          role="group"
          aria-label="Filtrar invitaciones reales"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`${styles.filterButton} ${
                activeFilter === filter.id
                  ? styles.activeFilter
                  : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* GALERÍA */}
        {visibleInvitations.length > 0 ? (
          <div className={styles.grid}>
            {visibleInvitations.map((invitation, index) => (
              <article
                key={invitation.id}
                className={styles.card}
              >
                <a
                  className={styles.imageLink}
                  href={invitation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver invitación de ${invitation.names}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={invitation.image}
                      alt={`Invitación digital de ${invitation.names}`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />

                    <div className={styles.imageOverlay}>
                      <span>VER INVITACIÓN ↗</span>
                    </div>

                    <span className={styles.cardIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </a>

                <div className={styles.cardInfo}>
                  <div>
                    <span className={styles.category}>
                      {invitation.category === "boda"
                        ? "BODA"
                        : "XV AÑOS"}
                    </span>

                    <h3 className={styles.names}>
                      {invitation.names}
                    </h3>
                  </div>

                  <a
                    href={invitation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.arrow}
                    aria-label={`Abrir invitación de ${invitation.names}`}
                  >
                    ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span>✦</span>
            <h3>Próximamente</h3>
            <p>
              Estamos preparando nuevas historias
              para compartir contigo.
            </p>
          </div>
        )}

        {/* PIE DE SECCIÓN */}
        <div className={styles.bottom}>
          <span className={styles.bottomLine} />
          <p>
            Diseños únicos para historias inolvidables.
          </p>
          <span className={styles.bottomLine} />
        </div>
      </div>
    </section>
  );
}
