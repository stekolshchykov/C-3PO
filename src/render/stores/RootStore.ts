import {makeAutoObservable} from "mobx";
import {IConfig, IHotKey} from "../../type";


export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    clipboard = ""
    activeEvent = 0
    openPage = ""
    config: IConfig = {
        hotKeys: [
            // {
            //     key: "CommandOrControl+G",
            //     page: "translator"
            // },
            // {
            //     key: "CommandOrControl+H",
            //     page: "settings"
            // },
            // {
            //     key: "CommandOrControl+J",
            //     page: "history"
            // },
            // {
            //     key: "/CommandOrControl+K",
            //     page: "context"
            // },
            // {
            //     key: "CommandOrControl+L",
            //     page: "synonyms"
            // },
            // {
            //     key: "CommandOrControl+B",
            //     page: "spell-check"
            // },
            // {
            //     key: "CommandOrControl+N",
            //     page: "conjugation"
            // }
        ]
    }

    constructor() {
        makeAutoObservable(this);
        this.listeners()
        this.loadConfig()
    }

    listeners = () => {
        // redirect to page from main.js
        window.electronAPI.openPage((value: string) => {
            this.openPage = value
        })
    }


    hydrate(data: RootStoreHydration) {
        //
    }

    setClipboard = (text: string) => {
        this.clipboard = text.trim()
    }

    setActiveEvent = () => {
        this.activeEvent = this.activeEvent + 1
    }

    saveConfig = () => {
        console.log("+++saveConfig()", JSON.stringify(this.config))
        window.electronAPI?.config(JSON.stringify({
            type: "config",
            value: {
                key: "save",
                value: this.config
            }
        }))
    }

    addHotKey = (key: IHotKey[], page: string) => {
        this.config.hotKeys = []
        console.log("+++addHotKey", key, page)

        const clearedHotKeys = this.config.hotKeys.filter(function (e) {
            return e.page !== page
        })
        if (key.length > 0) {
            const keyStr = key[0].name + "+" + key[1].name
            clearedHotKeys.push({key: keyStr, page})
        }
        this.config.hotKeys = clearedHotKeys
        console.log("+++! clearedHotKeys ", clearedHotKeys)
        console.log("+++! clearedHotKeys ", JSON.stringify(clearedHotKeys))
        console.log("+++! this.config.hotKeys ", this.config.hotKeys)
        console.log("+++! this.config.hotKeys ", JSON.stringify(this.config.hotKeys))
        // this.saveConfig()
    }


    loadConfig = async () => {
        const config = await window.electronAPI.config(JSON.stringify({
            type: "config",
            value: {
                key: "load"
            }
        }))
        if (this.config) {
            this.config = config
        }
        console.log("loadConfig", config)
        console.log("loadConfig", JSON.stringify(config))
    }

}
