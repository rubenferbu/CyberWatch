import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./SearchBar.module.css";

const SEVERITY_OPTIONS = [
  { value: "", label: "Todas las severidades" },
  { value: "CRITICAL", label: "Crítica" },
  { value: "HIGH", label: "Alta" },
  { value: "MEDIUM", label: "Media" },
  { value: "LOW", label: "Baja" },
];

function SearchBar({ onSearch, onLiveChange, defaultValues }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues ?? { keyword: "", severity: "" },
  });

  const watchedValues = watch();

  useEffect(() => {
    onLiveChange(watchedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues.keyword, watchedValues.severity]);

  const onSubmit = (formData) => {
    onSearch(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Buscar por palabra clave (ej: apache, windows...)"
          className={styles.input}
          {...register("keyword", {
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        {errors.keyword && (
          <span className={styles.error}>{errors.keyword.message}</span>
        )}
      </div>

      <select className={styles.select} {...register("severity")}>
        {SEVERITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button type="submit" className={styles.button}>
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
