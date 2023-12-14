import {makeAutoObservable} from "mobx";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    clipboard = ""
    activeEvent = 0
    config = {
        man: 11
    }

    constructor() {
        makeAutoObservable(this);
    }


    hydrate(data: RootStoreHydration) {
        //
    }

    setClipboard = (text: string) => {
        console.log("setClipboard", text)
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
