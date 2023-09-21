import {app, BrowserWindow, ipcMain, Tray} from 'electron';
import config from "./config";
import * as path from "path";
import {hideInTray, hideWindowWhenFocusOut, setIcon, shortcutHideShow} from "./startConfig";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let dockedWindowMode = false

const createWindow = (): void => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: config.height,
        width: config.width,
        icon: "assets/trayIcon.png",
        skipTaskbar: true,
        frame: false,
        transparent: true,
        show: false,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            webSecurity: false,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    tray = new Tray(path.join(__dirname, 'assets/trayIcon.png'));

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    setIcon(app, mainWindow, tray);
    hideWindowWhenFocusOut(ipcMain, mainWindow);
    shortcutHideShow(app, mainWindow, tray);

};

hideInTray(app);
ipcMain.on('windowBlur', () => {
    console.log("windowBlur");
    if (!dockedWindowMode)
        mainWindow?.hide()
});
ipcMain.on('windowFocus', () => {
    console.log("windowFocus");
    mainWindow?.show()
});

ipcMain.on('dockedWindowModeOn', () => {
    console.log("dockedWindowModeOn");
    // mainWindow && mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    mainWindow && mainWindow.setAlwaysOnTop(true, 'floating', Number.MAX_VALUE);
    dockedWindowMode = true;
});


ipcMain.on('dockedWindowModeOff', () => {
    console.log("dockedWindowModeOff");
    // mainWindow && mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
    mainWindow && mainWindow.setAlwaysOnTop(false, 'floating', Number.MAX_VALUE);
    dockedWindowMode = false;
});


app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
