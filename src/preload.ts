import {contextBridge, ipcRenderer} from "electron"
import {IElectronAPI} from "./IElectronAPI";

const electronAPI: IElectronAPI = {
// const electronAPI: any = {
    windowFocus: () => ipcRenderer.send("windowFocus"),
    windowBlur: () => ipcRenderer.send("windowBlur"),
    dockedWindowModeOn: () => ipcRenderer.send("dockedWindowModeOn"),
    dockedWindowModeOff: () => ipcRenderer.send("dockedWindowModeOff"),
    store: (data) => ipcRenderer.invoke('store', data)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

