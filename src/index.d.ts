declare global {
    interface Window {
        electronAPI: {
            windowBlur: () => void;
            windowFocus: () => void;
            dockedWindowModeOn: () => void;
            dockedWindowModeOff: () => void;
        };
    }
}
export {};