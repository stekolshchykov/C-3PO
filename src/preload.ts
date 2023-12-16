import {contextBridge, ipcRenderer} from "electron"
import {IElectronAPI} from "./IElectronAPI";

const electronAPI: IElectronAPI = {
// const electronAPI: any = {
    windowFocus: () => ipcRenderer.send("windowFocus"),
    windowBlur: () => ipcRenderer.send("windowBlur"),
    dockedWindowModeOn: () => ipcRenderer.send("dockedWindowModeOn"),
    dockedWindowModeOff: () => ipcRenderer.send("dockedWindowModeOff"),
    store: (data) => ipcRenderer.invoke('store', data),
    config: (data) => ipcRenderer.invoke('config', data),
    mainCommand: (data) => ipcRenderer.invoke('mainCommand', data),
    autoLaunch: (data) => ipcRenderer.invoke('autoLaunch', data),
    // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
    openPage: (callback) => ipcRenderer.on('open-page', (_event, value) => callback(value)),
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

