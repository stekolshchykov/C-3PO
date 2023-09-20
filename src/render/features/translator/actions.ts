import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "./../../store";
import {translateText} from "../functions";
import {setLanguage, setText, setTextFrom, setTextTo} from "../translator/translatorSlice";

export const translatorSwapDirection = createAsyncThunk(
    'translator/swapDirection',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const {translator} = getState() as RootState
        dispatch(setLanguage({fromLanguage: translator.toLanguage, toLanguage: translator.fromLanguage}))
        dispatch(setText({fromText: translator.toText, toText: translator.fromText}))
    }
)


export const translatorTranslate = createAsyncThunk(
    'translator/translate',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const {translator} = getState() as RootState
        const result = await translateText(translator.fromText, translator.fromLanguage.code, translator.toLanguage.code)
        dispatch(setTextFrom(result))
        dispatch(setTextTo(translator.fromText))
    }
)


export const translatorSetFromTextAndTranslate = createAsyncThunk(
    'translator/translateFromText',
    async (fromText: string, {rejectWithValue, dispatch, getState}) => {
        const {translator} = getState() as RootState
        dispatch(setTextFrom(fromText))
        const result = await translateText(fromText, translator.fromLanguage.code, translator.toLanguage.code)
        dispatch(setTextTo(result))
    }
)