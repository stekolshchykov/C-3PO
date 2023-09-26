import {createAsyncThunk} from "@reduxjs/toolkit";
import {setTranslatorHotKey} from "./settingsSlice";
import {EIPCKeys} from "../../../type";


export const settingsInit = createAsyncThunk(
    'settings/init',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const translatorHotKey = await window.electronAPI.store(JSON.stringify({
            type: "get",
            value: EIPCKeys.translatorHotKey
        }))
        translatorHotKey && dispatch(setTranslatorHotKey(JSON.parse(translatorHotKey)))
    }
)