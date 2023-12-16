import {SystemStore} from "./SystemStore";
import {HotKeys} from "./HotKeys";
import {IConfig} from "../type";

class Config {

    systemStore: SystemStore
    ipcMain: Electron.IpcMain
    hotKeys: HotKeys

    constructor(systemStore: SystemStore, ipcMain: Electron.IpcMain, hotKeys: HotKeys) {
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
        if (hotKeys) {
            hotKeys.forEach(hk => {
                this.hotKeys.set(hk.key, hk.page)
            })
        }
    }

}

export default Config
