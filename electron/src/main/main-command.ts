import {SystemStore} from "./SystemStore";
import {TMainCommand} from "../type";
import App = Electron.App;

class MainCommand {

    systemStore: SystemStore
    ipcMain: Electron.IpcMain
    app: App

    constructor(systemStore: SystemStore, ipcMain: Electron.IpcMain, app: App) {
        this.app = app
        this.systemStore = systemStore
        this.ipcMain = ipcMain
        this.events()
    }

    events = () => {
        this.ipcMain.handle('mainCommand', async (_, data) => {
            const dataObj: {
                type?: TMainCommand
            } = JSON.parse(data)
            if (dataObj?.type === "quitFromAppHandler") {
                this.app.quit();
            }
        })
    }

}

export default MainCommand
