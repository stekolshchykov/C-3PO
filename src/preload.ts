import {contextBridge, ipcRenderer} from "electron"
import {IElectronAPI} from "./IElectronAPI"

const electronAPI: IElectronAPI = {
    windowFocus: () => ipcRenderer.send("windowFocus"),
    windowBlur: () => ipcRenderer.send("windowBlur"),
    dockedWindowModeOn: () => ipcRenderer.send("dockedWindowModeOn"),
    dockedWindowModeOff: () => ipcRenderer.send("dockedWindowModeOff")
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

