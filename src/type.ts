interface IStoreDataGet {
    type: "get"
    value: string
}

interface IStoreDataSet {
    type: "set"
    value: string
}

interface IStoreDataDelete {
    type: "delete"
    value: string
}

interface IStoreAction {
    type: EIPCKeys,
    value: string
}

export type IStoreData = IStoreDataGet | IStoreDataSet | IStoreDataDelete | IStoreAction


interface IAutoLaunchDataGetStatus {
    type: "getStatus"
}

interface IAutoLaunchDataSetStatus {
    type: "setStatus"
    value: string
}


export type IAutoLaunchData = IAutoLaunchDataGetStatus | IAutoLaunchDataSetStatus

export type IStoreDataObjSet = {
    key: string
    type: string
    value: string
}


export interface IHotKey {
    name: string
    code: string | number
}

export enum EIPCKeys {
    "translatorHotKey" = "settings.translatorHotKey",
    "historySet" = "history.set",
    "historyGet" = "history.get",
    "history" = "history."
}

export interface IConfig {
    hotKeys: {
        key: string
        page: string
    }[]
    translator: {
        from: { name: string, code: string }
        to: { name: string, code: string }
    }
    autoStart: boolean
    autofill: boolean
    autofillOut: boolean
}

export type TMainCommand = "quitFromAppHandler"
