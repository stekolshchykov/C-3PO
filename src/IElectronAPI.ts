export interface IElectronAPI {
    windowBlur: () => void
    windowFocus: () => void
    dockedWindowModeOn: () => void
    dockedWindowModeOff: () => void
    store: (data: string) => Promise<any>
    config: (data: string) => Promise<any>
    autoLaunch: (data: string) => Promise<any>
    // onUpdateCounter: (data: any) => any
    openPage: (data: any) => void
}


// systemStore: (value: {
//     key: string,
//     value: any
// }) => Promise<any>
