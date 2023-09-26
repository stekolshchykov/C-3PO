import {createAsyncThunk} from "@reduxjs/toolkit";
import {EWindowEvent} from "./rootSlice";
import {RootState} from "../../store";
import {translateText} from "../functions";
import {setText} from "../translator/translatorSlice";
import {translatorInit} from "../translator/actions";
import {settingsInit} from "../settings/actions";

export const callWindowEvent = createAsyncThunk(
    'root/windowEvent',
    async (type: EWindowEvent, {rejectWithValue, dispatch, getState}) => {
        const text = (await navigator.clipboard.readText().catch(() => "")).trim()
        const {translator} = getState() as RootState
        const result = await translateText(text, translator.fromLanguage.code, translator.toLanguage.code)
        dispatch(setText({fromText: text, toText: result}))
        // TODO: for settings
        await navigator.clipboard.writeText(result)
        return text
    }
)


export const init = createAsyncThunk(
    'init',
    async (_, {rejectWithValue, dispatch, getState}) => {
        dispatch(translatorInit())
        dispatch(settingsInit())
    }
)