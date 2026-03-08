import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext();

// this whole function uses react context, it's a bit confusing so check it out via docs first
// basically, it just tracks how many calls to loading there are, and stops showing the loading screen when the count gets to 0
export function LoadingProvider({ children }) {
    const [loadingCount, setLoadingCount] = useState(0);
    const [showTransition, setShowTransition] = useState(false);

    useEffect(() => {
    if (loadingCount > 0) {
        setShowTransition(true);
    } else {
        setShowTransition(false);
    }
    }, [loadingCount]);

    const startLoading = () => setLoadingCount(c => c + 1);
    const stopLoading = () => setLoadingCount(c => Math.max(0, c - 1));

    // return the loadingprovider with the initialized values
    // {children} should be LoadingScreen.jsx
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