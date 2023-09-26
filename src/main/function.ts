import {BrowserWindow, Tray} from "electron";
import config from "./config";

export const showWindow = (tray: Tray, mainWindow: BrowserWindow) => {
    const {x, y} = tray.getBounds();
    const trayWidth = tray.getBounds().width;
    const trayHeight = tray.getBounds().height;
    const windowWidth = config.width; // Замените на ширину вашего окна
    const xPos = x + trayWidth / 2 - windowWidth / 2;
    const yPos = y - trayHeight;
    mainWindow.setPosition(xPos, yPos);
    mainWindow.show();
};