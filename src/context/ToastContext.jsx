import { createContext, useState, useCallback } from "react";

export const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider ({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback ((message, type = 'success') => {
        const id = ++idCounter;
        setToasts((prev) => [...prev, {id, message, type }]);

        setTimeout(() => {
           removeToast(id); 
        }, 3000);
    }, [removeToast]);

    const value = { toasts, showToast, removeToast };
    
    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
}