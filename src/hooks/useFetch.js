import { useState, useEffect, useCallback } from "react";

/**
 * Hook genérico para ejecutar una función async y exponer
 * sus estados de carga/error/datos de forma reutilizable.
 * 
 * @param {Function} fetchFN - funcion async a ejecutar
 * @param {Array} deps - dependencias que disparan un nuevo fetch
 */

function useFetch(fetchFn, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const execute = useCallback( async () => {
        setIsLoading(true);
        setError(null);

        try{
            const result = await fetchFn();
            setData(result);
        }catch (err) {
            setError(err.message ?? 'Ha ocurrido un error inesperado.');
        }finally {
            setIsLoading(false);
        }
    }, deps);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, isLoading, error, refetch: execute };
}

export default useFetch;