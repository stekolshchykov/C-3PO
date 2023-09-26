import {createAsyncThunk} from "@reduxjs/toolkit";
import {setTranslatorHotKey} from "./settingsSlice";


export const settingsInit = createAsyncThunk(
    'settings/init',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const translatorHotKey = await window.electronAPI.store(JSON.stringify({
            type: "get",
            value: "settings.translatorHotKey"
        }))
        translatorHotKey && dispatch(setTranslatorHotKey(JSON.parse(translatorHotKey)))
    }
)