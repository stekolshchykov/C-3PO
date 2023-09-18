import { contextBridge, ipcRenderer } from "electron"
import { IElectronAPI } from "./IElectronAPI"

const electronAPI: IElectronAPI = {
    windowFocus: () => ipcRenderer.send("windowFocus"),
    windowBlur: () => ipcRenderer.send("windowBlur")
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)