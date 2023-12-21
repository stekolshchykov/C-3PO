import React, {useEffect} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Translator from "../render/pages/translator/Translator";
import Menu from "../render/components/menu/Menu";
import Settings from "../render/pages/settings/Settings";
import History from "../render/pages/history/History";
import Context from "../render/pages/сontext/Сontext";
import Synonyms from "../render/pages/synonyms/Synonyms";
import SpellCheck from "../render/pages/spell-check/SpellCheck";
import Conjugation from "../render/pages/conjugation/Conjugation";
import UI from "./UI/index";
import {observer} from "mobx-react-lite";
import {useRootStore} from "./providers/RootStoreProvider";
import Nav from "../render/components/nav/Nav";
import Wikipedia from "./pages/Wikipedia";

export const App = observer(() => {

    const store = useRootStore();

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
            // setNeedNavigateToRootPage(true)
            // setTimeout(() => {
            //     setNeedNavigateToRootPage(false)
            // }, 300)
        };
        window.addEventListener('blur', handleBlur);
        return () => {
            window.removeEventListener('blur', handleBlur);
        };
    }, [])

    // windowHide
    useEffect(() => {
        const handleFocus = () => {
            window?.electronAPI?.windowFocus()
            navigator.clipboard.readText().then(e => {
                store.setClipboard(e)
                store.setActiveEvent()
            })
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
        // dispatch(init())
    }, [])


    return <>
        <div className="triangleUp"></div>
        <div className="app overflow-hidden">
            <Router>
                <Nav/>
                {/*{needNavigateToRootPage && <Navigate replace to="/"/>}*/}
                {/*TODO: temp*/}
                {/*<Navigate replace to="/ui"/>*/}
                <Routes>
                    <Route path="/" element={<Translator/>}/>
                    <Route path="/translator" element={<Translator/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/context" element={<Context/>}/>
                    <Route path="/synonyms" element={<Synonyms/>}/>
                    <Route path="/spell-check" element={<SpellCheck/>}/>
                    <Route path="/conjugation" element={<Conjugation/>}/>
                    <Route path="/wikipedia" element={<Wikipedia/>}/>
                    <Route path="/ui" element={<UI/>}/>
                </Routes>
                <Menu/>
            </Router>
        </div>
    </>
})
