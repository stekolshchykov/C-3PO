import {SystemStore} from "./SystemStore";

class History {

    systemStore: SystemStore
    ipcMain: Electron.IpcMain

    constructor(systemStore: SystemStore, ipcMain: Electron.IpcMain) {
        this.systemStore = systemStore
        this.ipcMain = ipcMain
        this.events()
    }

    events = () => {
        this.ipcMain.handle('history', async (_, data) => {
            const dataObj = JSON.parse(data)
            if (dataObj.value.key === "set") {
                this.systemStore.set("history", dataObj.value.value)
            } else if (dataObj.value.key === "load") {
                return this.systemStore.get("history") || []
            } else if (dataObj.value.key === "clear") {
                this.systemStore.set("history", [])
            }
        })
    }

}

export default History
