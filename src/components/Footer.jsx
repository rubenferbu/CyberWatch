import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          © {currentYear} CyberWatch — Proyecto educativo con fines de
          portfolio.
        </p>
        <p className={styles.source}>
          Datos proporcionados por{" "}
          <a
            href="https://nvd.nist.gov"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVD (NIST)
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
