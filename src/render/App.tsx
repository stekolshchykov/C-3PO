import React, {useEffect, useState} from "react"
import {MemoryRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Translator from "./features/translator/Translator";
import {useAppDispatch} from "./hooks";
import {EWindowEvent} from "./features/root/rootSlice";
import {callWindowEvent, init} from "./features/root/actions";
import Menu from "./features/menu/Menu";
import Settings from "./features/settings/Settings";
import History from "./features/history/History";
import Nav from "./features/nav/Nav";
import Context from "./features/сontext/Сontext";
import Synonyms from "./features/synonyms/Synonyms";
import SpellCheck from "./features/spell-check/SpellCheck";
import Conjugation from "./features/conjugation/Conjugation";

export const App = () => {

    const [needNavigateToRootPage, setNeedNavigateToRootPage] = useState(false)
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
            // dispatch(callWindowEvent(EWindowEvent.blur));
            // window.electronAPI.windowBlur()

            // navigate to home page on start
            setNeedNavigateToRootPage(true)
            setTimeout(() => {
                setNeedNavigateToRootPage(false)
            }, 300)
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
            window?.electronAPI?.windowFocus()

        };
        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    // Escape
    useEffect(() => {
        function clickHandler(this: any, e: any) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                window.electronAPI.windowBlur()
            }
        }

        window.addEventListener('keydown', clickHandler);
        return () => {
            window.removeEventListener('keydown', clickHandler);
        };
    }, []);

    useEffect(() => {
        dispatch(init())
    }, []);

    return <>
        <div className="triangleUp"></div>
        <div className="app">


            <Router>
                <Nav/>

                {needNavigateToRootPage && <Navigate replace to="/"/>}
                {/*TODO: temp*/}
                {/*<Navigate replace to="/history"/>*/}
                <Routes>
                    <Route path="/" element={<Translator/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/context" element={<Context/>}/>
                    <Route path="/synonyms" element={<Synonyms/>}/>
                    <Route path="/spell-check" element={<SpellCheck/>}/>
                    <Route path="/conjugation" element={<Conjugation/>}/>
                </Routes>
                <Menu/>
            </Router>
        </div>
    </>
}
