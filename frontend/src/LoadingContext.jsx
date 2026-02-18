import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loadingCount, setLoadingCount] = useState(0);
    const [showTransition, setShowTransition] = useState(false);

    useEffect(() => {
    if (loadingCount > 0) {
        setShowTransition(true);
    } else {
        // If you don't actually need a fade-out animation delay, 
        // set this to false immediately.
        setShowTransition(false);
    }
    }, [loadingCount]);

    const startLoading = () => setLoadingCount(c => c + 1);
    const stopLoading = () => setLoadingCount(c => Math.max(0, c - 1));

    return (
        <LoadingContext.Provider value={{
            isLoading: loadingCount > 0,
            showTransition,
            startLoading,
            stopLoading
        }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}