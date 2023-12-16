import {app, BrowserWindow, ipcMain, nativeImage, Tray} from 'electron';
import AutoLaunch from "auto-launch";
import * as path from "path";
// import {defaultConfig} from "./config";
import {hideInTray, hideWindowWhenFocusOut, setIcon} from "./startConfig";
import {HotKeys} from "./HotKeys";
import {SystemStore} from "./SystemStore";
import {IAutoLaunchData} from "../type";
import Config from "../main/config";
import MainCommand from "../main/main-command";
import History from "../main/history";

const appAutoLauncher = new AutoLaunch({
    name: 'C-3PO',
})

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
let config: Config
let mainCommand: MainCommand
let history: History

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 730,
        // icon: "assets/trayIcon.png",
        skipTaskbar: true,
        title: "C-3PO",
        frame: false,
        transparent: true,
        show: false,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true,
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

    systemStore = new SystemStore()

    // TODO:
    // mainWindow.webContents.send('open-page', "context")

    hotKeys = new HotKeys(app, mainWindow, tray)
    config = new Config(systemStore, ipcMain, hotKeys)
    mainCommand = new MainCommand(systemStore, ipcMain, app)
    history = new History(systemStore, ipcMain)
};

hideInTray(app);
ipcMain.on('windowBlur', () => {
    if (!dockedWindowMode)
        mainWindow?.hide()
});

ipcMain.on('windowFocus', () => {
    mainWindow?.show()
});

ipcMain.handle('autoLaunch', async (_, data) => {

    const dataObj: IAutoLaunchData = JSON.parse(data)

    if (dataObj.type === "getStatus") {
        let result = false
        await appAutoLauncher.isEnabled()
            .then(function (isEnabled) {
                result = isEnabled
            })
            .catch(function () {
                result = false
            })
        return result
    } else if (dataObj.type === "setStatus") {
        if (dataObj.value === "true") {
            appAutoLauncher.enable()
        } else {
            appAutoLauncher.disable()
        }
    }

})

ipcMain.handle('store', async (_, data) => {
    try {
        // const dataObj = JSON.parse(data)

        // // config
        // if (dataObj.type === "config") {
        //     if (dataObj.value.key === "save") {
        //         systemStore.set("config", dataObj.value.value)
        //     } else if (dataObj.value.key === "load") {
        //         return systemStore.get("config")
        //     }
        // }
        ////////////////////////////////////////////////////////

        // if (dataObj.type === "quitFromAppHandler") {
        //     app.quit();
        // } else if (dataObj.type === "historyClear") {
        //     systemStore.set("history", [])
        // } else if (dataObj.type === "historyGetAll") {
        //     const historyData = await systemStore.get("history")
        //     return historyData || []
        // } else if (dataObj.type === "historySet") {
        //     let historyData: string[] = await systemStore.get("history") || []
        //     if (historyData && dataObj?.value) {
        //         historyData.push(dataObj?.value)
        //     }
        //     // historyData = historyData.filter((value, index) => value !== historyData[index - 1])
        //     historyData = [...new Set(historyData)];
        //     systemStore.set("history", historyData)
        //     return true
        // }
        // if (dataObj.type === "set") {
        //     const valueObj: IStoreDataObjSet = JSON.parse(dataObj.value)
        //     if (valueObj.key === EIPCKeys.translatorHotKey) {
        //         const translatorHotKeyObj = JSON.parse(valueObj.value)
        //         const key = translatorHotKeyObj.map((hk: any) => hk.name).join('+')
        //         key && translatorHotKeyObj.length > 1 && hotKeys.setHideShow(key)
        //     }
        // }
    } catch (e) { /* empty */
        // console.log("error", e)
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

    // const translatorHotKey = await systemStore.get(EIPCKeys.translatorHotKey)
    // if (translatorHotKey) {
    //     const translatorHotKeyObj = JSON.parse(translatorHotKey)
    //     const key = translatorHotKeyObj.map((hk: any) => hk.name).join('+')
    //     key && translatorHotKeyObj.length > 1 && hotKeys.setHideShow(key)
    // }
    // const config: IConfig = await systemStore.get("config")
    // config.hotKeys.forEach(e => {
    //     globalShortcut.register(e.key, () => {
    //         if (mainWindow && tray) {
    //             mainWindow.webContents.send('open-page', e.page)
    //             showWindow(tray, mainWindow);
    //         }
    //     })
    // })
})


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
