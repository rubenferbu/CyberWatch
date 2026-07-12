import { memo } from 'react';
import useFavorites from '../hooks/useFavorites';
import useToast from '../hooks/useToast';
import styles from './FavoriteButton.module.css';

function FavoriteButton({ cve, size = 'medium' }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { showToast } = useToast();
    const active = isFavorite(cve.id);

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(cve);
        showToast(
            active ? `${cve.id} eliminado de favoritos` : `${cve.id} añadido a favoritos`
        );
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            className={`${styles.button} ${active ? styles.active : ''} ${size === 'large' ? styles.large : ''}`}
            aria-label={active ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            aria-pressed={active}
        >
            {active ? '★' : '☆'}
        </button>
    );
}

export default memo(FavoriteButton);