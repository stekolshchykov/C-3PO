import React from 'react';
import SVG from "./components/SVG";


const Translator = () => {

    return <>
        <div className={"flex justify-between"}>
            <button>Russian</button>
            <SVG type={"switchArrow"} size={100}/>
            <button>English</button>
        </div>
        <div>
            <textarea placeholder="from"/>
            <textarea placeholder="to"/>
        </div>
    </>
};

export default Translator;
