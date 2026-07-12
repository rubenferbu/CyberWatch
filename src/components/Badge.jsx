import styles from "./Badge.module.css";

const SEVERITY_LABELS = {
  critical: "Crítica",
  high: "Alta",
  medium: "Media",
  low: "Baja",
  none: "N/D",
};

function Badge({ severity, size = "medium" }) {
  const severityClass = styles[severity] ?? styles.none;
  const sizeClass = size === "large" ? styles.sizeLarge : styles.sizeMedium;

  return (
    <span className={`${styles.badge} ${severityClass} ${sizeClass}`}>
      {SEVERITY_LABELS[severity] ?? SEVERITY_LABELS.none}
    </span>
  );
}

export default Badge;
