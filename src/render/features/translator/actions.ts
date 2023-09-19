import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "./../../store";
import {translateText} from "../functions";
import {setText} from "../translator/translatorSlice";

export const translatorSwapDirection = createAsyncThunk(
    'translator/swapDirection',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const text = (await navigator.clipboard.readText().catch(() => "")).trim()
        const {translator} = getState() as RootState
        const result = await translateText(text, translator.toLanguage.code, translator.fromLanguage.code)
        dispatch(setText({fromText: result, toText: translator.fromText}))

        // dispatch(setLanguage({fromLanguage: translator.toLanguage, toLanguage: translator.fromLanguage}))
    }
)