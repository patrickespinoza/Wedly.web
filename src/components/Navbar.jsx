
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const links = [
    { label: "Inicio", id: "inicio" },
    { label: "Invitaciones", id: "galeria" },
    {
      label: "Invitaciones reales",
      id: "invitaciones-reales",
    },
    { label: "Paquetes", id: "precios" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <header
      className={`${styles.nav} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.inner}>
        {/* LOGOTIPO */}
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollTo("inicio")}
          aria-label="Wedly - Ir al inicio"
        >
          <em>Wedly</em>
          <span>STUDIO</span>
        </button>

        {/* NAVEGACIÓN */}
        <nav
          className={`${styles.links} ${
            menuOpen ? styles.open : ""
          }`}
          aria-label="Navegación principal"
          id="wedly-navigation"
        >
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}

          {/* BOTÓN MÓVIL */}
          <button
            type="button"
            className={styles.mobileCTA}
            onClick={() => scrollTo("precios")}
          >
            Ver precios
          </button>
        </nav>

        {/* BOTÓN PRINCIPAL */}
        <button
          type="button"
          className={styles.cta}
          onClick={() => scrollTo("precios")}
        >
          Ver paquetes
          <span aria-hidden="true">↗</span>
        </button>

        {/* MENÚ HAMBURGUESA */}
        <button
          type="button"
          className={`${styles.hamburger} ${
            menuOpen ? styles.active : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen ? "Cerrar menú" : "Abrir menú"
          }
          aria-expanded={menuOpen}
          aria-controls="wedly-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
