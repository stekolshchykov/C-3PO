export interface IElectronAPI {
    windowBlur: () => void
    windowFocus: () => void
    dockedWindowModeOn: () => void
    dockedWindowModeOff: () => void
    store: (data: string) => Promise<any>
    autoLaunch: (data: string) => Promise<any>
}


// systemStore: (value: {
//     key: string,
//     value: any
// }) => Promise<any>