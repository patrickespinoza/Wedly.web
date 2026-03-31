import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Wedly</div>
      <p className={styles.copy}>
        © 2025 Wedly · Invitaciones digitales para bodas · Puebla, México
      </p>
    </footer>
  )
}
