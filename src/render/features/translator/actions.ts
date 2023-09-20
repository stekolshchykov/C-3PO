import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "./../../store";
import {translateText} from "../functions";
import {
    setLanguage,
    setLanguageFrom,
    setLanguageTo,
    setText,
    setTextFrom,
    setTextTo
} from "../translator/translatorSlice";
import {ILanguage} from "./languageList";

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

export const translatorSetLanguageFrom = createAsyncThunk(
    'translator/setLanguageFrom',
    async (newLanguage: ILanguage, {rejectWithValue, dispatch, getState}) => {
        const storeSnapshot1 = getState() as RootState
        dispatch(setLanguageFrom(newLanguage))
        const storeSnapshot2 = getState() as RootState
        const result = await translateText(storeSnapshot1.translator.fromText, storeSnapshot1.translator.fromLanguage.code, storeSnapshot2.translator.fromLanguage.code)
        dispatch(setTextFrom(result))
    }
)

export const translatorSetLanguageTo = createAsyncThunk(
    'translator/setLanguageTo',
    async (newLanguage: ILanguage, {rejectWithValue, dispatch, getState}) => {
        dispatch(setLanguageTo(newLanguage))
        const {translator} = getState() as RootState
        const result = await translateText(translator.toText, translator.fromLanguage.code, translator.toLanguage.code)
        dispatch(setTextTo(result))
    }
)