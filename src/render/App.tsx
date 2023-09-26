import React, {useEffect} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Translator from "./features/translator/Translator";
import {useAppDispatch} from "./hooks";
import {EWindowEvent} from "./features/root/rootSlice";
import {callWindowEvent} from "./features/root/actions";
import Menu from "./features/menu/Menu";
import Settings from "./features/settings/Settings";

export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        function clickHandler(this: any, e: any) {
            if (e.target.id === "root") {
                window.electronAPI.windowBlur()
            }
        }

        const body = document.querySelector("body")
        body && body.addEventListener('click', clickHandler, false);
        return () => {
            body && body.removeEventListener('click', clickHandler, false);
        };
    }, []);

    useEffect(() => {
        const handleBlur = () => {
            dispatch(callWindowEvent(EWindowEvent.blur));
            window.electronAPI.windowBlur()
        };
        window.addEventListener('blur', handleBlur);
        return () => {
            window.removeEventListener('blur', handleBlur);
        };
    }, [])

    // windowHide
    useEffect(() => {
        const handleFocus = () => {
            dispatch(callWindowEvent(EWindowEvent.focus))
            window.electronAPI.windowFocus()
        };
        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return <>
        <div className="triangleUp"></div>
        <div className="app">
            <Router>
                {/*TODO: temp*/}
                {/*<Navigate replace to="/settings"/>*/}
                <Routes>
                    <Route path="/" element={<Translator/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
                <Menu/>
            </Router>
        </div>
    </>
}