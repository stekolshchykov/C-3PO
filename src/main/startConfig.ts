import {BrowserWindow, globalShortcut, Menu, Tray} from 'electron';
import config from './config';

import Store from "electron-store";
import {IStoreData, IStoreDataObjSet} from "../type";

const showWindow = (tray: Tray, mainWindow: BrowserWindow) => {
    const {x, y} = tray.getBounds();
    const trayWidth = tray.getBounds().width;
    const trayHeight = tray.getBounds().height;
    const windowWidth = config.width; // Замените на ширину вашего окна
    const xPos = x + trayWidth / 2 - windowWidth / 2;
    const yPos = y - trayHeight;
    mainWindow.setPosition(xPos, yPos);
    mainWindow.show();
};
export const hideInTray = (app: Electron.App) => {
    app.whenReady().then(() => {
        app.dock.hide();
    });
};

export const setIcon = (
    app: Electron.App,
    mainWindow: BrowserWindow | null,
    tray: Tray
) => {
    app.whenReady().then(() => {
        if (mainWindow) {
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'Hide',
                    click: () => {
                        mainWindow.hide();
                    },
                },
                {
                    label: 'Exit',
                    click: () => {
                        // ;(mainWindow).isQuiting = true
                        app.quit();
                    },
                },
            ]);

            tray.on('click', (event) => {
                showWindow(tray, mainWindow);
            });

            tray.setToolTip('Test');
            tray.setContextMenu(contextMenu);
            tray.setIgnoreDoubleClickEvents(true);
        }
    });
};

export const hideWindowWhenFocusOut = (
    ipcMain: Electron.IpcMain,
    mainWindow: BrowserWindow | null
) => {
    ipcMain.on('ipc', async (event, arg) => {
        if (arg[0] === 'windowHide' && mainWindow) {
            mainWindow.hide();
        }
    });
};

export const shortcutHideShow = (
    app: Electron.App,
    mainWindow: BrowserWindow | null,
    tray: Tray
) => {
    globalShortcut.register('CommandOrControl+P', () => {
        if (mainWindow)
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                showWindow(tray, mainWindow);
            }
    });
    app.on('will-quit', () => {
        globalShortcut.unregister('CommandOrControl+P');
        globalShortcut.unregisterAll();
    });
};


class SystemStore {

    store: Store
    ipcMain!: Electron.IpcMain
    mainWindow!: BrowserWindow

    constructor() {
        this.store = new Store();
    }

    set = (key: string, value: any) => {
        this.store.set(key, value)
    }

    get = async (key: string): Promise<any> => {
        return await this.store.get(key)
    }

    delete = (key: string) => {
        this.store.delete(key)
    }

    init = async (data: string, ipcMain: Electron.IpcMain, mainWindow: BrowserWindow) => {

        this.ipcMain = ipcMain
        this.mainWindow = mainWindow

        let result: any = ""
        const dataObj: IStoreData = JSON.parse(data)

        if (dataObj.type === "get") {
            result = await this.store.get(dataObj.value)
        } else if (dataObj.type === "set") {
            const setData: IStoreDataObjSet = JSON.parse(dataObj.value)
            this.store.set(setData.key, setData.value)
            result = true
        } else if (dataObj.type === "delete") {
            this.store.delete(dataObj.value)
            result = true
        }

        return result

    }


}

export const systemStore = new SystemStore()
