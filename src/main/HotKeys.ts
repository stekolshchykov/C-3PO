import {BrowserWindow, globalShortcut, Tray} from "electron";
import {showWindow} from "./function";

export class HotKeys {

    app!: Electron.App
    mainWindow!: BrowserWindow
    tray!: Tray

    constructor(app: Electron.App, mainWindow: BrowserWindow, tray: Tray) {
        this.app = app
        this.mainWindow = mainWindow
        this.tray = tray
    }

    set = (hotKeys: { key: string, page: string, isOn?: boolean }[]) => {
        globalShortcut.unregisterAll()
        // set HotKey
        hotKeys.forEach(hk => {
            if (hk.isOn)
                globalShortcut.register(hk.key, () => {
                    if (this.mainWindow)
                        if (this.mainWindow.isVisible()) {
                            this.mainWindow.hide()
                        } else {
                            showWindow(this.tray, this.mainWindow)
                            if (hk.page) {
                                this.mainWindow.webContents.send('open-page', hk.page)
                            }
                        }
                })
        })
    }

}

