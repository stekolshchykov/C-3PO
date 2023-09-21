import React, {useEffect, useState} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Translator from "./features/translator/Translator";
import {useAppDispatch} from "./hooks";
import {EWindowEvent} from "./features/root/rootSlice";
import {callWindowEvent} from "./features/root/actions";
import {faGear, faThumbtack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SVG from "./components/SVG";


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

    const [dockedWindowMode, setDockedWindowMode] = useState<"off" | "on">("off")

    return <>
        <div className="triangleUp"></div>
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Translator/>}/>
                </Routes>
            </Router>
            <div className="flex justify-between items-center px-4 py-3">
                <FontAwesomeIcon className={"iconMenuControl"} icon={faThumbtack} size={"2x"} onClick={() => {
                    console.log("!!!")
                    if (dockedWindowMode === "on") {
                        window.electronAPI.dockedWindowModeOff()
                        setDockedWindowMode("off")
                    } else {
                        window.electronAPI.dockedWindowModeOn()
                        setDockedWindowMode("on")
                    }
                }}/>
                <SVG type={"logo"}/>
                <FontAwesomeIcon className={"iconMenuControl"} icon={faGear} size={"2x"}/>
            </div>
        </div>
    </>
}