import {BrowserWindow, Tray} from "electron";
import {IConfig} from "../type";
import {SystemStore} from "./SystemStore";

const systemStore = new SystemStore()
let windowWidth = 600
export const showWindow = async (tray: Tray, mainWindow: BrowserWindow) => {

    const {x, y} = tray.getBounds();
    const trayWidth = tray.getBounds().width;
    const trayHeight = tray.getBounds().height;
    const xPos = x + trayWidth / 2 - windowWidth / 2;
    const yPos = y - trayHeight;
    mainWindow.setPosition(xPos, yPos);
    mainWindow.show()

    const c: IConfig = await systemStore.get("config")
    if (c && c?.windowWidth) windowWidth = c?.windowWidth

}
