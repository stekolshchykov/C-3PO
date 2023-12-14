import {makeAutoObservable} from "mobx";
import {IConfig} from "../../type";


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
            {
                key: "CommandOrControl+G",
                page: "translator"
            },
            {
                key: "CommandOrControl+H",
                page: "settings"
            },
            {
                key: "CommandOrControl+J",
                page: "history"
            },
            {
                key: "/CommandOrControl+K",
                page: "context"
            },
            {
                key: "CommandOrControl+L",
                page: "synonyms"
            },
            {
                key: "CommandOrControl+B",
                page: "spell-check"
            },
            {
                key: "CommandOrControl+N",
                page: "conjugation"
            }
        ]
    }

    constructor() {
        makeAutoObservable(this);
        this.listeners()
        // this.loadConfig()
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
        window.electronAPI?.store(JSON.stringify({
            type: "config",
            value: {
                key: "save",
                value: this.config
            }
        }))
    }

    loadConfig = async () => {
        this.config = await window.electronAPI.store(JSON.stringify({
            type: "config",
            value: {
                key: "load"
            }
        }))
    }

}
