import {BrowserWindow, Tray} from "electron";


export const showWindow = async (tray: Tray, mainWindow: BrowserWindow) => {

    const {x, y} = tray.getBounds();
    const trayWidth = tray.getBounds().width;
    const trayHeight = tray.getBounds().height;
    const xPos = x + trayWidth / 2 - mainWindow.getContentSize()[0] / 2;
    const yPos = y - trayHeight;
    mainWindow.setPosition(xPos, yPos);
    mainWindow.show()

}
