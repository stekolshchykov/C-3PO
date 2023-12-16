import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./App";
import "./index.css"
import {RootStoreProvider} from "./providers/RootStoreProvider";

const container = document.getElementById('root') as HTMLElement;
const root: any = createRoot(container);

root.render(
    <React.StrictMode>
        <RootStoreProvider>
            <App/>
        </RootStoreProvider>
    </React.StrictMode>
);
