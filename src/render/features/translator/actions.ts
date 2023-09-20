import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "./../../store";
import {translateText} from "../functions";
import {setLanguage, setText, setTextFrom, setTextTo} from "../translator/translatorSlice";

export const translatorSwapDirection = createAsyncThunk(
    'translator/swapDirection',
    async (_, {rejectWithValue, dispatch, getState}) => {
        console.log("+++swapDirection")
        const {translator} = getState() as RootState
        dispatch(setLanguage({fromLanguage: translator.toLanguage, toLanguage: translator.fromLanguage}))
        dispatch(translatorTranslate())
    }
)


export const translatorTranslate = createAsyncThunk(
    'translator/translate',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const {translator} = getState() as RootState
        const result = await translateText(translator.fromText, translator.fromLanguage.code, translator.toLanguage.code)
        dispatch(setText({fromText: result, toText: translator.fromText}))
    }
)


export const translatorSetFromTextAndTranslate = createAsyncThunk(
    'translator/translateFromText',
    async (fromText: string, {rejectWithValue, dispatch, getState}) => {
        const {translator} = getState() as RootState
        dispatch(setTextFrom(fromText))
        const result = await translateText(fromText, translator.toLanguage.code, translator.fromLanguage.code)
        dispatch(setTextTo(result))
    }
)