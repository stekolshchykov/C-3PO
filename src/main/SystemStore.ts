import Store from "electron-store";
import {BrowserWindow} from "electron";
import {IStoreData, IStoreDataObjSet} from "../type";

export class SystemStore {

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

