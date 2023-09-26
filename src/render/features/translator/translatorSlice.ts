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
    name: 'translator',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<{ fromLanguage: ILanguage, toLanguage: ILanguage }>) => {
            state.fromLanguage = action.payload.fromLanguage
            state.toLanguage = action.payload.toLanguage
        },
        setLanguageFrom: (state, action: PayloadAction<ILanguage>) => {
            state.fromLanguage = action.payload
            window.electronAPI?.store(JSON.stringify({
                type: "set",
                value: JSON.stringify({
                    key: "translator.fromLanguage",
                    value: action.payload
                })
            }))
        },
        setLanguageTo: (state, action: PayloadAction<ILanguage>) => {
            state.toLanguage = action.payload
            window.electronAPI?.store(JSON.stringify({
                type: "set",
                value: JSON.stringify({
                    key: "translator.toLanguage",
                    value: action.payload
                })
            }))
        },
        setText: (state, action: PayloadAction<{ fromText: string, toText: string }>) => {
            state.fromText = action.payload.fromText
            state.toText = action.payload.toText
        },
        setTextFrom: (state, action: PayloadAction<string>) => {
            state.fromText = action.payload

        },
        setTextTo: (state, action: PayloadAction<string>) => {
            state.toText = action.payload
        },
    }
})

export const {setLanguageFrom, setLanguageTo, setLanguage, setText, setTextFrom, setTextTo} = translatorSlice.actions

export default translatorSlice.reducer