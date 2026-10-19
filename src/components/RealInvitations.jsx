
import { useEffect, useRef, useState } from "react";
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

const AUTO_INTERVAL = 6000;
const RESUME_DELAY = 12000;

export default function RealInvitations() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const activeIndexRef = useRef(0);
  const pauseTimerRef = useRef(null);
  const touchStartRef = useRef(null);
  const suppressClickRef = useRef(false);

  const visibleInvitations = invitations.filter(
    (invitation) =>
      activeFilter === "todos" ||
      invitation.category === activeFilter
  );

  const total = visibleInvitations.length;

  // ==========================================
  // MOVER EL CARRUSEL
  // ==========================================

  const goTo = (index, behavior = "smooth") => {
    const carousel = carouselRef.current;

    if (!carousel || total === 0) return;

    const next = ((index % total) + total) % total;
    const card = carousel.children[next];

    if (!card) return;

    activeIndexRef.current = next;

    const targetLeft =
      card.getBoundingClientRect().left -
      carousel.getBoundingClientRect().left +
      carousel.scrollLeft;

    carousel.scrollTo({
      left: targetLeft,
      behavior: reducedMotion ? "auto" : behavior,
    });
  };

  // ==========================================
  // PAUSA TEMPORAL
  // ==========================================

  const pauseTemporarily = () => {
    setPaused(true);

    clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      pauseTimerRef.current = null;
      setPaused(false);
    }, RESUME_DELAY);
  };

  // ==========================================
  // DETECTAR POSICIÓN ACTUAL
  // ==========================================

  const handleScroll = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const cards = Array.from(carousel.children);
    const carouselLeft =
      carousel.getBoundingClientRect().left;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left -
        carouselLeft
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    activeIndexRef.current = nearestIndex;
  };

  // ==========================================
  // DESLIZAMIENTO TÁCTIL
  // ==========================================

  const handleTouchStart = (event) => {
    touchStartRef.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current === null) return;

    const endX = event.changedTouches[0]?.clientX;

    if (endX === undefined) return;

    const distance = Math.abs(
      endX - touchStartRef.current
    );

    if (distance > 20) {
      pauseTemporarily();
      suppressClickRef.current = true;
    }

    touchStartRef.current = null;
  };

  // ==========================================
  // CAMBIAR FILTRO
  // ==========================================

  const changeFilter = (filter) => {
    if (filter === activeFilter) return;

    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = null;

    activeIndexRef.current = 0;
    setPaused(false);
    setActiveFilter(filter);
  };

  // ==========================================
  // RESPETAR MOVIMIENTO REDUCIDO
  // ==========================================

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      setReducedMotion(media.matches);
    };

    updateMotion();

    media.addEventListener("change", updateMotion);

    return () => {
      media.removeEventListener(
        "change",
        updateMotion
      );
    };
  }, []);

  // ==========================================
  // VISIBILIDAD DE LA SECCIÓN
  // ==========================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // ==========================================
  // REINICIAR AL CAMBIAR FILTRO
  // ==========================================

  useEffect(() => {
    activeIndexRef.current = 0;

    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "auto",
    });
  }, [activeFilter]);

  // ==========================================
  // MOVIMIENTO AUTOMÁTICO
  // ==========================================

  useEffect(() => {
    if (
      paused ||
      !isVisible ||
      reducedMotion ||
      total <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (document.hidden) return;

      const next =
        (activeIndexRef.current + 1) % total;

      goTo(next);
    }, AUTO_INTERVAL);

    return () => clearInterval(timer);
  }, [
    activeFilter,
    paused,
    isVisible,
    reducedMotion,
    total,
  ]);

  // ==========================================
  // LIMPIEZA
  // ==========================================

  useEffect(() => {
    return () => {
      clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="invitaciones-reales"
      aria-labelledby="real-invitations-title"
    >
      <div className={styles.container}>

        {/* ENCABEZADO */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>NUESTRO PORTAFOLIO</span>
            <span className={styles.line} />
          </div>

          <h2
            className={styles.title}
            id="real-invitations-title"
          >
            Historias que hemos
            <br />
            <em>acompañado.</em>
          </h2>

          <p className={styles.description}>
            Celebraciones reales, recuerdos únicos.
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
              onClick={() => changeFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* CARRUSEL */}
        {total > 0 ? (
          <div className={styles.carouselArea}>
            <div
              key={activeFilter}
              ref={carouselRef}
              className={styles.carousel}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onWheel={(event) => {
                if (Math.abs(event.deltaX) > 5) {
                  pauseTemporarily();
                }
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => {
                if (!pauseTimerRef.current) {
                  setPaused(false);
                }
              }}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget
                  ) &&
                  !pauseTimerRef.current
                ) {
                  setPaused(false);
                }
              }}
              aria-label="Invitaciones de clientes reales"
            >
              {visibleInvitations.map(
                (invitation, index) => (
                  <a
                    key={invitation.id}
                    className={styles.slide}
                    href={invitation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver invitación de ${invitation.names}`}
                    onClick={(event) => {
                      if (suppressClickRef.current) {
                        event.preventDefault();
                        suppressClickRef.current = false;
                      } else {
                        pauseTemporarily();
                      }
                    }}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={invitation.image}
                        alt={`Invitación digital de ${invitation.names}`}
                        className={styles.image}
                        loading={
                          index === 0 ? "eager" : "lazy"
                        }
                        decoding="async"
                        draggable="false"
                      />

                      <div
                        className={styles.imageGradient}
                      />

                      {/* INFORMACIÓN MÍNIMA */}
                      <div className={styles.slideContent}>
                        <span
                          className={styles.slideCategory}
                        >
                          {invitation.category === "boda"
                            ? "BODA REAL"
                            : "XV AÑOS"}
                        </span>

                        <h3 className={styles.slideTitle}>
                          {invitation.names}
                        </h3>

                        <span className={styles.slideLink}>
                          VER INVITACIÓN
                          <span aria-hidden="true">
                            ↗
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>

            {total > 1 && (
              <p className={styles.swipeHint}>
                Desliza para descubrir más historias →
              </p>
            )}
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
