import {SystemStore} from "./SystemStore";
import {HotKeys} from "./HotKeys";
import {IConfig} from "../type";
import AutoLaunch from "auto-launch";

class Config {

    systemStore: SystemStore
    ipcMain: Electron.IpcMain
    hotKeys: HotKeys
    appAutoLauncher: AutoLaunch

    constructor(systemStore: SystemStore, ipcMain: Electron.IpcMain, hotKeys: HotKeys, appAutoLauncher: AutoLaunch) {
        this.appAutoLauncher = appAutoLauncher
        this.hotKeys = hotKeys
        this.systemStore = systemStore
        this.ipcMain = ipcMain
        this.events()
        this.needUpdate()
    }

    events = () => {
        this.ipcMain.handle('config', async (_, data) => {
            const dataObj = JSON.parse(data)
            if (dataObj.value.key === "save") {
                this.systemStore.set("config", dataObj.value.value)
                this.needUpdate()
            } else if (dataObj.value.key === "load") {
                return this.systemStore.get("config")
            }
        })
    }

    needUpdate = async () => {
        const config: IConfig = await this.systemStore.get("config")
        const hotKeys = config?.hotKeys
        if (hotKeys) this.hotKeys.set(hotKeys)
        //
        this.autoLaunch()
    }

    private autoLaunch = async () => {
        const config: IConfig = await this.systemStore.get("config")
        if ((config?.autoStart !== null || config?.autoStart !== undefined) && this.appAutoLauncher) {
            if (config.autoStart === true) this.appAutoLauncher.enable()
            else if (config.autoStart === false) this.appAutoLauncher.disable()
        }
    }

}

export default Config
