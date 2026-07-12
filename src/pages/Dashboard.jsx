import useFavorites from "../hooks/useFavorites";
import Card from "../components/Card";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { favorites } = useFavorites();

  return (
    <section>
      <h1 className={styles.title}>Favoritos</h1>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          Todavía no has guardado ningún CVE como favorito. Márcalo con ☆ desde
          el buscador o el detalle.
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((cve) => (
            <Card key={cve.id} cve={cve} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
