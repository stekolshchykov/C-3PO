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

export type IStoreData = IStoreDataGet | IStoreDataSet | IStoreDataDelete


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
    value: string
}


export interface IHotKey {
    name: string
    code: string
}

export enum EIPCKeys {
    "translatorHotKey" = "settings.translatorHotKey"
}