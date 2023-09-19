import {configureStore} from '@reduxjs/toolkit'
import {pokemonApi} from './services/pokemon'
import rootSlice from "./features/root/rootSlice";
import translatorSlice from "./features/translator/translatorSlice";
// eslint-disable-next-line import/no-unresolved
import devToolsEnhancer from 'remote-redux-devtools';

export const store = configureStore({
    reducer: {
        root: rootSlice,
        translator: translatorSlice,
        [pokemonApi.reducerPath]: pokemonApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    devTools: false,
    enhancers: [devToolsEnhancer({realtime: true, port: 8000})],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch