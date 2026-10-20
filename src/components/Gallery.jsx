
import { useEffect, useRef, useState } from "react";
import styles from "./Gallery.module.css";

// ==========================================
// INVITACIONES
// ==========================================

const invitations = {
  boda: [
    {
      id: 1,
      name: "Esencial",
      image: "/Invitacion-01.jpg",
      url: "https://invitacion-web-01-b69a.vercel.app/",
    },
    {
      id: 2,
      name: "Plus",
      image: "/Invitacion-02.jpg",
      url: "https://invitacion-web-02.vercel.app/",
    },
    {
      id: 3,
      name: "Premium",
      image: "/Invitacion-03.jpg",
      url: "https://invitacion-web-03.vercel.app/",
    },
    {
      id: 4,
      name: "Luxe",
      image: "/Invitacion-04.jpg",
      url: "https://invitacion-web-04.vercel.app/",
    },
  ],

  xv: [
    {
      id: 1,
      name: "Esencial",
      image: "/Invitacion-xv-01.jpg",
      url: "https://invitacion-xv-01.vercel.app/",
    },
    {
      id: 2,
      name: "Plus",
      image: "/InvitacionXV-02.jpg",
      url: "https://invitacion-xv-02.vercel.app/",
    },
    {
      id: 3,
      name: "Premium",
      image: "/InvitacionXV-03.jpg",
      url: "https://prueba2-rho-one.vercel.app/",
    },
    {
      id: 4,
      name: "Luxe",
      image: "/InvitacionXV-04.jpg",
      url: "https://prueba-mu-ivory.vercel.app/",
    },
  ],
};

// ==========================================
// CONFIGURACIÓN
// ==========================================

const AUTO_INTERVAL = 6000;
const RESUME_DELAY = 12000;

export default function Gallery() {
  const [eventType, setEventType] = useState("boda");
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const activeIndexRef = useRef(0);
  const pauseTimerRef = useRef(null);
  const touchStartRef = useRef(null);
  const suppressClickRef = useRef(false);

  const currentInvitations = invitations[eventType];
  const total = currentInvitations.length;

  // ==========================================
  // MOVER CARRUSEL
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
  // BOTONES IZQUIERDA / DERECHA
  // ==========================================

  const handlePrevious = () => {
    pauseTemporarily();

    const previous = activeIndexRef.current - 1;

    goTo(previous);
  };

  const handleNext = () => {
    pauseTemporarily();

    const next = activeIndexRef.current + 1;

    goTo(next);
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
  // DETECTAR POSICIÓN
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
  // CAMBIAR BODAS / XV AÑOS
  // ==========================================

  const changeEvent = (type) => {
    if (type === eventType) return;

    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = null;

    activeIndexRef.current = 0;
    setPaused(false);
    setEventType(type);
  };

  useEffect(() => {
    activeIndexRef.current = 0;

    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "auto",
    });
  }, [eventType]);

  // ==========================================
  // MOVIMIENTO REDUCIDO
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
  // CAMBIO AUTOMÁTICO
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

      goTo(activeIndexRef.current + 1);
    }, AUTO_INTERVAL);

    return () => clearInterval(timer);
  }, [
    eventType,
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
      id="galeria"
      aria-labelledby="titulo-galeria"
    >
      <div className={styles.container}>

        {/* ENCABEZADO */}

        <header className={styles.header}>
          <span className={styles.eyebrow}>
            WEDLY · NUESTRAS INVITACIONES
          </span>

          <h2
            className={styles.title}
            id="titulo-galeria"
          >
            Diseños
          </h2>

          <p className={styles.subtitle}>
            Descubre la invitación perfecta
            para tu celebración.
          </p>

          {/* SELECTOR */}

          <div
            className={styles.eventSelector}
            role="group"
            aria-label="Tipo de celebración"
          >
            <button
              type="button"
              className={`${styles.eventButton} ${
                eventType === "boda"
                  ? styles.eventButtonActive
                  : ""
              }`}
              onClick={() => changeEvent("boda")}
              aria-pressed={eventType === "boda"}
            >
              Bodas
            </button>

            <button
              type="button"
              className={`${styles.eventButton} ${
                eventType === "xv"
                  ? styles.eventButtonActive
                  : ""
              }`}
              onClick={() => changeEvent("xv")}
              aria-pressed={eventType === "xv"}
            >
              XV años
            </button>
          </div>
        </header>

        {/* ======================================
            CARRUSEL CON FLECHAS
        ====================================== */}

        <div className={styles.carouselShell}>

          {/* FLECHA IZQUIERDA */}

          <button
            type="button"
            className={`${styles.navButton} ${styles.navPrevious}`}
            onClick={handlePrevious}
            aria-label="Ver diseño anterior"
          >
            <span aria-hidden="true">‹</span>
          </button>

          {/* CARRUSEL */}

          <div className={styles.carouselArea}>
            <div
              key={eventType}
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
              aria-label={`Galería de invitaciones de ${
                eventType === "boda"
                  ? "boda"
                  : "XV años"
              }`}
            >
              {currentInvitations.map((inv, index) => (
                <a
                  key={`${eventType}-${inv.id}`}
                  className={styles.slide}
                  href={inv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver invitación ${inv.name}`}
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
                      src={inv.image}
                      alt={`Invitación digital ${inv.name}`}
                      className={`${styles.image} ${
                        inv.name === "Plus"
                          ? styles.imagePlus
                          : ""
                      }`}
                      loading={
                        index === 0 ? "eager" : "lazy"
                      }
                      decoding="async"
                      draggable="false"
                    />

                    <div
                      className={styles.imageGradient}
                    />

                    <div className={styles.slideContent}>
                      <span
                        className={styles.slideCategory}
                      >
                        {eventType === "boda"
                          ? "BODA"
                          : "XV AÑOS"}
                      </span>

                      <h3 className={styles.slideTitle}>
                        {inv.name}
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
              ))}
            </div>
          </div>

          {/* FLECHA DERECHA */}

          <button
            type="button"
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={handleNext}
            aria-label="Ver siguiente diseño"
          >
            <span aria-hidden="true">›</span>
          </button>

        </div>

        {/* INDICACIÓN SOLO EN CELULAR */}

        <p className={styles.bottomNote}>
          Desliza para ver más diseños
        </p>

      </div>
    </section>
  );
}
