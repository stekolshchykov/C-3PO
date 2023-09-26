export interface IElectronAPI {
    windowBlur: () => void
    windowFocus: () => void
    dockedWindowModeOn: () => void
    dockedWindowModeOff: () => void
    store: (data: string) => Promise<any>
    // ping: any
}


// systemStore: (value: {
//     key: string,
//     value: any
// }) => Promise<any>