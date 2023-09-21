export interface IElectronAPI {
    windowBlur: () => void
    windowFocus: () => void
    dockedWindowModeOn: () => void
    dockedWindowModeOff: () => void
}