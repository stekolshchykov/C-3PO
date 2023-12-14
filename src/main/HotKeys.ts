import {BrowserWindow, globalShortcut, Tray} from "electron";
import {showWindow} from "./function";

export class HotKeys {

    app!: Electron.App
    mainWindow!: BrowserWindow
    tray!: Tray

    setHideShowTempKey: null | string = null

    constructor(app: Electron.App, mainWindow: BrowserWindow, tray: Tray) {

        this.app = app
        this.mainWindow = mainWindow
        this.tray = tray

        this.event()

    }

    setHideShow = (hotKey: string, openPage?: string) => {

        if (this.setHideShowTempKey && globalShortcut.isRegistered(this.setHideShowTempKey)) {
            globalShortcut.unregister(this.setHideShowTempKey)
            this.setHideShowTempKey = null
        }

        this.setHideShowTempKey = hotKey

        globalShortcut.register(hotKey, () => {
            if (this.mainWindow)
                if (this.mainWindow.isVisible()) {
                    this.mainWindow.hide();
                } else {
                    showWindow(this.tray, this.mainWindow);
                    if (openPage) {
                        this.mainWindow.webContents.send('open-page', openPage)
                    }
                }
        })

    }

    event = () => {
        this.app.on('will-quit', () => {
            globalShortcut.unregisterAll();
        });
    }

}

