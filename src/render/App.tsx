import React, {useEffect, useState} from "react"
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import {useGetPokemonByNameQuery} from './services/pokemon'
import Translator from "./Translator";

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

    const {data, error, isLoading} = useGetPokemonByNameQuery('bulbasaur')

    useEffect(() => {
        const handleBlur = () => {
            window?.electronAPI?.windowBlur();
        };
        window.addEventListener('blur', handleBlur);
        return () => {
            window.removeEventListener('blur', handleBlur);
        };
    }, []);
    // windowHide
    useEffect(() => {
        const handleBlur = () => {
            window?.electronAPI?.windowFocus();
        };
        window.addEventListener('focus', handleBlur);
        return () => {
            window.removeEventListener('focus', handleBlur);
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
        </div>
        {/*<Counter/>*/}
        {/*{error ? (*/}
        {/*    <>Oh no, there was an error</>*/}
        {/*) : isLoading ? (*/}
        {/*    <>Loading...</>*/}
        {/*) : data ? (*/}
        {/*    <>*/}
        {/*        <h3>{data.species.name}</h3>*/}
        {/*        <img src={data.sprites.front_shiny} alt={data.species.name} />*/}
        {/*    </>*/}
        {/*) : null}*/}
    </>
}