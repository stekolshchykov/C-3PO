import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IHistoryState {
    log: string[]
}

const initialState: IHistoryState = {
    log: ["123", "456", "678"]
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        getLog: (state) => {
            console.log("getLog", state.log)
        },
        setToLog: (state, action: PayloadAction<{ fromText: string, toText: string }>) => {
            console.log("setToLog")
        }
    }
})

export const {getLog, setToLog} = historySlice.actions

export default historySlice.reducer