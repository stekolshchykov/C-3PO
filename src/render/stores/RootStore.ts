import {makeAutoObservable, reaction} from "mobx";
import {IConfig, IHotKey, TMainCommand} from "../../type";
import {translateText} from "./../features/functions";


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
        hotKeys: [],
        autoStart: false,
        autofill: false,
        autofillOut: false,
        translator: {
            from: {name: "English", code: "en"},
            to: {name: "Russian", code: "ru"}
        }
    }
    history: string[] = []

    translatorText = {
        from: "",
        to: ""
    }

    constructor() {
        makeAutoObservable(this);
        this.listeners()
        this.loadConfig()
        this.loadHistory()
    }

    listeners = () => {
        // redirect to page from main.js
        window.electronAPI.openPage((value: string) => {
            this.openPage = value
        })
        // reaction
        reaction(
            () => JSON.stringify(this.config),
            () => {
                this.translateText()
                this.saveConfig()
            }
        );
        reaction(
            () => JSON.stringify(this.translatorText),
            () => {
                this.translateText()
            }
        );
    }

    translateText = async () => {
        const translatedText = await translateText(this.translatorText.from, this.config.translator.from.code, this.config.translator.to.code)
        this.translatorText.to = translatedText
        if (this.config?.autofillOut)
            navigator.clipboard.writeText(translatedText)
    }


    hydrate(data: RootStoreHydration) {
        //
    }

    setClipboard = (text: string) => {
        this.clipboard = text.trim()
    }

    setActiveEvent = () => {
        this.activeEvent = this.activeEvent + 1
        this.activeListeners()
    }

    activeListeners = () => {
        this.setHistory(this.clipboard)
    }

    saveConfig = () => {
        window.electronAPI?.config(JSON.stringify({
            type: "config",
            value: {
                key: "save",
                value: this.config
            }
        }))
    }

    addHotKey = (key: IHotKey[], page: string) => {
        let newKey: null | string = null
        if (key.length > 0) {
            newKey = `${key[0].name}+${key[1].name}`
            this.config.hotKeys.push({key: newKey, page})
        }
        this.config.hotKeys = [...new Map(this.config.hotKeys.map(v => [v.key, v])).values()]
        this.config.hotKeys = [...new Map(this.config.hotKeys.map(v => [v.page, v])).values()]
        this.saveConfig()
    }


    loadConfig = async () => {
        const config = await window.electronAPI.config(JSON.stringify({
            type: "config",
            value: {
                key: "load"
            }
        }))
        if (config) this.config = this.setConfigDefaultValue(config)
    }
    setConfigDefaultValue = (config: IConfig) => {
        if (!config?.translator?.to || !config.translator.from) {
            config.translator = {
                from: {name: "English", code: "en"},
                to: {name: "Russian", code: "ru"}
            }
        }
        if (config?.autofill === null || config?.autofill === undefined) {
            config.autofill = false
        }
        if (config?.autofillOut === null || config?.autofillOut === undefined) {
            config.autofillOut = false
        }
        return config
    }

    loadHistory = async () => {
        const history = await window.electronAPI.history(JSON.stringify({
            type: "history",
            value: {
                key: "load"
            }
        }))
        if (history) this.history = history
    }

    mainCommand = (command: TMainCommand) => {
        window?.electronAPI?.mainCommand(JSON.stringify({
            type: command
        }))
            .finally()
            .catch()
    }

    setHistory = (text: string) => {
        this.history.push(text.trim())
        this.history = [...new Set(this.history)]
        window.electronAPI?.history(JSON.stringify({
            type: "history",
            value: {
                key: "set",
                value: this.history
            }
        }))
    }

    clearHistory = () => {
        window.electronAPI?.history(JSON.stringify({
            type: "history",
            value: {
                key: "clear",
                value: this.history
            }
        }))
        this.history = []
    }

}
