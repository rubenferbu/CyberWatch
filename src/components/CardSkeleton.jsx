import styles from './CardSkeleton.module.css';

function CardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.line} style={{ width: '40%' }} />
      <div className={styles.line} style={{ width: '100%' }} />
      <div className={styles.line} style={{ width: '90%' }} />
      <div className={styles.line} style={{ width: '60%' }} />
    </div>
  );
}

export default CardSkeleton;