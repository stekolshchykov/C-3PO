import {makeAutoObservable} from "mobx";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    clipboard = ""
    activeEvent = 0

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


}
