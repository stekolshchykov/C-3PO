import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {EIPCKeys, IHotKey} from "../../../type";

export interface ISettingsState {
    translatorHotKey: IHotKey[]
}

const initialState: ISettingsState = {
    translatorHotKey: []
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTranslatorHotKey: (state, action: PayloadAction<IHotKey[]>) => {
            state.translatorHotKey = action.payload
            window.electronAPI?.store(JSON.stringify({
                type: "set",
                value: JSON.stringify({
                    key: EIPCKeys.translatorHotKey,
                    value: JSON.stringify(state.translatorHotKey)
                })
            }))
        }
    }
})

export const {setTranslatorHotKey} = settingsSlice.actions

export default settingsSlice.reducer