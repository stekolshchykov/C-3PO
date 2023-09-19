import React, {useEffect, useState} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Translator from "./features/translator/Translator";
import {EWindowEvent} from "./features/root/rootSlice";
import {useAppDispatch} from "./hooks";
import {callWindowEvent} from "./features/root/actions";

function Hello() {

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${from}`
            )
                .then((r) => r.json())
                .then((r) => {
                    try {
                        return r[0][0][0];
                    } catch (e) {
                        return '';
                    }
                });
            setTo(response);
        })();
    }, [from]);

    return (
        <div>
      <textarea
          onChange={(e) => setFrom(e.target.value)}
          value={from}
          placeholder="from"
      />
            <textarea placeholder="to" value={to}/>
            <h1 className="text-3xl font-bold underline text-clifford">
                Hello world!
            </h1>
        </div>
    );
}


export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleBlur = () => {
            dispatch(callWindowEvent(EWindowEvent.focus));
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
            <div className="menu">123</div>
        </div>
    </>
}