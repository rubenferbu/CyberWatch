import { useParams, Link } from 'react-router-dom';
import { useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import { getCveById } from '../services/nvdApi';
import Badge from '../components/Badge';
import styles from './CveDetail.module.css';
import FavoriteButton from '../components/FavoriteButton';

function CveDetail() {
  const { cveId } = useParams();

  const fetchFn = useCallback(() => getCveById(cveId), [cveId]);
  const { data: cve, isLoading, error } = useFetch(fetchFn, [fetchFn]);

  if (isLoading) {
    return <p className={styles.status}>Cargando detalle del CVE...</p>;
  }

  if (error) {
    return (
      <div className={styles.status}>
        <p className={styles.error}>Error: {error}</p>
        <Link to="/" className={styles.backLink}>← Volver al buscador</Link>
      </div>
    );
  }

  return (
    <article className={styles.detail}>
      <Link to="/" className={styles.backLink}>← Volver al buscador</Link>

      <header className={styles.header}>
        <h1 className={styles.id}>{cve.id}</h1>
        <Badge severity={cve.severity} size="large" />
        <FavoriteButton cve={cve} size="large" />
      </header>

      {cve.score !== null && (
        <p className={styles.score}>Score CVSS: {cve.score}</p>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Descripción</h2>
        <p className={styles.description}>{cve.description}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fechas</h2>
        <dl className={styles.dates}>
          <dt>Publicado</dt>
          <dd>{new Date(cve.publishedDate).toLocaleDateString('es-ES')}</dd>
          <dt>Última modificación</dt>
          <dd>{new Date(cve.lastModifiedDate).toLocaleDateString('es-ES')}</dd>
        </dl>
      </section>
    </article>
  );
}

export default CveDetail;