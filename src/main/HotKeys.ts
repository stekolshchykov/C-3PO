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

    set = (hotKey: string, openPage?: string) => {
        globalShortcut.unregisterAll()
        // set HotKey
        globalShortcut.register(hotKey, () => {
            if (this.mainWindow)
                if (this.mainWindow.isVisible()) {
                    this.mainWindow.hide()
                } else {
                    showWindow(this.tray, this.mainWindow)
                    if (openPage) {
                        this.mainWindow.webContents.send('open-page', openPage)
                    }
                }
        })

    }

}

