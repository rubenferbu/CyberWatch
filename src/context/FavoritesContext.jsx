import { createContext, useState, useEffect } from "react";

const STORAGE_KEY = 'cyberwatch_favorites';

export const FavoritesContext = createContext(null);

function loadFavoritesFromStorage(){
    try{
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return[];
    }
}

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(loadFavoritesFromStorage);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (cveId) => favorites.some((fav) => fav.id === cveId);

    const toggleFavorite = (cve) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === cve.id)
                ? prev.filter((fav) => fav.id !== cve.id)
                : [...prev, cve]
        );
    };

    const value = { favorites, isFavorite, toggleFavorite };

    return(
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}