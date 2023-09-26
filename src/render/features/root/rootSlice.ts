import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {callWindowEvent} from "./actions";

enum ETab {
    translator,
    settings
}

export enum EWindowEvent {
    blur,
    focus
}

export interface IRootState {
    clipboard: string
    selectedTab: ETab
    activeTabs: ETab[]
}

const initialState: IRootState = {
    clipboard: "",
    selectedTab: ETab.translator,
    activeTabs: [ETab.translator, ETab.settings]
}

export const counterSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setWindowEvent: (state, action: PayloadAction<EWindowEvent>) => {
            if (action.payload === EWindowEvent.focus) {
                window?.electronAPI?.windowFocus();
                navigator.clipboard.readText().then(e => {
                    state.clipboard = e
                })
            } else if (action.payload === EWindowEvent.blur) {
                window?.electronAPI?.windowBlur();
            }
        },
    },
    extraReducers: {
        [callWindowEvent.fulfilled.type]: (state, {payload}) => {
            state.clipboard = payload
        },
    }
})

export const {setWindowEvent} = counterSlice.actions

export default counterSlice.reducer