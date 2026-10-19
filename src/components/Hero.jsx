
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="inicio"
      className={`${styles.hero} ${
        visible ? styles.visible : ""
      }`}
    >
      <div className={styles.topLine}>
        <span>WEDLY STUDIO</span>
        <span>INVITACIONES DIGITALES</span>
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.line} />
          <span>DISEÑOS CREADOS PARA TI</span>
          <span className={styles.line} />
        </div>

        <h1 className={styles.heading}>
          Cada celebración
          <br />
          merece una
          <br />
          <em>historia única.</em>
        </h1>

        <p className={styles.description}>
          Invitaciones digitales personalizadas que reflejan
          tu estilo, cuentan tu historia y hacen que cada
          detalle sea inolvidable.
        </p>

        <div className={styles.price}>
          <span className={styles.priceLabel}>
            INVITACIONES DESDE
          </span>

          <div className={styles.priceAmount}>
            <span className={styles.currency}>$</span>
            <span>400</span>
            <span className={styles.mx}>MXN</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => scrollTo("precios")}
          >
            Explorar paquetes
            <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => scrollTo("galeria")}
          >
            Ver invitaciones
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className={styles.footnote}>
          BODAS <span>✦</span> XV AÑOS <span>✦</span>
          
        </p>
      </div>

      <div className={styles.bottom}>
        <span>DISEÑO PERSONALIZADO</span>

        <button
          type="button"
          className={styles.scrollButton}
          onClick={() => scrollTo("galeria")}
          aria-label="Desplazarse para ver invitaciones"
        >
          <span>DESCUBRE WEDLY</span>
          <span className={styles.arrow}>↓</span>
        </button>

        <span>HECHO CON DEDICACIÓN</span>
      </div>
    </section>
  );
}
