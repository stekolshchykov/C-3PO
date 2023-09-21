import React, {useEffect} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Translator from "./features/translator/Translator";
import {useAppDispatch} from "./hooks";
import {EWindowEvent} from "./features/root/rootSlice";
import {callWindowEvent} from "./features/root/actions";
import Menu from "./features/menu/Menu";


export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleBlur = () => {
            dispatch(callWindowEvent(EWindowEvent.blur));
            window.electronAPI.windowBlur()
        };
        window.addEventListener('blur', handleBlur);
        return () => {
            window.removeEventListener('blur', handleBlur);
        };
    }, []);
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
                <Routes>
                    <Route path="/" element={<Translator/>}/>
                </Routes>
            </Router>
            <Menu/>
        </div>
    </>
}