import { memo } from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";
import FavoriteButton from "./FavoriteButton";
import styles from "./Card.module.css";

function Card({ cve }) {
  return (
    <Link to={`/cve/${cve.id}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>{cve.id}</span>
        <Badge severity={cve.severity} />
        <FavoriteButton cve={cve} />
      </div>
      <p className={styles.description}>{cve.description}</p>
      {cve.score !== null && (
        <span className={styles.score}>Score: {cve.score}</span>
      )}
    </Link>
  );
}

export default memo(Card);
