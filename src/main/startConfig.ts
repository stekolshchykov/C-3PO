import {BrowserWindow, Menu, Tray} from 'electron';
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


// export const shortcutHideShow = async (
//     app: Electron.App,
//     mainWindow: BrowserWindow | null,
//     tray: Tray,
//     systemStore: SystemStore
// ) => {
//     const hotKey = await systemStore.get(EIPCKeys.translatorHotKey)
//
//
//     // globalShortcut.register('CommandOrControl+P', () => {
//     globalShortcut.register('Meta+P', () => {
//         if (mainWindow)
//             if (mainWindow.isVisible()) {
//                 mainWindow.hide();
//             } else {
//                 showWindow(tray, mainWindow);
//             }
//     });
//     app.on('will-quit', () => {
//         globalShortcut.unregister('CommandOrControl+P');
//         globalShortcut.unregisterAll();
//     });
// };



