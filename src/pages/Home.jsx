import { useState, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { searchCves } from "../services/nvdApi";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import styles from "./Home.module.css";

function Home() {
  const [liveParams, setLiveParams] = useState({ keyword: "", severity: "" });
  const debouncedKeyword = useDebounce(liveParams.keyword, 800);

  const fetchFn = useCallback(
    () =>
      searchCves({
        keyword: debouncedKeyword,
        severity: liveParams.severity,
        resultsPerPage: 20,
      }),
    [debouncedKeyword, liveParams.severity],
  );

  const { data: cves, isLoading, error } = useFetch(fetchFn, [fetchFn]);

  return (
    <section>
      <h1 className={styles.title}>Buscador de CVEs</h1>
      <SearchBar
        onSearch={setLiveParams}
        onLiveChange={setLiveParams}
        defaultValues={liveParams}
      />

      {error && <p className={styles.error}>Error: {error}</p>}

      {isLoading && (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !error && cves?.length === 0 && (
        <p className={styles.empty}>No se encontraron resultados.</p>
      )}

      {!isLoading && !error && cves?.length > 0 && (
        <div className={styles.grid}>
          {cves.map((cve) => (
            <Card key={cve.id} cve={cve} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
