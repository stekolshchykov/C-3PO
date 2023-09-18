declare global {
    interface Window {
        electronAPI: {
            windowBlur: () => void;
            windowFocus: () => void;
        };
    }
}
export {};