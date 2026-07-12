import useToast from '../hooks/useToast';
import styles from './ToastContainer.module.css';

function ToastContainer() {
  const { toasts, remoceToast } = useToast();

  if (toasts.length === 0) return null;

  return (
        <div className={styles.container} role="status" aria-live="polite">
            {toasts.map((toast) => (
            <div
                key={toast.id}
                className={`${styles.toast} ${styles[toast.type]}`}
                onClick={() => removeToast(toast.id)}
            >
                {toast.message}
            </div>
            ))}
        </div>
    );
}


export default ToastContainer;