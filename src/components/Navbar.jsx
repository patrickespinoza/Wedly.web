import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        W<em>edly</em>
      </div>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><button onClick={() => scrollTo('galeria')}>Invitaciones</button></li>
        <li><button onClick={() => scrollTo('precios')}>Precios</button></li>
        <li className='tex-black'><button onClick={() => scrollTo('contacto')}>Contacto</button></li>
      </ul>



      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}
