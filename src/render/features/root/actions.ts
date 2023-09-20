import {createAsyncThunk} from "@reduxjs/toolkit";
import {EWindowEvent} from "./rootSlice";

export const callWindowEvent = createAsyncThunk(
    'root/windowEvent',
    async (type: EWindowEvent, {rejectWithValue, dispatch, getState}) => {
        // const text = (await navigator.clipboard.readText().catch(() => "")).trim()
        // const {translator} = getState() as RootState
        // const result = await translateText(text, translator.fromLanguage.code, translator.toLanguage.code)
        // dispatch(setText({fromText: text, toText: result}))
        // return text
    }
)