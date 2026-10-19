
import { useEffect, useRef, useState } from "react";
import styles from "./Gallery.module.css";

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

// Cambio automático cada 6 segundos
const AUTO_INTERVAL = 6000;

// Pausa después de deslizar manualmente
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
  // DESPLAZAR CARRUSEL
  // ==========================================

  const goTo = (index, behavior = "smooth") => {
    const carousel = carouselRef.current;

    if (!carousel || total === 0) return;

    const next = ((index % total) + total) % total;
    const card = carousel.children[next];

    if (!card) return;

    activeIndexRef.current = next;

    carousel.scrollTo({
      left: card.offsetLeft - carousel.offsetLeft,
      behavior: reducedMotion ? "instant" : behavior,
    });
  };

  // ==========================================
  // PAUSA TEMPORAL
  // ==========================================

  const pauseTemporarily = () => {
    setPaused(true);

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    pauseTimerRef.current = setTimeout(() => {
      pauseTimerRef.current = null;
      setPaused(false);
    }, RESUME_DELAY);
  };

  // ==========================================
  // DETECTAR DESLIZAMIENTO
  // ==========================================

  const handleScroll = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const cards = Array.from(carousel.children);
    const currentPosition = carousel.scrollLeft;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardPosition =
        card.offsetLeft - carousel.offsetLeft;

      const distance = Math.abs(
        cardPosition - currentPosition
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    activeIndexRef.current = nearestIndex;
  };

  // ==========================================
  // DESLIZAMIENTO CON EL DEDO
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

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    activeIndexRef.current = 0;
    setPaused(false);
    setEventType(type);
  };

  // Reiniciar al cambiar celebración
  useEffect(() => {
    activeIndexRef.current = 0;

    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
  }, [eventType]);

  // ==========================================
  // ACCESIBILIDAD
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
  // DETECTAR VISIBILIDAD
  // ==========================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

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
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
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
            Ejemplos
          </h2>

          <p className={styles.subtitle}>
            Descubre la invitación perfecta
            para tu celebración.
          </p>

          {/* SELECTOR DE CELEBRACIÓN */}
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
                  {/* IMAGEN CON AJUSTE PARA PLUS */}
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

                  {/* INFORMACIÓN SOBRE IMAGEN */}
                  <div className={styles.slideContent}>
                    <span className={styles.slideCategory}>
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

        {/* NOTA INFERIOR */}
        <p className={styles.bottomNote}>
          «Desliza para ver más ejemplos»
        </p>

      </div>
    </section>
  );
}
