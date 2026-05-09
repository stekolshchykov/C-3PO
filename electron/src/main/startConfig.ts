import {BrowserWindow, Tray} from 'electron';
import {showWindow} from "./function";

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
            tray.on('click', (event) => {
                showWindow(tray, mainWindow);
            });
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
