import {app, BrowserWindow, ipcMain, nativeImage, Tray} from 'electron';
import config from "./config";
import {hideInTray, hideWindowWhenFocusOut, setIcon} from "./startConfig";
import * as path from "path";
import {HotKeys} from "./HotKeys";
import {SystemStore} from "./SystemStore";
import {EIPCKeys, IStoreData, IStoreDataObjSet} from "../type";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let dockedWindowMode = false
let hotKeys: HotKeys
let systemStore: SystemStore

const createWindow = (): void => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: config.height,
        width: config.width,
        // icon: "assets/trayIcon.png",
        skipTaskbar: true,
        frame: false,
        transparent: true,
        show: false,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            webSecurity: false,
            sandbox: false,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // tray = new Tray(path.join(__dirname, 'assets/trayIcon.png'));
    const image = nativeImage.createFromPath(path.join(__dirname, 'assets/trayIcon.png'))
    tray = new Tray(image.resize({width: 32, height: 32}));

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    setIcon(app, mainWindow, tray);
    hideWindowWhenFocusOut(ipcMain, mainWindow);

    hotKeys = new HotKeys(app, mainWindow, tray)
    systemStore = new SystemStore()

};

hideInTray(app);
ipcMain.on('windowBlur', () => {
    // console.log("windowBlur");
    // if (!dockedWindowMode)
    //     mainWindow?.hide()
});
ipcMain.on('windowFocus', () => {
    // console.log("windowFocus");
    mainWindow?.show()
});
ipcMain.handle('store', (_, data) => {

    try {
        const dataObj: IStoreData = JSON.parse(data)

        // set hotkeys
        if (dataObj.type === "set") {
            const valueObj: IStoreDataObjSet = JSON.parse(dataObj.value)
            if (valueObj.key === EIPCKeys.translatorHotKey) {
                const translatorHotKeyObj = JSON.parse(valueObj.value)
                const key = translatorHotKeyObj.map((hk: any) => hk.name).join('+')
                key && translatorHotKeyObj.length > 1 && hotKeys.setHideShow(key)
            }
        }
    } catch (e) {
        console.log(e)
    }


    return systemStore.init(data, ipcMain, mainWindow!)

})

ipcMain.on('dockedWindowModeOn', () => {
    // console.log("dockedWindowModeOn");
    // mainWindow && mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    mainWindow && mainWindow.setAlwaysOnTop(true, 'floating', Number.MAX_VALUE);
    dockedWindowMode = true;
});


ipcMain.on('dockedWindowModeOff', () => {
    // console.log("dockedWindowModeOff");
    // mainWindow && mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
    mainWindow && mainWindow.setAlwaysOnTop(false, 'floating', Number.MAX_VALUE);
    dockedWindowMode = false;
});


app.on('ready', createWindow);

// set hotkeys when app ready
app.on('ready', async () => {
    const translatorHotKey = await systemStore.get(EIPCKeys.translatorHotKey)
    if (translatorHotKey) {
        const translatorHotKeyObj = JSON.parse(translatorHotKey)
        const key = translatorHotKeyObj.map((hk: any) => hk.name).join('+')
        key && translatorHotKeyObj.length > 1 && hotKeys.setHideShow(key)
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
