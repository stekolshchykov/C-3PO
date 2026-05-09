import {SystemStore} from "./SystemStore";
import {HotKeys} from "./HotKeys";
import {IConfig} from "../type";
import AutoLaunch from "auto-launch";
import {BrowserWindow} from "electron";

class Config {

    systemStore: SystemStore
    ipcMain: Electron.IpcMain
    hotKeys: HotKeys
    appAutoLauncher: AutoLaunch
    mainWindow: BrowserWindow

    constructor(systemStore: SystemStore, ipcMain: Electron.IpcMain, hotKeys: HotKeys, appAutoLauncher: AutoLaunch, mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow
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
        let hotKeys = config?.hotKeys
        hotKeys = hotKeys?.map(hk => {
            const {page} = hk
            const keys = Object.keys(config.tabs)
            const position = keys.indexOf(page)
            let isOn = false
            try {
                // @ts-ignore
                isOn = config?.tabs[`${Object.keys(config?.tabs)[position]}`]?.on
            } catch (e) {
                //
            }
            return {...hk, isOn}
        })
        if (hotKeys) this.hotKeys.set(hotKeys)
        //
        const windowHeight = config?.windowHeight || 600
        const windowWidth = config?.windowWidth || 730


        this.mainWindow.setSize(windowWidth, windowHeight,);

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
