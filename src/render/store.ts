import {configureStore} from '@reduxjs/toolkit'
import {pokemonApi} from './services/pokemon'
import rootSlice from "./features/root/rootSlice";
import translatorSlice from "./features/translator/translatorSlice";
import historySlice from "./features/history/historySlice";
import settingsSlice from "./features/settings/settingsSlice";
import devToolsEnhancer from 'remote-redux-devtools';

export const store = configureStore({
    reducer: {
        root: rootSlice,
        translator: translatorSlice,
        settings: settingsSlice,
        history: historySlice,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    devTools: false,
    enhancers: [devToolsEnhancer({realtime: true, port: 8000})],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch