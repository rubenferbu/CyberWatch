import { useState, useEffect } from "react";

/**
 * Retrasa la actualizacón de un valor hasta que 
 * el usuario deja de cambiarlo durante `delay` ms.
 */

function useDebounce (value, delay = 500) {
    const [ debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timeoutID);
    }, [value, delay]);
    return debouncedValue;
}

export default useDebounce;