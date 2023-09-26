import React, {useEffect} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Translator from "./features/translator/Translator";
import {useAppDispatch} from "./hooks";
import {EWindowEvent} from "./features/root/rootSlice";
import {callWindowEvent, init} from "./features/root/actions";
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


    useEffect(() => {
        setInterval(async () => {
            const response = await window.electronAPI.store(JSON.stringify({
                type: "get",
                value: "val1"
            }))
            const response2 = await window.electronAPI.store(JSON.stringify({
                type: "set",
                value: JSON.stringify({
                    key: "val1",
                    value: "123",
                })
            }))


            console.log("+++response", response)

            // const x = await window.electronAPI.store("xxx")
            // console.log("+++x", x)
            // const {invoke, handle} = window.api
            // const ss = await invoke.systemStore({ss: "12"})
            // // const ddd = await handle.getPong()
            // // console.log("+++rrr", rrr)
            // console.log("+++ddd", ss)
            // const obj = {
            //     key: "windowHide",
            //     value: "11"
            // }
            // const x = await window.electronAPI.message("xxx")
            // const response = await window.electronAPI.ping("ping")
            // const response = await ipcRenderer.invoke('ping', pingData);

            // console.log(response)
            // await window.electronAPI.systemStore({
            //     key: "windowHide",
            //     value: JSON.stringify(obj)
            // }).then(res => console.log("+++", res))
        }, 4000)
    }, []);

    useEffect(() => {
        dispatch(init())
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