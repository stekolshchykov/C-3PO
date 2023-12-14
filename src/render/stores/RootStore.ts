import {makeAutoObservable} from "mobx";


export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    clipboard = ""
    activeEvent = 0
    openPage = ""
    config = {
        // TODO
    }

    constructor() {
        makeAutoObservable(this);
        this.listeners()
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
