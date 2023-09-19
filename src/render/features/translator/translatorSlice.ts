import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILanguage} from "./languageList";

export interface ITranslatorState {
    fromLanguage: ILanguage
    toLanguage: ILanguage
    fromText: string
    toText: string
}

const initialState: ITranslatorState = {
    fromLanguage: {name: "English", code: "en"},
    toLanguage: {name: "Russian", code: "ru"},
    fromText: "",
    toText: ""
}

export const translatorSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<{ fromLanguage: ILanguage, toLanguage: ILanguage }>) => {
            state.fromLanguage = action.payload.fromLanguage
            state.toLanguage = action.payload.toLanguage
        },
        setText: (state, action: PayloadAction<{ fromText: string, toText: string }>) => {
            console.log("+++++", action.payload)
            state.fromText = action.payload.fromText
            state.toText = action.payload.toText
        },
    }
})

export const {setLanguage, setText} = translatorSlice.actions

export default translatorSlice.reducer