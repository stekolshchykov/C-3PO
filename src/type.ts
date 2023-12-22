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

interface ITab {
    on: boolean
    autofill: boolean
    autofillOut: boolean
}

interface ITranslatorTab extends ITab {
    isReverse: boolean
}

export interface IConfig {
    hotKeys: {
        key: string
        page: string
    }[]
    windowHeight: number,
    windowWidth: number,
    translator: {
        from: { name: string, code: string }
        to: { name: string, code: string }
    }
    autoStart: boolean
    tabs: {
        translator: ITranslatorTab
        history: ITab
        conjugation: ITab
        context: ITab
        synonyms: ITab
        spellCheck: ITab
        wikipedia: ITab
    }
}

export type TMainCommand = "quitFromAppHandler"
