import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux'
import {App} from "./App";
import {store} from './store'
import "./index.css"
import {RootStoreProvider} from "./providers/RootStoreProvider";

const container = document.getElementById('root') as HTMLElement;
const root: any = createRoot(container);

root.render(
    <React.StrictMode>
        <RootStoreProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </RootStoreProvider>
    </React.StrictMode>
);
