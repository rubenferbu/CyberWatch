import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.container} role="alert">
      <div className={styles.iconWrapper} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path
            fill="currentColor"
            d="M12 2L1 21h22L12 2zm0 4.5L19.5 19h-15L12 6.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"
          />
        </svg>
      </div>

      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>
        No hemos encontrado la página que buscas. Puede que el CVE no exista o
        que el enlace esté roto.
      </p>

      <Link to="/" className={styles.button}>
        ← Volver al buscador
      </Link>
    </section>
  );
}

export default NotFound;
